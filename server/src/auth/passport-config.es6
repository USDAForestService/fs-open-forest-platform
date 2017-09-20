'use strict';

const passport = require('passport');

const eAuth = require('./usda-eauth.es6');
const loginGov = require('./login-gov.es6');
const util = require('../util.es6');
const vcapConstants = require('../vcap-constants.es6');

const passportConfig = {};

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

passportConfig.getPassportUser = (req, res) => {
  if (util.isLocalOrCI()) {
    res.send({
      email: 'usersomuchs@tonight.com',
      role: 'user'
    });
  }
  res.send(req.user);
};

passportConfig.logout = (req, res) => {
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
};

module.exports = passportConfig;
