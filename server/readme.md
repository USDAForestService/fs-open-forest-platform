# U.S. Forest Service Intake Module Server

A running Postgresql database is required in order to run the server locally.  Please make sure you have installed [Postgresql](https://www.postgresql.org/) locally and created a database for this project.

Then run `yarn install` to install dependencies.

To setup the database run

`DATABASE_URL=postgres://<user>:<pass>@localhost:<port>/<dbname> yarn migrate`

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

Incoming JSON object is validated according to the [noncommercial schema](noncommercial-schema.es6) and data is stored into a table called noncommercialApplications.

```GET /permits/applications```

This endpoint retrieves all applications stored in the database.  Currently it only retrieves Noncommercial applications.  Will return a JSON array of Application objects.
