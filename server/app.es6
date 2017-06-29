'use strict';

let bodyParser = require('body-parser');
let express =  require('express');

let tempOutfitter = require('./temp-outfitter.es6');
let noncommercial = require('./noncommercial.es6');
let allAppFuncs = require('./application-general.es6');

// server creation ----------------------------------------------------------

let app = express();
app.use(bodyParser.json());

// middleware that will add the Access-Control-Allow-Origin header to everything
app.use(function(req, res, next) {
  var origin = req.headers.origin;
  if(origin === 'http://localhost:4200'){
    res.set('Access-Control-Allow-Origin', origin);
  } else {
    res.set('Access-Control-Allow-Origin', 'https://fs-intake-staging.app.cloud.gov');
  }
  res.set('Access-Control-Allow-Credentials', true);
  next();
});

// set these headers on all of the OPTIONS preflight responses
app.options('*', function(req, res) {
  res.set('Access-Control-Allow-Headers', 'accept, content-type');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
  res.send();
});

// Endpoints

// POST /permits/applications/special-uses/noncommercial/
// creates a new noncommercial application
app.post('/permits/applications/special-uses/noncommercial', noncommercial.createNoncommercialTempApp);

// POST /permits/applications/special-uses/temp-outfitters
// creates a new temp outfitter application
app.post('/permits/applications/special-uses/temp-outfitters', tempOutfitter.createTempOutfitterApp);

// POST /permits/applications/special-uses/temp-outfitters/file
// Handles temp outfitter file upload and invokes streamToS3 function
app.post('/permits/applications/special-uses/temp-outfitters/file', tempOutfitter.streamToS3.array('file',1), tempOutfitter.createAppFile);

// PUT /permits/applications/special-uses/noncommercial/:tempControlNumber
// updates an existing noncommercial application
// may not be able to update everything wholesale due to possible field audit requirements
app.put('/permits/applications/:id', noncommercial.updateApp);

// GET /permits/applications/special-uses/noncommercial/:tempControlNumber
app.get('/permits/applications/:id', noncommercial.getApp);

// GET /permits/applications
// retrieves all applications in the system
app.get('/permits/applications', allAppFuncs.getAllApps);

app.get('/uptime', function(req, res) {
  res.send('Uptime: ' + process.uptime() + ' seconds');
});

// start the server
app.listen(8080);

// export needed for testing
module.exports = app;
