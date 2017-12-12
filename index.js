/* eslint-disable camelcase */

'use strict';
const app = require('express')();
const request = require('request');
const accounts = require('./accounts');
const bodyParser = require('body-parser');
require('dotenv').config();

const POST = 'POST';


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
    qs: functionRequest.query
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
      }
    };

    // adding formData to GET requests causes errors with ArcGIS Server
    if (options.method === POST) {
      options.formData = functionRequest.body;

      // switch out quad words
      options.formData.Web_Map_as_JSON = options.formData.Web_Map_as_JSON.replace(
        new RegExp(account.quadWord, 'g'), process.env.OPEN_QUAD_WORD);
    }

    request(options, (error, agsResponse, body) => {
      functionResponse.status(agsResponse && agsResponse.statusCode);
      functionResponse.send(body);
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

exports.printproxy = app;
