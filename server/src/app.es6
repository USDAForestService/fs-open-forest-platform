/**
 * Module for FS Intake API Server
 * @module app
 */

const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const session = require('cookie-session');
const moment = require('moment');
const swaggerUi = require('swagger-ui-express');
const Keygrip = require('keygrip');

const passportConfig = require('./auth/passport-config.es6');
const router = require('./routers/router.es6');
require('body-parser-xml')(bodyParser);
const payGovMocks = require('./mocks/pay-gov-mocks.es6');
const swaggerDocument = require('./docs/swagger.json');

const logger = require('./services/logger.es6');
const expressLogger = require('./services/expresslogger.es6');
const util = require('./services/util.es6');
const vcapConstants = require('./vcap-constants.es6');

if (util.isProduction()) {
  logger.info(`Activating New Relic: ${vcapConstants.NEW_RELIC_APP_NAME}`);
  require('newrelic'); // eslint-disable-line global-require
} else {
  logger.warn('Skipping New Relic Activation');
}

vcapConstants.nodeEnv = process.env.NODE_ENV;

// Create the express application.
const app = express();

// Trust the cloud.gov X-Forwarded- headers
app.set('trust proxy', 1);

/** Use helmet for increased security. */
app.use(helmet());

/** Body parsers are necessary for restful JSON and passport. */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.xml());

/** Logging middleware */
if (logger.levels[logger.level] >= 2) {
  app.use(expressLogger.Logger);
}

app.use(expressLogger.Error);

/**  Cookies for session management. */
const domain = vcapConstants.BASE_URL.replace(/https?:\/\//i, '');
app.use(
  session({
    name: 'session',
    keys: new Keygrip([vcapConstants.PERMIT_SECRET], 'sha256', 'base64'),
    cookie: {
      secure: true,
      httpOnly: true,
      domain,
      expires: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
    }
  })
);

/** set meridiem format to a.m. and p.m. */
moment.updateLocale('en', {
  meridiem(hour) {
    return hour < 12 ? 'a.m.' : 'p.m.';
  }
});
/** Configure passport for login.gov and eAuth. */
passportConfig.setup(app);

/** Pay.gov mock route */
if (!util.isProduction()) {
  app.use(payGovMocks.router);
}

/** serve up docs api */
app.use('/docs/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/** Serve static code documentation pages. */
app.use('/docs/code', express.static('docs/code'));

/** GET the number of seconds that this instance has been running. */
app.get('/uptime', (_req, res) => {
  res.send(`Uptime: ${process.uptime()} seconds`);
});

/** Add the routes. */
app.use(router);

/** Listen on port. */
app.listen(process.env.PORT || 8080, () => {
  logger.info('Express server initiated');
});

module.exports = app;
