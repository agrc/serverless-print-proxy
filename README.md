# Print Proxy

A web service for proxying requests to the Esri print service switching out locked down quad-words for wide open ones.

## The Problem

[UGRC’s base maps (including the Google imagery)](https://gis.utah.gov/discover/) are served via a custom server application called Discover. Part of the advantage of using Discover is that it allows you to secure and track usage via quad-words. These unique words are assigned to a specific user and are locked down to a specific domain or IP address. For example, if my quad-word is locked down to `my-domain.com`, then requests originating from any other domain or IP address are blocked by Discover. This prevents unauthorized access of licensed content, as well as allows UGRC to track analytics.

This quad-word system works great . . . until you try to use one of [Esri’s out-of-the-box print services](https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer). When you send a web map to one of these print services, the service reconstructs all of the layers on the server. This causes requests for base maps to be sent from the ArcGIS Server machine rather than the user’s browser (with your domain as the referrer). We do allow wide-open quad-words (i.e., quad-words not locked down to any domain/IP) to be used by those who need to make requests from servers or other local machines. However, the wide-open quad-words can’t be used in web applications because they could be copied and used by unauthorized users.

## The Solution

This project solves this problem by acting as a proxy between web applications and Esri print services. When it receives a request, it switches out the locked down quad-word with a wide-open one and then sends it on to the print service. It also scrubs the wide-open quad-word from the response to prevent it from being compromised.

## Usage

1. [Open a pull request](https://github.com/agrc/serverless-print-proxy/compare) to add a configuration for a new [account](./accounts.js).

1. Take the path to your print service...

<!-- markdownlint-disable MD033 -->
<pre>
https://<b>utility.arcgisonline.com</b>/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task
</pre>

...and replace the domain name with `print.ugrc.utah.gov/v2/<account-number>` like this...

<pre>
https://<b>print.ugrc.utah.gov/v2/99</b>/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task
</pre>
<!-- markdownlint-enable MD033 -->

You can use this new URL in place of the original print service in any Esri products.

_The account number must have a corresponding key in [`accounts.js`](./accounts.js)._

## Development

### One-time Setup

1. `brew install mkcert`
1. `mkcert -install`
1. `mkcert localhost`
1. Create `.env` file with print proxy wide open quad-word.
1. `touch .env && echo 'OPEN_QUAD_WORD=<wide-open-quad-word>' >> .env`
1. `npm install` & `npm start`

## Testing

Run `npm test` to run tests.

There's also an [AGOL web app](https://experience.arcgis.com/experience/2ade141aca3244ee99b8e16185a76f32) that you can test the different environments with.

## Deployment

`gcp-terraform/print-proxy` is used for infrastructure setup and GitHub actions are for updates.

## Upgrading NodeJS

Make sure to update `Dockerfile` and `.node-version` files.
