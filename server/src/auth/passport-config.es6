/**
 * Module for passport configuration
 * @module auth/passport-config
 */

const passport = require('passport');
const logger = require('../services/logger.es6');
const vcapConstants = require('../vcap-constants.es6');
const eAuth = require('./usda-eauth.es6');
const loginGov = require('./login-gov.es6');
const localAdmin = require('./local-admin.es6');
const localPublic = require('./local-public.es6');
const authMock = require('../mocks/auth-mocks.es6');

const {
  INTAKE_CLIENT_BASE_URL,
  FEATURES: {
    MOCK_ADMIN_AUTH, MOCK_PUBLIC_AUTH
  }
} = vcapConstants;

const passportConfig = {};

/**
 * @function setup - Setup passport to integrate with login.gov and eAuth
 * @param {Object} application
 */
passportConfig.setup = (app) => {
  // Configure Admin Authentication
  passport.use('admin', MOCK_ADMIN_AUTH ? localAdmin('/mocks/auth/login?role=admin') : eAuth.strategy());

  // Configure Public Authentication
  if (MOCK_PUBLIC_AUTH) {
    passport.use('public', localPublic('/mocks/auth/login?role=public'));
  } else {
    loginGov.setup('public', passport);
  }

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(passportConfig.authErrorHandler);

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  if (MOCK_PUBLIC_AUTH || MOCK_ADMIN_AUTH) {
    app.use(authMock.router);
  }
};

/**
 * @function authErrorHandler - Throw error if authentication failure and redirect to frontend 500 page.
 * @param {Object} err - http error
 * @param {Object} req - http request
 * @param {Object} res - http response
 * @param {Object} next - next function
 */
passportConfig.authErrorHandler = (err, req, res, next) => {
  if (err) {
    logger.warn('ERROR: ServerError: AUTHENTICATION-', err);
    res.send(`<script>window.location = '${INTAKE_CLIENT_BASE_URL}/500'</script>`);
  } else {
    next();
  }
};

/**
 * @function getPassportUser - Get the authenication user.
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
passportConfig.getPassportUser = (req, res) => res.send(req.user);

/**
 * @function logout - Log out of eAuth or login.gov.
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
passportConfig.logout = (req, res) => {
  // setting reroute based on referrer
  let backURL = 'mbs';
  if (req.header) {
    const referer = req.header('Referer');
    if (referer.indexOf('christmas') > -1) {
      backURL = '';
    }
  }

  const { user } = req;
  if (user) {
    req.logout();
    req.session = null;
    // login.gov requires the user to visit the idp to logout
    if (user.role === 'user' && !MOCK_PUBLIC_AUTH) {
      logger.info(`AUTHENTICATION: ${user.email} logging out via Login.gov.`);
      return res.redirect(loginGov.logoutUrl(user.token));
    }
  }

  return res.redirect(`${INTAKE_CLIENT_BASE_URL}/${backURL}`);
};

module.exports = passportConfig;
