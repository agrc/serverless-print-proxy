# Print Proxy

A web service for proxying requests to the Esri print service switching out locked down quad-words for wide open ones.

## The Problem

[UGRC’s base maps (including the Google imagery)](https://gis.utah.gov/discover/) are served via a custom server application called Discover. Part of the advantage of using Discover is that it allows you to secure and track usage via quad-words. These unique words are assigned to a specific user and are locked down to a specific domain or IP address. For example, if my quad-word is locked down to `my-domain.com`, then requests originating from any other domain or IP address are blocked by Discover. This prevents unauthorized access of licensed content, as well as allows UGRC to track analytics.

This quad-word system works great . . . until you try to use one of [Esri’s out-of-the-box print services](https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer). When you send a web map to one of these print services, the service reconstructs all of the layers on the server. This causes requests for base maps to be sent from the ArcGIS Server machine rather than the user’s browser (with your domain as the referrer). We do allow wide-open quad-words (i.e., quad-words not locked down to any domain/IP) to be used by those who need to make requests from servers or other local machines. However, the wide-open quad-words can’t be used in web applications because they could be copied and used by unauthorized users.

## The Solution

This project solves this problem by acting as a proxy between web applications and Esri print services. When it receives a request, it switches out the locked down quad-word with a wide-open one and then sends it on to the print service. It also scrubs the wide-open quad-word from the response to prevent it from being compromised.

## Usage

1. [Open a pull request](https://github.com/agrc/serverless-print-proxy/compare) to add a configuration for a new [account](./accounts.js).
1. Use the following url in place of an Esri print service (e.g. [default AGOL service](https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task)):

```url
https://print.agrc.utah.gov/<accountNumber>/arcgis/rest/services/GPServer/export
```

_The account number must have a corresponding key in [`accounts.js`](./accounts.js)._

## Development

### One-time Setup

1. `brew install mkcert`
1. `mkcert -install`
1. `mkcert localhost`
1. Create `.env` file with print proxy wide open quad-word.
1. `npm install` & `npm start`

### URL Requirements for Web App Builder Print Widget

The print widget performs validation on the URL in the properties form. It appears that it has to match something like:

```regex
/https?:\/\/.+\/GPServer\/.*/
```

If the URL passes validation, then it makes a GET request (`arcgis/rest/info?f=json`) to get info about the server.

## Testing

Run `npm test` to run jest tests.

There's also an [AGOL web app](http://utah.maps.arcgis.com/apps/webappbuilder/index.html?id=177c2b166a8d4cb79d888f28f950b33a) that you can test with.

## Deployment

`gcp-terraform/print-proxy` is used for infrastructure setup and GitHub actions are for updates.

## Upgrading NodeJS

Make sure to update `.node-version` and `Dockerfile`.
