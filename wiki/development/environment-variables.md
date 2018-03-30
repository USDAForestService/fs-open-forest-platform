# Required environment variables

There are environment variables that are required to be set in order to run tests
and to run the server in general. Please set up these environment variables either in your shell or on the command line.

In general setting an environment variable in your shell is similar to:

`export ENV_VAR=something`

## The following environment variables are required to run the application locally, in CI, or with docker:

AWS_CONFIG
  To set aws credentials for the purpose of connecting an s3 bucket. In order to pass end to end tests locally or on CircleCI, you must include valid s3 credentials in the AWS_CONFIG variable.

  {"s3":[{"credentials":{"bucket":"","access_key_id":"","region":"us-east-1","secret_access_key":""},"label":"s3","name":"intake-s3"}]}

  If AWS_CONFIG is not set, system will use the json file [here](server/vcap-services/aws-config.json)

SNYK_TOKEN

    (from https://snyk.io/account)

## The following environment variables are only required to run the application locally when not using docker:

DATABASE_URL

    postgres://<user>:<pass>@localhost:<port>/<dbname>

PLATFORM

    local

VCAP_APPLICATION

    {"uris":["http://localhost:8080"]}

## To override the default VCAP_SERVICES that are configured for local development and CI.

VCAP_SERVICES

  [Local or CI configuration](/server/vcap-services/local-or-ci.json)

## The following environment variables are required for staging and production

VCAP_SERVICES

  [Staging configuration](/server/vcap-services/staging.json)

DATABASE_URL

VCAP_APPLICATION
