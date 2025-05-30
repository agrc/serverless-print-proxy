import { Firestore } from '@google-cloud/firestore';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import helmet from 'helmet';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import https from 'https';

const firestore = new Firestore();

export const WEB_MAP_AS_JSON = 'Web_Map_as_JSON';

if (!process.env.OPEN_QUAD_WORD) {
  throw 'OPEN_QUAD_WORD environment variable is not defined!';
}

let app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
);
app.use(cors());

// required for parsing submitted form data
app.use(
  express.urlencoded({
    extended: true,

    // these options are to address the "PayloadTooLargeError: request entity too large errors" that we are seeing
    limit: '50mb',
    parameterLimit: 2000,
  }),
);

app.use(express.json());

async function getAccountSnapshot(accountNumber) {
  return await firestore.collection('accounts').doc(accountNumber).get();
}

const accountNumberRegex = /\/v\d+\/(-?\d+)\//
app.use(async (request, response, next) => {
  // verify account number for all paths requests except "/"
  if (request.path !== '/') {
    // path example: "/v2/-1/arcgis/rest/info?f=json"
    const match = request.path.match(accountNumberRegex);

    if (match === null) {
      response.status(400);
      return response.send('Invalid account number');
    }

    const accountNumber = match[1];
    const snapshot = await getAccountSnapshot(accountNumber);
    if (!snapshot.exists) {
      response.status(400);
      return response.send(`No account for: ${accountNumber}`);
    }

    console.log({
      version: process.env.npm_package_version,
      accountNumber: accountNumber,
      url: request.path,
      method: request.method,
    });

    response.locals.account = snapshot.data();
  }

  return next();
});

app.use(
  '/v2',
  createProxyMiddleware({
    changeOrigin: true,
    pathRewrite: {
      '^/.*?/': '/', // remove the account prefix
    },
    on: {
      proxyReq: (proxyReq, request, response) => {
        // POST is used for requests with too much data to fit in query parameters
        if (request.method === 'POST' && request.body?.[WEB_MAP_AS_JSON]) {
          request.body[WEB_MAP_AS_JSON] = request.body[WEB_MAP_AS_JSON].replace(
            new RegExp(response.locals.account.quadWord, 'g'),
            process.env.OPEN_QUAD_WORD,
          );
        } else if (proxyReq.path.includes(WEB_MAP_AS_JSON)) {
          proxyReq.path = proxyReq.path.replace(
            new RegExp(response.locals.account.quadWord, 'g'),
            process.env.OPEN_QUAD_WORD,
          );
        }

        // used to fix proxied POST requests when bodyParser is applied before http-proxy-middleware
        // ref: https://www.npmjs.com/package/http-proxy-middleware#intercept-and-manipulate-requests
        fixRequestBody(proxyReq, request);
      },
    },
    router: async (request) => {
      // response is not passed to this function
      const accountNumber = request.path.split('/')[1];
      const snapshot = await getAccountSnapshot(accountNumber);
      const url = new URL(snapshot.data().arcgisServer);

      return {
        protocol: url.protocol,
        host: url.hostname,
        port: url.port,
      };
    },
  }),
);

app.get('/', (_, response) => response.redirect(301, 'https://github.com/agrc/serverless-print-proxy#readme'));

const port = process.env.PORT || 8080;
if (process.env.NODE_ENV !== 'test') {
  if (process.env.NODE_ENV === 'development') {
    const credentials = {
      key: fs.readFileSync('./localhost-key.pem'),
      cert: fs.readFileSync('./localhost.pem'),
    };
    app = https.createServer(credentials, app);
  }

  app.listen(port, () => {
    console.log(`printproxy listing on port ${port}`);
  });
}

export default app;
