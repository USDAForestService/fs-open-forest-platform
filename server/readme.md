# U.S. Forest Service Intake Module Server

A running Postgresql database is required in order to run the server locally.  Please make sure you have installed [Postgresql](https://www.postgresql.org/) locally and created a database for this project.

Then run `npm install` to install dependencies.

To setup the database run

`DATABASE_URL=postgres://<user>:<pass>@localhost:<port>/<dbname> ./node_modules/sequelize-cli/bin/sequelize db:migrate`

To start the server for development: `DATABASE_URL=postgres://<user>:<pass>@localhost:<port>/<dbname> npm start` and visit http://localhost:8080

## Noncommercial Endpoints

```POST /permits/applications/special-uses/noncommercial/```

The body of the request must be a JSON object.

Creates a new Noncommercial application.  Returns the created application with an application id added.

Incoming JSON object is validated according to the [noncommercial schema](noncommercial-schema.es6) and data is stored into a table called noncommercialApplications.
