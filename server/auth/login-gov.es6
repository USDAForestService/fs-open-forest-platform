let fs = require('fs');
let passport = require('passport');
let SamlStrategy = require('passport-saml').Strategy;
let vcapServices = require('../vcap-services.es6');

let router = require('express').Router();

let loginGov = {};

loginGov.setup = () => {
  console.log('------------ in loginGov.setup');

  let samlStrategy = new SamlStrategy(
    {
      authnContext: 'http://idmanagement.gov/ns/assurance/loa/1',
      cert: vcapServices.loginGovCert,
      entryPoint: vcapServices.loginGovEntryPoint,
      issuer: vcapServices.loginGovIssuer,
      path: '/auth/login-gov/saml/callback',
      // privateKey: './login-gov-key',
      signatureAlgorithm: 'sha256'
    },
    function(profile, done) {
      console.log('new saml strategy callback', profile, done);
      return done(null, {});
    }
  );

  samlStrategy.generateServiceProviderMetadata(fs.readFileSync('./login-gov-key', 'utf-8'));

  passport.serializeUser(function(user, done) {
    console.log('------ passport.serializeUser', user);
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    console.log('------ passport.deserializeUser', user);
    done(null, user);
  });

  passport.use(samlStrategy);
};

loginGov.router = router;

router.get(
  '/auth/login-gov/saml/login',
  passport.authenticate('saml', {
    successRedirect: '/test?login-success',
    failureRedirect: '/test?login-fail'
  })
);

router.post(
  '/auth/login-gov/saml/callback',
  passport.authenticate('saml', {
    successRedirect: '/test?callback-success',
    failureRedirect: '/test?callback-fail',
    failureFlash: true
  }),
  (req, res) => {
    console.log('in the POST callback response handler', req.body);
    res.redirect('/test');
  }
);

router.get('/test', (req, res) => {
  res.send(':-)');
});

router.get('/auth/login-gov/saml/logout', (req, res) => {
  console.log('in the logout handler', req.body);
  req.logout();
  res.redirect('/');
});

module.exports = loginGov;
