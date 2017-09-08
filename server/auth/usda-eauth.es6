'use strict';

let express = require('express');
let SamlStrategy = require('passport-saml').Strategy;
let passport = require('passport');
let vcapServices = require('../vcap-services.es6');

let eAuth = {};

eAuth.loginPath = '/auth/usda-eauth/saml/login';
eAuth.callbackPath = '/auth/usda-eauth/saml/callback';

passport.use(
  new SamlStrategy(
    {
      path: vcapServices.baseUrl + eAuth.callbackPath,
      entryPoint: `${vcapServices.eAuthEntryPoint}?SPID=${vcapServices.eAuthIssuer}`,
      issuer: vcapServices.eAuthIssuer,
      privateCert: vcapServices.eAuthPrivateKey,
      cert: vcapServices.eAuthCert
    },
    function(profile, done) {
      console.log('----------', profile);
      console.log('----------', done);
      return done(null, 'user');
    }
  )
);

eAuth.router = express.Router();

eAuth.router.get(eAuth.loginPath, passport.authenticate('saml'), (req, res) => {
  res.redirect('/');
});

eAuth.router.post(
  eAuth.callbackPath,
  passport.authenticate('saml', { successRedirect: vcapServices.intakeClientBaseUrl })
);

module.exports = eAuth;
