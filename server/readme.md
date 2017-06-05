# U.S. Forest Service Intake Module Server

A running Postgresql database is required in order to run the server locally.  Please make sure you have installed [Postgresql](https://www.postgresql.org/) locally and created a database for this project.

Then run `yarn install` to install dependencies.

## Environment variables

There are a number of environment variables that are required to be set in order to run tests
and to run the server in general.  Please set up these environment variables either in your shell or on the command line.

In general setting an environment variable in your shell is similar to:

`set ENV_VAR=something`

and on the command line as part of a command:

`ENV_VAR=something rest of command`

The following environment variables are required:

- `DATABASE_URL` in the format of `postgres://<user>:<pass>@localhost:<port>/<dbname>`
- `BUCKET_NAME` the name of the S3 bucket that files should be stored in
- `MIDDLELAYER_BASE_URL` the base URL of the middle layer API
- `MIDDLELAYER_USERNAME` the username to authenticate to the middle layer
- `MIDDLELAYER_PASSWORD` the password to authenticate to the middle layer

## Available commands

To setup the database run

`DATABASE_URL=postgres://<user>:<pass>@localhost:<port>/<dbname> yarn migrate`

To revert the last database migration run

`DATABASE_URL=postgres://<user>:<pass>@localhost:<port>/<dbname> yarn undoLastMigrate`

To revert all of the database migrations and start with a blank database run

`DATABASE_URL=postgres://<user>:<pass>@localhost:<port>/<dbname> yarn undoAllMigrate`

If you would like to seed the database with some test data, run:

`DATABASE_URL=postgres://<user>:<pass>@localhost:<port>/<dbname> yarn seed`

To remove that data from the database run:

`DATABASE_URL=postgres://<user>:<pass>@localhost:<port>/<dbname> ./node_modules/sequelize-cli/bin/sequelize db:seed:undo:all`

To start the server for development: `DATABASE_URL=postgres://<user>:<pass>@localhost:<port>/<dbname> yarn dev` and visit http://localhost:8080

To run eslint for linting:

`yarn lint`

The linting results will be put into `server/lint-results.html`.

To run all of the tests locally, be sure your Postgresql server is running then run:

`DATABASE_URL=postgres://<user>:<pass>@localhost:<port>/<dbname> yarn test`

To run code coverage locally, be sure your Postgresql server is running then run:

`DATABASE_URL=postgres://<user>:<pass>@localhost:<port>/<dbname> yarn coverage`


## Noncommercial Endpoints

```POST /permits/applications/special-uses/noncommercial/```

The body of the request must be a JSON object.

Creates a new Noncommercial application.  Returns the created application with an application id added.

Incoming JSON object is validated according to the [schemas](json-schemas/noncommercial-schema.es6) and data is stored into a table called noncommercialApplications.

```POST /permits/applications/special-uses/temp-outfitters```

The temp outfitters endpoint is not fully functional at this time.

```POST /permits/applications/special-uses/temp-outfitters/file```

This endpoint allows for a file to be uploaded to S3 and stored.  More details TBD.

```PUT /permits/applications/:id```

Update a single application.  Requires a JSON object for the application as the request body.

```GET /permits/applications/:id```

Retrieve a single application from the database.  Requires the app control number UUID.

```GET /permits/applications```

This endpoint retrieves all applications stored in the database.  Currently it only retrieves Noncommercial applications.  Will return a JSON array of Application objects.

```GET /uptime```

Returns the current uptime for the server.
