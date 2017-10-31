'use strict';

const express = require('express');
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const vcapConstants = require('../vcap-constants.es6');

const eAuth = {};

eAuth.loginPath = '/auth/usda-eauth/saml/login';
eAuth.callbackPath = '/auth/usda-eauth/saml/callback';

passport.use(
  new SamlStrategy(
    {
      path: vcapConstants.baseUrl + eAuth.callbackPath,
      entryPoint: `${vcapConstants.eAuthEntryPoint}?SPID=${vcapConstants.eAuthIssuer}`,
      issuer: vcapConstants.eAuthIssuer,
      privateCert: vcapConstants.eAuthPrivateKey,
      cert: vcapConstants.eAuthCert
    },
    (profile, done) => {
      return done(null, {
        email: profile.usdaemail,
        role: 'admin'
      });
    }
  )
);

// router for eAuth specific endpoints
eAuth.router = express.Router();

eAuth.router.get(eAuth.loginPath, (req, res) => {
  res.redirect(`${vcapConstants.eAuthEntryPoint}?SPID=${vcapConstants.eAuthIssuer}`);
});

eAuth.router.post(eAuth.callbackPath, passport.authenticate('saml'), (req, res) => {
  res.redirect(`${vcapConstants.intakeClientBaseUrl}/logged-in`);
});

module.exports = eAuth;
