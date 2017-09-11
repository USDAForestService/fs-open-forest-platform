'use strict';

let express = require('express');
let passport = require('passport');
let SamlStrategy = require('passport-saml').Strategy;
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
    (profile, done) => {
      console.log('---------- profile:', profile);
      return done(null, { email: profile.nameID, role: 'admin' });
    }
  )
);

eAuth.router = express.Router();

eAuth.router.get(eAuth.loginPath, passport.authenticate('saml'));

eAuth.router.post(
  eAuth.callbackPath,
  passport.authenticate('saml', { successRedirect: vcapServices.intakeClientBaseUrl + '/admin/applications' })
);

module.exports = eAuth;
