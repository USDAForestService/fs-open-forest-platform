'use strict';

let bodyParser = require('body-parser');
let express = require('express');
let noncommercial = require('./noncommercial.es6');
let tempOutfitter = require('./temp-outfitter.es6');

let app = express();

/* Parse request bodies as JSON. */
app.use(bodyParser.json());

/* Don't restrict access on the API from other origins. */
app.use(function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});
app.options('*', function(req, res) {
  res.set('Access-Control-Allow-Headers', 'accept, content-type');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
  res.send();
});

/* Serve static documentation pages. */
app.use('/docs/api', express.static('docs/api'));

/** Get all noncommercial permit applications. */
app.get('/permits/applications/special-uses/noncommercial', noncommercial.getAll);
/** Get a single noncommercial permit application. */
app.get('/permits/applications/special-uses/noncommercial/:id', noncommercial.getOne);
/** Create a new noncommercial permit application. */
app.post('/permits/applications/special-uses/noncommercial', noncommercial.create);
/** Update a noncommercial permit application. */
app.put('/permits/applications/special-uses/noncommercial/:id', noncommercial.update);

/** Get all temp outfitter permit applications. */
app.get('/permits/applications/special-uses/temp-outfitters', tempOutfitter.getAll);
/** Get a temp outfitter permit application. */
app.get('/permits/applications/special-uses/temp-outfitters/:id', tempOutfitter.getOne);
/** Create a new temp outfitter permit application. */
app.post('/permits/applications/special-uses/temp-outfitters', tempOutfitter.create);
/** Handle temp outfitter file upload and invokes streamToS3 function. */
app.post('/permits/applications/special-uses/temp-outfitters/file', tempOutfitter.streamToS3.array('file', 1), tempOutfitter.attachFile);

/** Get the number of seconds that this instance has been running. */
app.get('/uptime', function(req, res) {
  res.send('Uptime: ' + process.uptime() + ' seconds');
});

/* Start the server. */
app.listen(8080);

/* Export needed for testing. */
module.exports = app;
