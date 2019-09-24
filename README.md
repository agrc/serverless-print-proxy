# serverless-print-proxy
[![Build Status](https://travis-ci.com/agrc/serverless-print-proxy.svg?branch=master)](https://travis-ci.com/agrc/serverless-print-proxy)

## Usage
Use the following url in place of an Esri Print service (e.g. [default AGOL service](https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task)):

```url
https://us-central1-utahkoopserver.cloudfunctions.net/printproxy/<accountNumber>/arcgis/rest/services/GPServer/export
```

The account number must have a corresponding key in `accounts.js`.


## Setup for local development
1. Define `GOOGLE_APPLICATION_CREDENTIALS` as an environment variable with a path to your google keycode Json file.
1. Create `.env` file with print proxy wide open quad word.

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

There's also an [AGOL web app](http://utah.maps.arcgis.com/apps/webappbuilder/index.html?id=177c2b166a8d4cb79d888f28f950b33a) that you can test with.

## Deployment

Commits to master are automatically deployed to production pending passing tests via TravisCI because 🤓.
