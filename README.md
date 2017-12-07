# serverless-print-proxy

## local emulation via https://cloud.google.com/functions/docs/emulator
`serverless invoke local` doesn't seem to be supported with the Google provider.

1. `functions-emulator start`
1. `functions-emulator deploy http --trigger-http`
1. `functions-emulator call http`
