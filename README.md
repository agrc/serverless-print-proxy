# serverless-print-proxy

[![Build Status](https://travis-ci.com/agrc/serverless-print-proxy.svg?branch=master)](https://travis-ci.com/agrc/serverless-print-proxy)

## Usage

Use the following url in place of an Esri Print service (e.g. [default AGOL service](https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task)):

```url
https://us-central1-utahkoopserver.cloudfunctions.net/printproxy/<accountNumber>/arcgis/rest/services/GPServer/export
```

The account number must have a corresponding key in `accounts.js`.

## Setup for local development

1. Create `.env` file with print proxy wide open quad word.
1. `npm install` & `npm start`

## URL Requirements for Web App Builder Print Widget

The print widget performs validation on the URL in the properties form. It appears that it has to match something like:

```regex
/https?:\/\/.+\/GPServer\/.*/
```

If the URL passes validation, then it makes a GET request (`arcgis/rest/info?f=json`) to get info about the server.

## Testing

Run `npm test` to run jest tests.

There's also an [AGOL web app](http://utah.maps.arcgis.com/apps/webappbuilder/index.html?id=177c2b166a8d4cb79d888f28f950b33a) that you can test with.

## Deployment

Commits to master are automatically deployed to production pending passing tests via Cloud Build because 🤓.
