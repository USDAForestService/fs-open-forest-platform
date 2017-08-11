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

let app = express();

/* Use helmet for increased security. */
app.use(helmet());

/* Download login.gov cert. */
if (process.env.PLATFORM !== 'CircleCI') {
  util.prepareCerts();
}

/* Parse request bodies as JSON. */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Setup passport. */
if (process.env.PLATFORM !== 'CircleCI') {
  loginGov.setup();
  app.use(passport.initialize());
  app.use(passport.session());
}

app.options('*', function(req, res) {
  res.set('Access-Control-Allow-Origin', vcapServices.intakeClientBaseUrl);
  res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Headers', 'accept, content-type');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
  res.send();
});

/* Basic HTTP authentication middleware. */
let authenticator = function(req, res, next) {
  res.set('Access-Control-Allow-Origin', vcapServices.intakeClientBaseUrl);
  res.set('Access-Control-Allow-Credentials', true);
  let user = auth(req);
  /* Selenium can't handle basic auth, so turn it off when we're testing on CircleCI. */
  if (process.env.PLATFORM === 'CircleCI') {
    next();
    return;
  }
  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
  } else if (user.name === vcapServices.intakeUsername && user.pass === vcapServices.intakePassword) {
    next();
  } else {
    res.sendStatus(401);
  }
};

/* Serve static documentation pages. */
app.use('/docs/api', express.static('docs/api'));

/** Get a single noncommercial permit application. */
app.get('/permits/applications/special-uses/noncommercial/:id', authenticator, noncommercial.getOne);
/** Create a new noncommercial permit application. */
app.post('/permits/applications/special-uses/noncommercial', authenticator, noncommercial.create);
/** Update a noncommercial permit application. */
app.put('/permits/applications/special-uses/noncommercial/:id', authenticator, noncommercial.update);

/** Get a temp outfitter permit application. */
app.get('/permits/applications/special-uses/temp-outfitter/:id', authenticator, tempOutfitter.getOne);
/** Create a new temp outfitter permit application. */
app.post('/permits/applications/special-uses/temp-outfitter', authenticator, tempOutfitter.create);
/** Update a temp outfitter permit application. */
app.put('/permits/applications/special-uses/temp-outfitter/:id', authenticator, tempOutfitter.update);
/** Handle temp outfitter file upload and invokes streamToS3 function. */
app.post(
  '/permits/applications/special-uses/temp-outfitter/file',
  authenticator,
  tempOutfitter.streamToS3.array('file', 1),
  tempOutfitter.attachFile
);

/** Get all applications with status on Received or Hold. */
app.get('/permits/applications', authenticator, util.getAllOpenApplications);

/** Get the number of seconds that this instance has been running. */
app.get('/uptime', function(req, res) {
  res.send('Uptime: ' + process.uptime() + ' seconds');
});

app.use(loginGov.router);

/* Start the server. */
app.listen(8080);

/* Export needed for testing. */
module.exports = app;
