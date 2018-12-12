# Available services

The following services are available to leverage in components.

```
frontend/
 ├──/src
      ├──/app
        ├──/src
          ├──/_services
            ├──alert.service.ts             * display alerts
            ├──application.service.ts       * http requests for applications
            ├──auth-guard.service.ts        * manage authentication on routes
            ├──authentication.service.ts    * http requests for authentication
            ├──mock.service.ts              * utility functions of reusable mocks for specs
            └──util.ts                      * general utility functions
          ├──/application-forms
            ├──/_services
              ├──application-fields.service.ts     * utility functions specific to application fields
              └──file-upload.service.ts            * utility functions related to file uploads
          ├──/trees  
            ├──/_services
              ├──christmas-trees-application.service.ts    * http requests functions for Christmas tree permits
              ├──forest.service.ts                         * http requests for forests
```
