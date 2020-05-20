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
require('body-parser-xml')(bodyParser);

const passportConfig = require('./auth/passport-config.es6');
const router = require('./routers/router.es6');
const payGovMocks = require('./mocks/pay-gov-mocks.es6');
const swaggerDocument = require('./docs/swagger.json');
const logger = require('./services/logger.es6');
const expressLogger = require('./services/expresslogger.es6');
const vcapConstants = require('./vcap-constants.es6');

logger.info('\n\n\nOpen Forest Platform Server starting up with features:\n', {
  message: `${JSON.stringify(vcapConstants.FEATURES, null, ' ')}\n\n`
});

if (vcapConstants.FEATURES.NEW_RELIC) {
  logger.info(`Activating New Relic: ${vcapConstants.NEW_RELIC_APP_NAME}`);
  require('newrelic'); // eslint-disable-line global-require
} else {
  logger.warn('Skipping New Relic Activation');
}

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
    maxAge: 3600000, // 1 hour
    cookie: {
      secure: true,
      httpOnly: true,
      domain
    }
  })
);

// eslint-disable-next-line prefer-arrow-callback
app.get('*', function refresh(req, res, next) {
  // To update the session expiration time we need to send the new
  // expiration in the response cookie.
  // To send again the response cookie to the client we need to
  // update the session object.
  req.session.fake = Date.now();
  next();
});

/** set meridiem format to AM and PM */
moment.updateLocale('en', {
  meridiem(hour) {
    return hour < 12 ? 'AM' : 'PM';
  }
});

/** Configure passport for login.gov and eAuth. */
passportConfig.setup(app);

/** Pay.gov mock route */
if (vcapConstants.FEATURES.MOCK_PAY_GOV) {
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
