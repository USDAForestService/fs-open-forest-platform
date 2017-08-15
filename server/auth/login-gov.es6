let passport = require('passport');
let SamlStrategy = require('passport-saml').Strategy;
let vcapServices = require('../vcap-services.es6');

let router = require('express').Router();

let loginGov = {};

loginGov.setup = () => {
  passport.use(
    new SamlStrategy(
      {
        cert: vcapServices.loginGovCert,
        entryPoint: vcapServices.loginGovEntryPoint,
        issuer: vcapServices.loginGovIssuer,
        path: '/auth/login-gov/saml/callback',
        privateKey: './login-gov-key',
        signatureAlgorithm: 'sha256'
      },
      function(profile, done) {}
    )
  );
};

loginGov.router = router;

router.get('/login', passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }), (req, res) => {
  passport.authenticate('saml', {
    successRedirect: '/',
    failureRedirect: '/login'
  });
});

router.post('/callback', passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }), (req, res) => {
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = loginGov;
