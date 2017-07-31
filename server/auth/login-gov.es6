let passport = require('passport');
let SamlStrategy = require('passport-saml').Strategy;
let vcapServices = require('./vcap-services.es6');

let router = require('express').Router();

let loginGov = {};
loginGov.router = router;

passport.use(
  new SamlStrategy(
    {
      path: '/auth/login-gov/saml/callback',
      cert: vcapServices.loginGovCert,
      entryPoint: vcapServices.loginGovEntryPoint,
      issuer: vcapServices.loginGovIssuer
    },
    function(profile, done) {
      console.log(profile, done);
    }
  )
);

router.get(
  '/auth/login-gov/saml/login',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    console.log('in the login auth handler');
  }
);

router.post(
  '/auth/login-gov/saml/callback',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    console.log('in the login response handler');
  }
);

router.get('/auth/login-gov/saml/logout', function(req, res) {
  console.log('in the logout handler');
});

module.exports = loginGov;
