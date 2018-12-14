# Required environment variables

There are environment variables that are required to be set in order to run tests and to run the server in general. Please set up these environment variables either in your shell or on the command line.

We use a specific implementation of [environment variables](https://docs.run.pivotal.io/devguide/deploy-apps/environment-variable.html) that are accessible to the applications' cloud.gov-deployed environment through a variable called `VCAP_SERVICES`. These services are individually defined and must be bound to the application via the manifests located in the `.cg-deploy` directory. The services are available at the `space` level within cloud.gov, but the bindings are application specific. I.e. a service would need to be bound to both the server and the frontend to be available to both. This environment variable is provided as an object and parsed in the `server/vcap-constants.es6`. These services also include access keys to the `s3` bucket and ci deployer keys.

These services are defined in the [Forest Service Cloud Migration Repository](https://github.com/18F/fs-cloud-gov-migration).

To emulate the deployed environment variables we provide a list of local `VCAP_SERVICES` that will be automattically pulled in.

## Local Development Enviroment Variables
The following environment variables are required to run the application locally, in CI, or with docker:

### AWS_CONFIG
  To set aws credentials for the purpose of connecting an s3 bucket. In order to pass end to end tests locally or on CircleCI, you must include valid s3 credentials in the AWS_CONFIG variable.

  {"s3":[{"credentials":{"bucket":"","access_key_id":"","region":"us-east-1","secret_access_key":""},"label":"s3","name":"intake-s3"}]}

  If AWS_CONFIG is not set, system will use the json file [here](/server/environment-variables/aws-config.json)

### SNYK_TOKEN

    (from https://snyk.io/account)

### DATABASE_URL

(optional) This variable can be used to connect to a different database.

    postgres://<user>:<pass>@localhost:<port>/<dbname>

### VCAP_APPLICATION

(optional) This variable can be used to override the uri used for the
application.

    {"uris":["http://localhost:8080"]}

### VCAP_SERVICES

To override the default VCAP_SERVICES that are configured for local development and CI.

  [Local configuration](/server/environment-variables/local.json)

  [Test configuration](/server/environment-variables/test.json)

### OPEN_FOREST_CHROME_DRIVER

(optional) Provide the absolute path to a specific chromedriver binary to use when running e2e tests **locally**.

## Deployed Environment variables
The following environment variables are required for staging and production. In general, these will be set within cloud.gov as `user-provided-services`

VCAP_SERVICES

DATABASE_URL

VCAP_APPLICATION
