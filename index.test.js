/* eslint-disable no-use-before-define, camelcase, max-len, no-magic-numbers */

// concepts from: https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/
'use strict';
const request = require('supertest');
const http = require('http');
jasmine.DEFAULT_TIMEOUT_INTERVAL = 40000;


const TEST_PORT = 3000;
let server;

beforeEach(() => {
  const app = require('./index').printproxy;
  server = http.createServer(app);

  return server.listen(TEST_PORT);
});

afterEach(() => {
  return server.close();
});

test('CORS headers', () => {
  return request(server)
    .get('/-1/arcgis/rest/info?f=json')
    .expect('Access-Control-Allow-Origin', '*')
    .expect('Access-Control-Allow-Methods', 'GET')
  ;
});

test('main server info', () => {
  return request(server)
    .get('/-1/arcgis/rest/info?f=json')
    .expect(200)
    .expect(/currentVersion/)
    .expect(/services/)
  ;
});

test('export task info', () => {
  return request(server)
    .get('/-1/arcgis/rest/services/GPServer/export?f=json')
    .expect(200)
    .expect(/category/)
    .expect(/parameters/)
  ;
});

test('get templates task info', () => {
  return request(server)
    .get('/-1/arcgis/rest/services/GPServer/Get%20Layout%20Templates%20Info/execute?f=json')
    .expect(200)
    .expect(/results/)
  ;
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
          dpi: 96
        },
        mapOptions: { extent: {} }
      }),
      Format: 'PDF',
      Layout_Template: 'MAP_ONLY'
    })
    .expect(/GPDataFile/)
    .expect(200)
  ;
});

test('hide open quad word in response', () => {
  return request(server)
    .get('/-1/arcgis/rest/services/GPServer/export/execute')
    .query({
      f: 'json',
      Web_Map_as_JSON: JSON.stringify({
        exportOptions: { outputSize: [670, 500],
          dpi: 96 },
        operationalLayers: [{
          id: 'WMTS_6557',
          title: 'terrain-basemap',
          opacity: 1,
          minScale: 0,
          maxScale: 0,
          type: 'WebTiledLayer',
          urlTemplate: 'https://discover.agrc.utah.gov/login/path/test-quad-word/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=terrain_basemap&STYLE=default&FORMAT=image/png&TILEMATRIXSET=5to19&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}',
          credits: '',
          wmtsInfo: {
            url: 'https://discover.agrc.utah.gov/login/path/test-quad-word/wmts',
            layerIdentifier: 'terrain_basemap',
            tileMatrixSet: '5to19'
          }
        }]
      }),
      Format: 'PDF',
      Layout_Template: 'MAP_ONLY',
      printFlag: 'true'
    })
    .expect((res) => {
      if (res.res.text.match(new RegExp(process.env.OPEN_QUAD_WORD, 'g'))) {
        throw new Error('does not hide open quad word');
      }
    })
  ;
});

test('return 500 error if no OPEN_QUAD_WORD env var is present', () => {
  const originalQuadWord = process.env.OPEN_QUAD_WORD;
  delete process.env.OPEN_QUAD_WORD;

  return request(server)
    .get('/-1/arcgis/rest/services/GPServer/export/execute')
    .expect(500)
    .expect(/defined/)
    .then(() => {
      process.env.OPEN_QUAD_WORD = originalQuadWord;
    })
  ;
});

test('general base task info', () => {
  return request(server)
    .get('/-1/arcgis/rest/services/GPServer?f=json')
    .expect(200)
    .expect(/serviceDescription/);
});
