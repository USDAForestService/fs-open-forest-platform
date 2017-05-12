# U.S. Forest Service Intake Module Server

For development: `npm start` and visit http://localhost:8080

## Noncommercial Endpoints

```POST /permits/applications/special-uses/noncommercial/```

Creates a new Noncommerical application.  Returns the created application with a temporary
control number added.

Note: Currently does not validate incoming data or store to the database
