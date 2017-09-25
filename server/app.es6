'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const session = require('cookie-session');

const passportConfig = require('./auth/passport-config.es6');
const router = require('./router.es6');
const vcapConstants = require('./vcap-constants.es6');

const app = express();

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

/* setup passport */
passportConfig.setup(app);

/* add routes */
app.use(router);

/* start the server */
app.listen(8080);

/* export needed for testing */
module.exports = app;
