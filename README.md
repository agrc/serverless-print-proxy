# serverless-print-proxy

A Google Cloud Run project for proxying requests to the Esri print service switching out locked down quad words for wide open ones.

## Usage

Use the following url in place of an Esri Print service (e.g. [default AGOL service](https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task)):

```url
https://print.agrc.utah.gov/<accountNumber>/arcgis/rest/services/GPServer/export
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

This project is hosted in GCP (`ut-dts-agrc-print-proxy-prod`). There are several components:

### Source Repositories

This repository is mirrored in GCP so that Cloud Build can trigger builds.

### Cloud Build

There is a Cloud Build trigger that is set up to test and conditionally deploy on each push to `master`. See [`cloudbuild.yaml`](/cloudbuild.yaml) for details.

### Cloud Run

This project is hosted via Cloud Run. The cloud build service deploys a docker container. Make sure to set the `OPEN_QUAD_WORD` environment variable. There is also a custom domain mapping to `print.agrc.utah.gov` configured for the service.
