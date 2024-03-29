import { jest } from '@jest/globals';
import http from 'http';
import request from 'supertest';
import { promisify } from 'util';
import app from './index';

jest.retryTimes(50, {
  logErrorsBeforeRetry: true,
});

const sleep = promisify(setTimeout);
let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(done);
});

afterAll((done) => {
  server.close(done);
});

test('main server info', () => {
  return request(server)
    .get('/-1/arcgis/rest/info?f=json')
    .expect(200)
    .expect(/currentVersion/)
    .expect(/services/);
});

test('export task info', () => {
  return request(server)
    .get('/-1/arcgis/rest/services/GPServer/export?f=json')
    .expect(200)
    .expect(/category/)
    .expect(/parameters/);
});
test('export task info (post)', () => {
  return request(server)
    .get('/-1/arcgis/rest/services/GPServer/Export%20Web%20Map%20Task?f=json')
    .expect(200)
    .expect(/category/)
    .expect(/parameters/);
});

test('get templates task info', () => {
  return request(server)
    .get('/-1/arcgis/rest/services/GPServer/Get%20Layout%20Templates%20Info/execute?f=json')
    .expect(200)
    .expect(/results/);
});

test('post to export execute', () => {
  return request(server)
    .post('/-1/arcgis/rest/services/GPServer/export/execute')
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
      .post('/11/arcgis/rest/services/GPServer/export/submitJob')
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
      .get(`/11/arcgis/rest/services/GPServer/export/jobs/${jobId}`)
      .query({ f: 'json' })
      .expect(/jobStatus/)
      .expect(200);
  });

  test('get output file', async () => {
    await sleep(500);
    request(server)
      .get(`/11/arcgis/rest/services/GPServer/export/jobs/${jobId}/results/Output_File`)
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
    .get('/-1/arcgis/rest/services/GPServer/export/execute')
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

test('return 500 error if no OPEN_QUAD_WORD env var is present', async () => {
  const originalQuadWord = process.env.OPEN_QUAD_WORD;
  delete process.env.OPEN_QUAD_WORD;

  await request(server)
    .get('/-1/arcgis/rest/services/GPServer/export/execute')
    .expect(500)
    .expect(/defined/);
  process.env.OPEN_QUAD_WORD = originalQuadWord;
});

test('general base task info', () => {
  return request(server)
    .get('/-1/arcgis/rest/services/GPServer?f=json')
    .expect(200)
    .expect(/serviceDescription/);
});

test('general base task info (post)', () => {
  return request(server)
    .post('/-1/arcgis/rest/services/GPServer?f=json')
    .expect(200)
    .expect(/serviceDescription/);
});

test('redirect to repo readme', () => {
  return request(server)
    .get('/')
    .expect(301)
    .expect(/github.com/);
});
