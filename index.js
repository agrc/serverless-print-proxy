/* eslint-disable camelcase */

'use strict';
const app = require('express')();
const request = require('request');
const accounts = require('./accounts');
const bodyParser = require('body-parser');
require('dotenv').config();
const config = require('./config');

const POST = 'POST';
const WEB_MAP_AS_JSON = 'Web_Map_as_JSON';


// enable CORS on all requests
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  next();
});

// required for parsing submitted form data
app.use(bodyParser.urlencoded({ extended: true }));

// general arcgis server info
app.get('/:accountNumber/arcgis/rest/info', (functionRequest, functionResponse) => {
  const account = accounts[functionRequest.params.accountNumber];
  const servicesDirectoryPath = 'arcgis/rest/services';

  const url = account.serviceUrl.split(servicesDirectoryPath)[0] + servicesDirectoryPath;
  request({
    url: url,
    qs: functionRequest.query,
    timeout: config.TIMEOUT
  }, (error, res, body) => {
    functionResponse.status(res && res.statusCode);
    functionResponse.send(body);
  });
});

const getHandler = function (taskName) {
  return function (functionRequest, functionResponse) {
    const account = accounts[functionRequest.params.accountNumber];

    let url = `${account.serviceUrl}/${encodeURIComponent(account[taskName])}`
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
        Origin: functionRequest.headers.Origin
      },
      timeout: config.TIMEOUT * 1000
    };

    // POST is used for requests with too much data to fit in query parameters
    if (options.method === POST) {
      // adding formData to GET requests causes errors with ArcGIS Server
      options.formData = functionRequest.body;

      options.formData[WEB_MAP_AS_JSON] = options.formData[WEB_MAP_AS_JSON].replace(
        new RegExp(account.quadWord, 'g'), process.env.OPEN_QUAD_WORD);
    } else if (options.qs[WEB_MAP_AS_JSON]){
      options.qs[WEB_MAP_AS_JSON] = options.qs[WEB_MAP_AS_JSON].replace(
        new RegExp(account.quadWord, 'g'), process.env.OPEN_QUAD_WORD);
    }

    console.log({
      accountNumber: functionREquest.params.accountNumber,
      url: url,
      method: options.method
    });

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
};

// get templates request
app.get('/:accountNumber/arcgis/rest/services/GPServer/Get%20Layout%20Templates%20Info/:service?',
  getHandler('getTemplatesTaskName'));

// main export request
app.get('/:accountNumber/arcgis/rest/services/GPServer/export',
  getHandler('exportTaskName'));
app.post('/:accountNumber/arcgis/rest/services/GPServer/export/:service',
  getHandler('exportTaskName'));
app.get('/:accountNumber/arcgis/rest/services/GPServer/export/:service',
  getHandler('exportTaskName'));

exports.printproxy = app;
