'use strict';

/**
 * Module for FS Intake API Server
 * @module app
 */

const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const session = require('cookie-session');

const passportConfig = require('./auth/passport-config.es6');
const router = require('./routers/router.es6');
const util = require('./util.es6');
const vcapConstants = require('./vcap-constants.es6');
const payGov = require('./pay-gov-mocks/christmas-trees-payments.es6');
require('body-parser-xml')(bodyParser);

/**  Create the express application. */
const app = express();

/** Use helmet for increased security. */
app.use(helmet());

/** Body parsers are necessary for restful JSON and passport. */
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(bodyParser.xml());

/**  Cookies for session management. Passport needs cookies, otherwise we'd be using JWTs. */
app.use(
  session({
    name: 'session',
    keys: [util.getRandomString(32), util.getRandomString(32)],
    cookie: {
      secure: true,
      httpOnly: true,
      domain: vcapConstants.baseUrl,
      expires: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
    }
  })
);

/** Configure passport for login.gov and eAuth. */
passportConfig.setup(app);

/** Pay.gov mock route */
app.use(payGov.router);

/** Add the routes. */
app.use(router);

/** Listen on port 8080. */
app.listen(8080);

/**
 * FS Intake API Server
 * @exports app
 */
module.exports = app;
