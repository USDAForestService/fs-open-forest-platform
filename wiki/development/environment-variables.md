# Required environment variables

There are environment variables that are required to be set in order to run tests
and to run the server in general. Please set up these environment variables either in your shell or on the command line.

In general setting an environment variable in your shell is similar to:

`export ENV_VAR=something`

and on the command line as part of a command:

`ENV_VAR=something ANOTHER_ENV_VAR=somethingelse <rest of command>`

## The following environment variables are required to run the application locally or with CircleCI:

DATABASE_URL

    postgres://<user>:<pass>@localhost:<port>/<dbname>

    or for CircleCI

    postgres://ubuntu:@localhost:5432/circle_test

PLATFORM

    local

    or for CircleCI

    CI

SNYK_TOKEN

    (from https://snyk.io/account)

VCAP_APPLICATION

    {"uris":["http://localhost:8080"]}

AWS_CONFIG
  To set aws credentials for the purpose of connecting an s3 bucket. In order to pass end to end tests locally or on CircleCI, you must include valid s3 credentials in the AWS_CONFIG variable.

  {"s3":[{"credentials":{"bucket":"","access_key_id":"","region":"us-east-1","secret_access_key":""},"label":"s3","name":"intake-s3"}]}

  If AWS_CONFIG is not set, system will use the json file [here](server/vcap-services/aws-config.json)

VCAP_SERVICES

  [Local or CI configuration](/server/vcap-services/local-or-ci.json)

  [Staging configuration](/server/vcap-services/staging.json)
