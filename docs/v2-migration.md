# Migrating to v2

Version two of this project has many improvements including support for Experience Builder. However, there are some breaking changes that will require you to update your apps. To ensure that you have plenty of time to upgrade, we have created a new domain and route for v2 (`print.ugrc.utah.gov/v2`) and will continue to support the old domain (`print.agrc.utah.gov`) for the next few months.

## To upgrade your app

1. Find your service URL and account number in the old [accounts.js file](https://github.com/agrc/serverless-print-proxy/blob/v1.1.16/accounts.js). For example, if this is your account:

```js
1: {
    // Created for Tom Thompson at DOGM
    serviceUrl: 'https://maps.dnr.utah.gov/arcgis/rest/services/Utilities/PrintingTools/GPServer',
    exportTaskName: 'Export Web Map Task',
    getTemplatesTaskName: 'Get Layout Templates Info Task',
    quadWord: 'famous-florida-quiet-passive',
  },
```

Then the values you need are:

```text
URL: https://maps.dnr.utah.gov/arcgis/rest/services/Utilities/PrintingTools/GPServer
Account Number: 1
```

<!-- markdownlint-disable MD029 -->

2. Replace your domain name with `print.ugrc.utah.gov/v2/<your-account-number>` like this:

<!-- markdownlint-disable MD033 -->
<pre>
https://<b>print.ugrc.utah.gov/v2/1</b>/arcgis/rest/services/Utilities/PrintingTools/GPServer
</pre>
<!-- markdownlint-enable MD033 -->

3. Replace the old v1 Print Proxy URL...

```text
https://print.agrc.utah.gov/1/arcgis/rest/services/GPServer/export
```

... with the new v2 URL from step 2 in your app.

4. Test and deploy the new version of your app.

If you run into any issues, please feel free to [open a new GitHub issue](https://github.com/agrc/serverless-print-proxy/issues/new) or send an email to [ugrc-developers@utah.gov](mailto:ugrc-developers@utah.gov).
