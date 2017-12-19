# serverless-print-proxy
[![Build Status](https://travis-ci.org/agrc/serverless-print-proxy.svg?branch=master)](https://travis-ci.org/agrc/serverless-print-proxy)

## Usage
Use the following url in place of an Esri Print service (e.g. [default AGOL service](https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task)):

```url
https://us-central1-printproxyserverless.cloudfunctions.net/printproxy/<accountNumber>/arcgis/rest/services/GPServer/export
```

The account number must have a corresponding key in `accounts.js`.


## Setup for local development
1. Define `GOOGLE_APPLICATION_CREDENTIALS` as an environment variable with a path to your google keycode Json file.
1. Define `OPEN_QUAD_WORD` as an environment variable with the value being the wide open quad word for this project.

## Local Emulation via [Google's emulator](https://cloud.google.com/functions/docs/emulator)
`serverless invoke local` doesn't seem to be supported with the Google provider.

1. `functions-emulator start`
1. `functions-emulator deploy printproxy --trigger-http`
1. `functions-emulator call http`

Or hit http://localhost:8010/utah-imagery/us-central1/printproxy/

## URL Requirements for Web App Builder Print Widget
The print widget performs validation on the URL in the properties form. It appears that it has to match something like:
```regex
/https?:\/\/.+\/GPServer\/.*/
```

If the URL passes validation, then it makes a GET request (`arcgis/rest/info?f=json`) to get info about the server.

## Testing
Run `yarn test` to run jest tests.
