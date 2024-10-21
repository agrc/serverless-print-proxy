import express from 'express';
import http from 'http';
import request from 'supertest';
import { promisify } from 'util';
import { afterAll, beforeAll, describe, test } from 'vitest';
import app, { WEB_MAP_AS_JSON } from './index';

const sleep = promisify(setTimeout);
let server;

beforeAll(() => {
  server = http.createServer(app);
  server.listen();
});

afterAll(async () => {
  await server.close();
});

describe('switch out quad word', () => {
  let verifyServer;
  beforeAll(() => {
    return new Promise((resolve) => {
      const verifyApp = express();
      verifyApp.use(express.urlencoded({ extended: true }));
      verifyApp.all('*', (request, response) => {
        const webMapJson = request.method === 'POST' ? request.body[WEB_MAP_AS_JSON] : request.query[WEB_MAP_AS_JSON];
        if (webMapJson.includes('verify-quad-word')) {
          return response.status(500).send('quad word not replaced');
        } else {
          return response.status(200).send('quad word replaced');
        }
      });
      verifyServer = http.createServer(verifyApp);
      verifyServer.listen(8085, resolve);
    });
  });

  afterAll(async () => {
    await verifyServer.close();
  });

  test('switches out quad word for get requests', async () => {
    return request(server)
      .get(
        `/v2/-2/arcgis/rest/info?f=json&${WEB_MAP_AS_JSON}=${JSON.stringify({ layer: { url: 'https://somedomain.com/verify-quad-word' } })}`,
      )
      .expect(200)
      .expect('quad word replaced');
  });

  test('switches out quad word for post requests', async () => {
    return request(server)
      .post('/v2/-2/arcgis/rest/info')
      .type('form')
      .send({
        f: 'json',
        Web_Map_as_JSON: JSON.stringify({ layer: { url: 'https://somedomain.com/verify-quad-word' } }),
      })
      .expect(200)
      .expect('quad word replaced');
  });
});

test('main server info', () => {
  return request(server)
    .get('/v2/-1/arcgis/rest/info?f=json')
    .expect(200)
    .expect(/currentVersion/)
    .expect(/services/);
});

test('jsonp', () => {
  return request(server)
    .get('/v2/-1/arcgis/rest/info')
    .query({ callback: 'callbackFn', f: 'json' })
    .expect('Content-Type', /javascript/)
    .expect(200)
    .expect(/callbackFn\({"currentVersion":/);
});

test('missing account number', () => {
  return request(server)
    .get('/v2/-99/arcgis/rest/info?f=json')
    .expect(400)
    .expect(/no account for/i);
});

test('invalid account number', () => {
  return request(server)
    .get('/v2/__api__')
    .expect(400)
    .expect(/invalid account number/i);
});

test('export task info', () => {
  return request(server)
    .get('/v2/-1/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task?f=json')
    .expect(200)
    .expect(/category/)
    .expect(/parameters/);
});

test('export task info (post)', () => {
  return request(server)
    .post('/v2/-1/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task?f=json')
    .expect(200)
    .expect(/category/)
    .expect(/parameters/);
});

test('get templates task info', () => {
  return request(server)
    .get(
      '/v2/-1/arcgis/rest/services/Utilities/PrintingTools/GPServer/Get%20Layout%20Templates%20Info%20Task/execute?f=json',
    )
    .expect(200)
    .expect(/results/);
});

test('post to export execute', () => {
  return request(server)
    .post('/v2/-1/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task/execute')
    .type('form')
    .send({
      f: 'json',
      Web_Map_as_JSON: JSON.stringify({
        exportOptions: {
          outputSize: [670, 500],
          dpi: 96,
        },
        mapOptions: { extent: {} },
      }),
      Format: 'PDF',
      Layout_Template: 'MAP_ONLY',
    })
    .expect(/GPDataFile/)
    .expect(200);
});

describe('async print task', () => {
  let jobId;
  test('submitJob', () => {
    return request(server)
      .post('/v2/-3/arcgis/rest/services/WRI/Print/GPServer/Export%20Web%20Map/submitJob')
      .type('form')
      .send({
        f: 'json',
        Web_Map_as_JSON: JSON.stringify({
          exportOptions: {
            outputSize: [670, 500],
            dpi: 96,
          },
          mapOptions: { extent: {} },
        }),
        Format: 'PDF',
        Layout_Template: 'MAP_ONLY',
      })
      .expect(/jobId/)
      .expect((res) => {
        jobId = JSON.parse(res.res.text).jobId;
      })
      .expect(200);
  });

  test('check job requests', () => {
    return request(server)
      .get(`/v2/-3/arcgis/rest/services/WRI/Print/GPServer/Export%20Web%20Map/jobs/${jobId}`)
      .query({ f: 'json' })
      .expect(/jobStatus/)
      .expect(200);
  });

  test('get output file', async () => {
    await sleep(500);
    request(server)
      .get(
        `/v2/-3/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task/jobs/${jobId}/results/Output_File`,
      )
      .query({
        f: 'json',
        returnType: 'data',
      })
      .expect(/GPDataFile/)
      .expect(200);
  });
});

test('hide open quad-word in response', () => {
  return request(server)
    .get('/v2/-1/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task/execute')
    .query({
      f: 'json',
      Web_Map_as_JSON: JSON.stringify({
        exportOptions: { outputSize: [670, 500], dpi: 96 },
        operationalLayers: [
          {
            id: 'WMTS_6557',
            title: 'terrain-basemap',
            opacity: 1,
            minScale: 0,
            maxScale: 0,
            type: 'WebTiledLayer',
            urlTemplate:
              'https://discover.agrc.utah.gov/login/path/test-quad-word/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=terrain_basemap&STYLE=default&FORMAT=image/png&TILEMATRIXSET=5to19&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}',
            credits: '',
            wmtsInfo: {
              url: 'https://discover.agrc.utah.gov/login/path/test-quad-word/wmts',
              layerIdentifier: 'terrain_basemap',
              tileMatrixSet: '5to19',
            },
          },
        ],
      }),
      Format: 'PDF',
      Layout_Template: 'MAP_ONLY',
      printFlag: 'true',
    })
    .expect((res) => {
      if (res.res.text.match(new RegExp(process.env.OPEN_QUAD_WORD, 'g'))) {
        throw new Error('does not hide open quad-word');
      }
    });
});

test('general base task info', () => {
  return request(server)
    .get('/v2/-1/arcgis/rest/services/Utilities/PrintingTools/GPServer?f=json')
    .expect(200)
    .expect(/serviceDescription/);
});

test('general base task info (post)', () => {
  return request(server)
    .post('/v2/-1/arcgis/rest/services/Utilities/PrintingTools/GPServer?f=json')
    .expect(200)
    .expect(/serviceDescription/);
});

test('redirect to repo readme', () => {
  return request(server)
    .get('/')
    .expect(301)
    .expect(/github.com/);
});
