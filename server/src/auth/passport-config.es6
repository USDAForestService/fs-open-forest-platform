'use strict';

/**
 * Module for passport configuration
 * @module auth/passport-config
 */

const passport = require('passport');

const eAuth = require('./usda-eauth.es6');
const loginGov = require('./login-gov.es6');
const util = require('../services/util.es6');
const vcapConstants = require('../vcap-constants.es6');

const passportConfig = {};

/**
 * @function setup - Setup passport to integrate with login.gov and eAuth/
 * @param {Object} application
 */
passportConfig.setup = app => {
  loginGov.setup();
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(loginGov.router);
  app.use(eAuth.router);
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
    console.error('Authentication error:', err);
    res.send(`<script>window.location = '${vcapConstants.INTAKE_CLIENT_BASE_URL}/500'</script>`);
  } else {
    next();
  }
};

/**
 * @function getPassportUser - Get the authetication user.
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
passportConfig.getPassportUser = (req, res) => {
  return res.send(util.getUser(req));
};

/**
 * @function logout - Log out of eAuth or login.gov.
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
passportConfig.logout = (req, res) => {
  // login.gov requires the user to visit the idp to logout
  if (req.user && req.user.role === 'user' && loginGov.issuer) {
    return res.redirect(
      `${loginGov.issuer.end_session_endpoint}?post_logout_redirect_uri=${encodeURIComponent(
        vcapConstants.BASE_URL + '/auth/login-gov/openid/logout'
      )}&state=${loginGov.params.state}&id_token_hint=${req.user.token}`
    );
  } else {
    req.logout();
    return res.redirect(vcapConstants.INTAKE_CLIENT_BASE_URL);
  }
};

module.exports = passportConfig;
