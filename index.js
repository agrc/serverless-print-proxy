'use strict';
const app = require('express')();
const request = require('request');
const accounts = require('./accounts');


// enable CORS on all requests
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  next();
});

// general arcgis server info
app.get('/:accountNumber/arcgis/rest/info', (fReq, fRes) => {
  const account = accounts[fReq.params.accountNumber];
  const servicesDirectoryPath = 'arcgis/rest/services';

  const url = account.serviceUrl.split(servicesDirectoryPath)[0] + servicesDirectoryPath;
  request({
    url: url,
    qs: fReq.query
  }, (error, res, body) => {
    fRes.status(res && res.statusCode);
    fRes.send(body);
  });
});

const getHandler = function (taskName) {
  return function (functionRequest, functionResponse) {
    const account = accounts[functionRequest.params.accountNumber];
    let url = `${account.serviceUrl}/${encodeURIComponent(account[taskName])}`
    if (functionRequest.params.method) {
      url += `/${functionRequest.params.method}`;
    }

    request({
      url: url,
      qs: functionRequest.query
    }, (error, agsResponse, body) => {
      functionResponse.status(agsResponse && agsResponse.statusCode);
      functionResponse.send(body);
    });
  };
};

// get templates request
app.get('/:accountNumber/arcgis/rest/services/GPServer/Get%20Layout%20Templates%20Info/:method?',
  getHandler('getTemplatesTaskName'));

// main export request
app.get('/:accountNumber/arcgis/rest/services/GPServer/export/:method?',
  getHandler('exportTaskName'));

exports.printproxy = app;
