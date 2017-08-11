let passport = require('passport');
let SamlStrategy = require('passport-saml').Strategy;
let vcapServices = require('../vcap-services.es6');

let router = require('express').Router();

let loginGov = {};

loginGov.setup = () => {
  passport.use(
    new SamlStrategy(
      {
        authnContext: 'http://idmanagement.gov/ns/assurance/loa/1',
        cert: vcapServices.loginGovCert,
        entryPoint: vcapServices.loginGovEntryPoint,
        issuer: vcapServices.loginGovIssuer,
        path: '/auth/login-gov/saml/callback',
        privateKey: './login-gov-key',
        signatureAlgorithm: 'sha256'
      },
      function(profile, done) {
        console.log('new saml strategy callback', profile, done);
      }
    )
  );
};

loginGov.router = router;

router.get('/auth/login-gov/saml/login', passport.authenticate('saml'));

router.get('/auth/login-gov/saml/callback', passport.authenticate('saml'), (req, res) => {
  console.log('in the GET callback response handler', req.body);
  res.redirect('/test');
});

router.post('/auth/login-gov/saml/callback', passport.authenticate('saml'), (req, res) => {
  console.log('in the POST callback response handler', req.body);
  res.redirect('/test');
});

router.get('/test', (req, res) => {
  res.send(':-)');
});

router.get('/auth/login-gov/saml/logout', (req, res) => {
  console.log('in the logout handler', req.body);
  req.logout();
  res.redirect('/');
});

module.exports = loginGov;
