# U.S. Forest Service Intake Module Server

A running Postgresql database is required in order to run the server locally.  Please make sure you have installed [Postgresql](https://www.postgresql.org/) locally and created a database for this project.

Then run `yarn install` to install dependencies.

## Environment variables

There are two environment variables that are required to be set in order to run tests
and to run the server in general.  Please set up these environment variables either in your shell or on the command line.

In general setting an environment variable in your shell is similar to:

`export ENV_VAR=something`

and on the command line as part of a command:

`ENV_VAR=something ANOTHER_ENV_VAR=somethingelse <rest of command>`

The following environment variables are required:

- `DATABASE_URL` in the format of `postgres://<user>:<pass>@localhost:<port>/<dbname>`
- `VCAP_SERVICES` is a JSON object that contains details for accessing the middle layer api and Amazon S3 services. For running tests locally the values can be set to anything. One caveat is that the MIDDLE_LAYER_BASE_URL needs to end with a slash (`/`). A sample value for `VCAP_SERVICES` is: `{"user-provided":[{"credentials":{"MIDDLELAYER_BASE_URL":"http://localhost:8080/","MIDDLELAYER_PASSWORD":"pass","MIDDLELAYER_USERNAME":"user"},"label":"user-provided","name":"middlelayer-service","syslog_drain_url":"","tags":[],"volume_mounts":[]}],"s3":[{"credentials":{"bucket": "bucket_name", "access_key_id": "", "region": "us-east-1", "secret_access_key": ""}}]}`

## Available commands

To run any of these commands, either the environment variables above must be available in your shell or on the command line

To setup the database run

`yarn migrate`

To revert the last database migration run

`yarn undoLastMigrate`

To revert all of the database migrations and start with a blank database run

`yarn undoAllMigrate`

If you would like to seed the database with some test data, run:

`yarn seed`

To remove that data from the database run:

`./node_modules/sequelize-cli/bin/sequelize db:seed:undo:all`

To start the server for development: `yarn dev` and visit http://localhost:8080

To run eslint for linting:

`yarn lint`

The linting results will be put into `server/lint-results.html`.

To run all of the tests locally, be sure your Postgresql server is running then run:

`yarn test`

To run code coverage locally, be sure your Postgresql server is running then run:

`yarn coverage`

The coverage results can be found in `server/coverage/index.html`

## Server API Documentation

With your local Node server running, browse to http://localhost:8080/docs/api in order to view the interactive Swagger API documentation.  This documentation will allow interactive access to the API endpoints.
