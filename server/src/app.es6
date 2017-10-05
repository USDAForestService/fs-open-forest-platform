'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');

const passportConfig = require('./auth/passport-config.es6');
const router = require('./routers/router.es6');
const vcapConstants = require('./vcap-constants.es6');
const util = require('./util.es6');

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

/* setup passport */
passportConfig.setup(app);

/* add routes */
app.use(router);

/* start the server */
app.listen(8080);

/* export needed for testing */
module.exports = app;
