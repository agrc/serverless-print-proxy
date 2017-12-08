/* eslint-disable no-use-before-define, camelcase */

// concepts from: https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/
'use strict';
const request = require('supertest');
const http = require('http');
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;


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
    .get('/1/arcgis/rest/info?f=json')
    .expect('Access-Control-Allow-Origin', '*')
    .expect('Access-Control-Allow-Methods', 'GET')
  ;
});

test('main server info', () => {
  return request(server)
    .get('/1/arcgis/rest/info?f=json')
    .expect(200)
    .expect(/currentVersion/)
    .expect(/services/)
  ;
});

test('export task info', () => {
  return request(server)
    .get('/1/arcgis/rest/services/GPServer/export?f=json')
    .expect(200)
    .expect(/category/)
    .expect(/parameters/)
  ;
});

test('get templates task info', () => {
  return request(server)
    .get('/1/arcgis/rest/services/GPServer/Get%20Layout%20Templates%20Info/execute?f=json')
    .expect(200)
    .expect(/results/)
  ;
});

test('post to export execute', () => {
  return request(server)
    .post('/1/arcgis/rest/services/GPServer/export/execute')
    .type('form')
    .send({
      f: 'json',
      Web_Map_as_JSON: JSON.stringify({
        exportOptions: {outputSize: [670,500], dpi: 96}
      }),
      Format: 'PDF',
      Layout_Template: 'MAP_ONLY',
      printFlag: 'true'
    })
    .expect(/GPDataFile/)
    .expect(200)
});
