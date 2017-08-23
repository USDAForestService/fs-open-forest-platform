'use strict';

let auth = require('basic-auth');
let bodyParser = require('body-parser');
let express = require('express');
let helmet = require('helmet');
let loginGov = require('./auth/login-gov.es6');
let noncommercial = require('./noncommercial.es6');
let passport = require('passport');
let tempOutfitter = require('./temp-outfitter.es6');
let util = require('./util.es6');
let vcapServices = require('./vcap-services.es6');
var morgan = require('morgan');
var session = require('express-session');

let app = express();

/* Use helmet for increased security. */
app.use(helmet());

/* Use morgan for increased logging. */
app.use(morgan('combined'));

/* Parse request bodies as JSON. */
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(
  session({
    secret: 'secret',
    name: 'sessionId'
  })
);

/* Setup passport. */
if (process.env.PLATFORM !== 'CircleCI') {
  loginGov.setup();
  app.use(passport.initialize());
  app.use(passport.session());
}

let accessControl = function(req, res, next) {
  res.set('Access-Control-Allow-Origin', vcapServices.intakeClientBaseUrl);
  res.set('Access-Control-Allow-Credentials', true);
  next();
  return;
};

app.options('*', accessControl, function(req, res) {
  res.set('Access-Control-Allow-Headers', 'accept, content-type');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
  res.send();
});

/* Serve static documentation pages. */
app.use('/docs/api', express.static('docs/api'));

/** Get a single noncommercial permit application. */
app.get('/permits/applications/special-uses/noncommercial/:id', accessControl, noncommercial.getOne);
/** Create a new noncommercial permit application. */
app.post('/permits/applications/special-uses/noncommercial', accessControl, noncommercial.create);
/** Update a noncommercial permit application. */
app.put('/permits/applications/special-uses/noncommercial/:id', accessControl, noncommercial.update);

/** Get a temp outfitter permit application. */
app.get('/permits/applications/special-uses/temp-outfitter/:id', accessControl, tempOutfitter.getOne);
/** Create a new temp outfitter permit application. */
app.post('/permits/applications/special-uses/temp-outfitter', accessControl, tempOutfitter.create);
/** Update a temp outfitter permit application. */
app.put('/permits/applications/special-uses/temp-outfitter/:id', accessControl, tempOutfitter.update);
/** Handle temp outfitter file upload and invokes streamToS3 function. */
app.post(
  '/permits/applications/special-uses/temp-outfitter/file',
  accessControl,
  tempOutfitter.streamToS3.array('file', 1),
  tempOutfitter.attachFile
);

/** Get all applications with status on Received or Hold. */
app.get('/permits/applications', accessControl, util.getAllOpenApplications);

/** Get the number of seconds that this instance has been running. */
app.get('/uptime', function(req, res) {
  res.send('Uptime: ' + process.uptime() + ' seconds');
});

app.use(loginGov.router);

/* Start the server. */
app.listen(8080);

/* Export needed for testing. */
module.exports = app;
