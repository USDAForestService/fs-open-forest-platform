'use strict';
let express =  require('express');
let bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json());

// will eventually validate against json schema
// and store into db
// populates a tempControlNumber on the object before return
let createNoncommercialTempApp = (req, res) => {
  req.body['tempControlNumber'] = 1;
  res.status(200).json(req.body);
}

// POST /permits/applications/special-uses/noncommercial/
// creates a new noncommercial application
app.post('/permits/applications/special-uses/noncommercial', createNoncommercialTempApp);

// PUT /permits/applications/special-uses/noncommercial/:tempControlNumber
// updates an existing noncommercial application
// may not be able to update everything wholesale due to possible field audit requirements

// GET /permits/applications/special-uses/noncommercial/:tempControlNumber
// retrieve an existing noncommercial application

app.listen(8080);
