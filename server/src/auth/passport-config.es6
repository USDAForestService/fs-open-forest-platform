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

const mockAdminAuth = true;
const mockPublicAuth = true;

const passportConfig = {};

/**
 * @function setup - Setup passport to integrate with login.gov and eAuth
 * @param {Object} application
 */
passportConfig.setup = (app) => {
  // Configure Admin Authentication
  passport.use('admin', mockAdminAuth ? localAdmin('/mocks/auth/login?role=admin') : eAuth.strategy());

  // Configure Public Authentication
  if (mockPublicAuth) {
    passport.use('public', localPublic('/mocks/auth/login?role=public'));
    // app.use(loginGovMocks.router);
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
    res.send(`<script>window.location = '${vcapConstants.INTAKE_CLIENT_BASE_URL}/500'</script>`);
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
  let backURL = '';
  if (req.header) {
    logger.info(req.header('Referer'));
    if (req.header('Referer').indexOf('mbs') > -1 || req.header('Referer').indexOf('admin/applications') > -1) {
      backURL = 'mbs';
    }
  }

  // login.gov requires the user to visit the idp to logout
  if (req.user && req.user.role === 'user' && loginGov.issuer) {
    logger.info(`AUTHENTICATION: ${req.user.email} logged out via Login.gov.`);
    return loginGov.logout(req, res);
  }
  logger.info(`AUTHENTICATION: ${req.user.email} logged out via eAuth.`);
  req.logout();
  return res.redirect(`${vcapConstants.INTAKE_CLIENT_BASE_URL}/${backURL}`);
};

module.exports = passportConfig;
