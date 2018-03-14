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
 * Setup passport to integrate with login.gov and eAuth/
 */
passportConfig.setup = app => {
  loginGov.setup();
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(loginGov.router);
  app.use(eAuth.router);
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

/**
 * Get the authetication user.
 */
passportConfig.getPassportUser = (req, res) => {
  return res.send(util.getUser(req));
};

/**
 * Log out of eAuth or login.gov.
 */
passportConfig.logout = (req, res) => {
  // login.gov requires the user to visit the idp to logout
  if (req.user && req.user.role === 'user' && loginGov.issuer) {
    return res.redirect(
      `${loginGov.issuer.end_session_endpoint}?post_logout_redirect_uri=${encodeURIComponent(
        vcapConstants.baseUrl + '/auth/login-gov/openid/logout'
      )}&state=${loginGov.params.state}&id_token_hint=${req.user.token}`
    );
  } else {
    req.logout();
    return res.redirect(vcapConstants.intakeClientBaseUrl);
  }
};

/**
 * Passport configuration
 * @exports auth/passportConfig
 */
module.exports = passportConfig;
