# serverless-print-proxy

## local emulation via [Google's emulator](https://cloud.google.com/functions/docs/emulator)
`serverless invoke local` doesn't seem to be supported with the Google provider.

1. `functions-emulator start`
1. `functions-emulator deploy http --trigger-http`
1. `functions-emulator call http`

## URL Requirements for Web App Builder Print Widget
The print widget performs validation on the URL in the properties form. It appears that it has to match something like:
```regex
/https?:\/\/.+\/GPServer\/.*/
```

If the URL passes validation, then it makes a GET request (`arcgis/rest/info?f=json`) to get info about the server.
