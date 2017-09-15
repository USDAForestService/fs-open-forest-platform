'use strict';

let bodyParser = require('body-parser');
let eAuth = require('./auth/usda-eauth.es6');
let express = require('express');
let helmet = require('helmet');
let loginGov = require('./auth/login-gov.es6');
let noncommercial = require('./noncommercial.es6');
let tempOutfitter = require('./temp-outfitter.es6');
let util = require('./util.es6');
let vcapConstants = require('./vcap-constants.es6');
var session = require('cookie-session');

let app = express();

/* use helmet for increased security */
app.use(helmet());

/* body parsers, necessary for restful JSON and passport */
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

/* session handler */
app.use(
  session({
    name: 'session',
    keys: [
      new Buffer(`${Math.random()}${Math.random()}`).toString('hex'),
      new Buffer(`${Math.random()}${Math.random()}`).toString('hex')
    ],
    cookie: {
      secure: true,
      httpOnly: true,
      domain: vcapConstants.baseUrl,
      expires: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
    }
  })
);

// used to bypass authentication when doing development
let isLocalOrCI = () => {
  const environments = ['CI', 'local'];
  if (environments.indexOf(process.env.PLATFORM) !== -1) {
    return true;
  }
  return false;
};

let setCorsHeaders = (req, res, next) => {
  // don't cache the API calls
  res.set('Cache-Control', 'no-cache');
  if (process.env.PLATFORM === 'CI') {
    res.set('Access-Control-Allow-Origin', 'http://localhost:49152');
    res.set('Access-Control-Allow-Credentials', true);
  } else if (process.env.PLATFORM === 'local') {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.set('Access-Control-Allow-Credentials', true);
  } else {
    res.set('Access-Control-Allow-Origin', vcapConstants.intakeClientBaseUrl);
    res.set('Access-Control-Allow-Credentials', true);
  }
  next();
};

// middleware for checking a valid user
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

// middleware for checking a valid admin user
let checkAdminPermissions = (req, res, next) => {
  if (isLocalOrCI()) {
    next();
  } else {
    if (req.user.role !== 'admin' || !vcapConstants.eAuthUserWhiteList.includes(req.user.email)) {
      res.status(403).send({
        errors: ['Forbidden']
      });
    } else {
      next();
    }
  }
};

// allow anyone to check the preflights
app.options('*', setCorsHeaders, (req, res) => {
  res.set('Access-Control-Allow-Headers', 'accept, content-type');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
  res.send();
});

/* setup passport */
let passport = loginGov.setup();
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

/* return universal passport user */
app.get('/auth/user', setCorsHeaders, checkPermissions, (req, res) => {
  if (isLocalOrCI()) {
    res.send({
      email: 'local@test.com',
      role: 'admin'
    });
  }
  res.send(req.user);
});

/* universal passport logout */
app.get('/auth/logout', setCorsHeaders, checkPermissions, (req, res) => {
  // login.gov requires the user to visit the idp to logout
  if (req.user.role === 'user') {
    res.redirect(
      `${loginGov.issuer.end_session_endpoint}?post_logout_redirect_uri=${encodeURIComponent(
        vcapConstants.baseUrl + '/auth/login-gov/openid/logout'
      )}&state=${loginGov.params.state}&id_token_hint=${req.user.token}`
    );
  } else {
    req.logout();
    res.redirect(vcapConstants.intakeClientBaseUrl);
  }
});

/** get a single noncommercial permit application */
app.get('/permits/applications/special-uses/noncommercial/:id', setCorsHeaders, checkPermissions, noncommercial.getOne);
/** create a new noncommercial permit application */
app.post('/permits/applications/special-uses/noncommercial', setCorsHeaders, checkPermissions, noncommercial.create);
/** update a noncommercial permit application */
app.put('/permits/applications/special-uses/noncommercial/:id', setCorsHeaders, checkPermissions, noncommercial.update);

/** get a temp outfitter permit application */
app.get(
  '/permits/applications/special-uses/temp-outfitter/:id',
  setCorsHeaders,
  checkPermissions,
  tempOutfitter.getOne
);
/** get temp outfitter files by application id */
app.get(
  '/permits/applications/special-uses/temp-outfitter/:id/files',
  setCorsHeaders,
  checkPermissions,
  tempOutfitter.getApplicationFileNames
);
/** get a temp outfitter file */
app.get(
  '/permits/applications/special-uses/temp-outfitter/:id/files/:file',
  setCorsHeaders,
  checkPermissions,
  tempOutfitter.streamFile
);
/** create a new temp outfitter permit application */
app.post('/permits/applications/special-uses/temp-outfitter', setCorsHeaders, checkPermissions, tempOutfitter.create);
/** update a temp outfitter permit application */
app.put(
  '/permits/applications/special-uses/temp-outfitter/:id',
  setCorsHeaders,
  checkPermissions,
  tempOutfitter.update
);
/** handle temp outfitter file upload and invokes streamToS3 function */
app.post(
  '/permits/applications/special-uses/temp-outfitter/file',
  setCorsHeaders,
  checkPermissions,
  tempOutfitter.streamToS3.array('file', 1),
  tempOutfitter.attachFile
);

/** get all applications with status on Received or Hold */
app.get('/permits/applications', setCorsHeaders, checkPermissions, checkAdminPermissions, util.getAllOpenApplications);

/** get the number of seconds that this instance has been running */
app.get('/uptime', (req, res) => {
  res.send('Uptime: ' + process.uptime() + ' seconds');
});

/* serve static documentation pages */
app.use('/docs/api', express.static('docs/api'));

app.use(loginGov.router);
app.use(eAuth.router);

/* start the server */
app.listen(8080);

/* export needed for testing */
module.exports = app;
