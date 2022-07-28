import express from 'express';
import request from 'request';
import accounts from './accounts';
import bodyParser from 'body-parser';
import config from './config';
import 'dotenv/config';
import cors from 'cors';

const POST = 'POST';
const WEB_MAP_AS_JSON = 'Web_Map_as_JSON';
const SECONDS_TO_MILLISECONDS = 1000;
const DEFAULT_PORT = 8080;

const app = express();

app.use(cors());

// required for parsing submitted form data
app.use(
  bodyParser.urlencoded({
    extended: true,

    // these options are to address the "PayloadTooLargeError: request entity too
    // large errors" that we are seeing
    limit: '2mb',
    parameterLimit: 2000,
  })
);

const simpleRequest = function (url, functionRequest, functionResponse) {
  request(
    {
      url,
      qs: functionRequest.query,
      timeout: config.TIMEOUT * SECONDS_TO_MILLISECONDS,
    },
    (error, res, body) => {
      if (error) {
        functionResponse.status(500);

        return functionResponse.send(error);
      }

      functionResponse.status(res && res.statusCode);
      functionResponse.send(body);
    }
  );
};

const makeRequest = (options, functionResponse) => {
  request(options, (error, agsResponse, body) => {
    if (error) {
      functionResponse.status(500);

      return functionResponse.send(error);
    }

    functionResponse.status(agsResponse.statusCode);
    body = body.replace(new RegExp(process.env.OPEN_QUAD_WORD, 'g'), '<open-quad-word-hidden>');

    return functionResponse.send(body);
  });
};

const getHandler = function (taskName) {
  return function (functionRequest, functionResponse) {
    if (!process.env.OPEN_QUAD_WORD) {
      functionResponse.status(500);

      return functionResponse.send('OPEN_QUAD_WORD environment variable is not defined!');
    }
    const account = accounts[functionRequest.params.accountNumber];

    let url = `${account.serviceUrl}/${encodeURIComponent(account[taskName])}`;
    if (functionRequest.params.service) {
      url += `/${functionRequest.params.service}`;
    }
    const options = {
      method: functionRequest.method,
      url: url,
      qs: functionRequest.query,
      headers: {
        // trying to help with the invalid URL issue with default AGOL print service
        // doesn't look like it's working
        Referer: functionRequest.headers.Referer,
        Origin: functionRequest.headers.Origin,
      },
      timeout: config.TIMEOUT * SECONDS_TO_MILLISECONDS,
    };

    // POST is used for requests with too much data to fit in query parameters
    if (options.method === POST) {
      // adding form to GET requests causes errors with ArcGIS Server
      options.form = functionRequest.body;

      if (options.form[WEB_MAP_AS_JSON]) {
        options.form[WEB_MAP_AS_JSON] = options.form[WEB_MAP_AS_JSON].replace(
          new RegExp(account.quadWord, 'g'),
          process.env.OPEN_QUAD_WORD
        );
      }
    } else if (options.qs[WEB_MAP_AS_JSON]) {
      options.qs[WEB_MAP_AS_JSON] = options.qs[WEB_MAP_AS_JSON].replace(
        new RegExp(account.quadWord, 'g'),
        process.env.OPEN_QUAD_WORD
      );
    }

    console.log({
      accountNumber: functionRequest.params.accountNumber,
      url: url,
      method: options.method,
    });

    makeRequest(options, functionResponse);
  };
};

// handler for calls to the jobs service
const getJobsHandler = (jobPath) => {
  return (functionRequest, functionResponse) => {
    const account = accounts[functionRequest.params.accountNumber];

    let url =
      `${account.serviceUrl}/${encodeURIComponent(account.exportTaskName)}` +
      `/jobs/${functionRequest.params.jobId}${jobPath ? jobPath : ''}`;
    const options = {
      url: url,
      qs: functionRequest.query,
      timeout: config.TIMEOUT * SECONDS_TO_MILLISECONDS,
    };

    console.log({
      accountNumber: functionRequest.params.accountNumber,
      url: url,
      method: 'GET',
      referer: functionRequest.get('Referrer'),
      sourceIp: functionRequest.ip,
    });

    makeRequest(options, functionResponse);
  };
};

const baseRoute = '/:accountNumber/arcgis/rest/services/GPServer/';

// general arcgis server info
app.get('/:accountNumber/arcgis/rest/info', (functionRequest, functionResponse) => {
  const account = accounts[functionRequest.params.accountNumber];
  const servicesDirectoryPath = 'arcgis/rest/services';

  const url = account.serviceUrl.split(servicesDirectoryPath)[0] + servicesDirectoryPath;

  simpleRequest(url, functionRequest, functionResponse);
});

// general base task route
const baseHandler = (functionRequest, functionResponse) => {
  const account = accounts[functionRequest.params.accountNumber];

  simpleRequest(account.serviceUrl, functionRequest, functionResponse);
};
app.get(baseRoute, baseHandler);
app.post(baseRoute, baseHandler);

// get templates request
app.get(`${baseRoute}Get%20Layout%20Templates%20Info/:service?`, getHandler('getTemplatesTaskName'));
app.post(`${baseRoute}Export%20Web%20Map%20Task/:service`, getHandler('exportTaskName'));

// main export request
app.get(`${baseRoute}export`, getHandler('exportTaskName'));
app.post(`${baseRoute}export`, getHandler('exportTaskName'));
app.get(`${baseRoute}:service`, getHandler('exportTaskName'));
app.post(`${baseRoute}:service`, getHandler('exportTaskName'));
app.post(`${baseRoute}export/:service`, getHandler('exportTaskName'));
app.get(`${baseRoute}export/:service`, getHandler('exportTaskName'));

// get job status and output file requests (async print tasks)
app.get(`${baseRoute}export/jobs/:jobId`, getJobsHandler());
app.get(`${baseRoute}export/jobs/:jobId/results/Output_File`, getJobsHandler('/results/Output_File'));

const MOVED_PERMANENTLY = 301;
app.get('/', (_, response) => response.redirect(MOVED_PERMANENTLY, 'https://github.com/agrc/serverless-print-proxy'));

const port = process.env.PORT || DEFAULT_PORT;
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`printproxy listing on port ${port}`);
  });
}

export default app;
