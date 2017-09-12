'use strict';

let bodyParser = require('body-parser');
let eAuth = require('./auth/usda-eauth.es6');
let express = require('express');
let helmet = require('helmet');
let loginGov = require('./auth/login-gov.es6');
let noncommercial = require('./noncommercial.es6');
let tempOutfitter = require('./temp-outfitter.es6');
let util = require('./util.es6');
let vcapServices = require('./vcap-services.es6');
var session = require('cookie-session');

let app = express();

/* Use helmet for increased security. */
app.use(helmet());

/* Body parsers */
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

/* Session handler */
app.use(
  session({
    name: 'session',
    keys: [
      new Buffer(`${Math.random()}${Math.random()}`).toString('base64'),
      new Buffer(`${Math.random()}${Math.random()}`).toString('base64')
    ],
    cookie: {
      secure: true,
      httpOnly: true,
      domain: vcapServices.baseUrl,
      expires: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
    }
  })
);

let isLocalOrCI = () => {
  const environments = ['CI', 'local'];
  if (environments.indexOf(process.env.PLATFORM) !== -1) {
    return true;
  }
  return false;
};

let setCorsHeaders = (req, res, next) => {
  if (process.env.PLATFORM === 'CI') {
    res.set('Access-Control-Allow-Origin', 'http://localhost:49152');
    res.set('Access-Control-Allow-Credentials', true);
  } else if (process.env.PLATFORM === 'local') {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.set('Access-Control-Allow-Credentials', true);
  } else {
    res.set('Access-Control-Allow-Origin', vcapServices.intakeClientBaseUrl);
    res.set('Access-Control-Allow-Credentials', true);
  }
  next();
};

let checkPermissions = (req, res, next) => {
  if (isLocalOrCI()) {
    next();
  } else {
    if (!req.user) {
      res.status(401).send({
        errors: ['Unauthorized']
      });
    } else {
      next();
    }
  }
};

const adminWhitelist = ['esorenson1@flexion.us', 'salt@flexion.us'];

let checkAdminPermissions = (req, res, next) => {
  if (isLocalOrCI()) {
    next();
  } else {
    if (req.user.role !== 'admin' || !adminWhitelist.includes(req.user.email)) {
      res.status(403).send({ errors: ['Forbidden'] });
    } else {
      next();
    }
  }
};

app.options('*', setCorsHeaders, (req, res) => {
  res.set('Access-Control-Allow-Headers', 'accept, content-type');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
  res.send();
});

/* Setup passport */
let passport = loginGov.setup();
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

/* Universal passport user */
app.get('/auth/user', setCorsHeaders, checkPermissions, (req, res) => {
  if (isLocalOrCI()) {
    res.send({
      email: 'local@test.com',
      role: 'admin'
    });
  }
  res.send(req.user);
});

/* Universal passport logout */
app.get('/auth/logout', setCorsHeaders, checkPermissions, (req, res) => {
  if (req.user.role === 'user') {
    let token = req.user.token;
    req.logout();
    res.redirect(
      `${loginGov.issuer.end_session_endpoint}?post_logout_redirect_uri=${encodeURIComponent(
        vcapServices.intakeClientBaseUrl
      )}&state=${loginGov.params.state}&id_token_hint=${token}`
    );
  } else {
    req.logout();
    res.redirect(vcapServices.intakeClientBaseUrl);
  }
});

/** Get a single noncommercial permit application. */
app.get('/permits/applications/special-uses/noncommercial/:id', setCorsHeaders, checkPermissions, noncommercial.getOne);
/** Create a new noncommercial permit application. */
app.post('/permits/applications/special-uses/noncommercial', setCorsHeaders, checkPermissions, noncommercial.create);
/** Update a noncommercial permit application. */
app.put('/permits/applications/special-uses/noncommercial/:id', setCorsHeaders, checkPermissions, noncommercial.update);

/** Get a temp outfitter permit application. */
app.get(
  '/permits/applications/special-uses/temp-outfitter/:id',
  setCorsHeaders,
  checkPermissions,
  tempOutfitter.getOne
);
/** Get temp outfitter files by application id. */
app.get(
  '/permits/applications/special-uses/temp-outfitter/:id/files',
  setCorsHeaders,
  checkPermissions,
  tempOutfitter.getApplicationFileNames
);
/** Get a temp outfitter file. */
app.get(
  '/permits/applications/special-uses/temp-outfitter/:id/files/:file',
  setCorsHeaders,
  checkPermissions,
  tempOutfitter.streamFile
);
/** Create a new temp outfitter permit application. */
app.post('/permits/applications/special-uses/temp-outfitter', setCorsHeaders, checkPermissions, tempOutfitter.create);
/** Update a temp outfitter permit application. */
app.put(
  '/permits/applications/special-uses/temp-outfitter/:id',
  setCorsHeaders,
  checkPermissions,
  tempOutfitter.update
);
/** Handle temp outfitter file upload and invokes streamToS3 function. */
app.post(
  '/permits/applications/special-uses/temp-outfitter/file',
  setCorsHeaders,
  checkPermissions,
  tempOutfitter.streamToS3.array('file', 1),
  tempOutfitter.attachFile
);

/** Get all applications with status on Received or Hold. */
app.get('/permits/applications', setCorsHeaders, checkPermissions, checkAdminPermissions, util.getAllOpenApplications);

/** Get the number of seconds that this instance has been running. */
app.get('/uptime', (req, res) => {
  res.send('Uptime: ' + process.uptime() + ' seconds');
});

/* Serve static documentation pages. */
app.use('/docs/api', express.static('docs/api'));

app.use(loginGov.router);
app.use(eAuth.router);

/* Start the server. */
app.listen(8080);

/* Export needed for testing. */
module.exports = app;
