let passport = require('passport');
let SamlStrategy = require('passport-saml').Strategy;

let router = require('express').Router();

let loginGov = {};
loginGov.router = router;

passport.use(
  new SamlStrategy(
    {
      path: '/login/callback',
      entryPoint: 'https://app.agency.gov/users/auth/saml/login',
      issuer: 'passport-saml'
    },
    function(profile, done) {
      console.log(profile, done);
    }
  )
);

router.get('/login',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    console.log('in the login auth handler');
  }
);

router.post('/callback',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    console.log('in the login response handler');
  }
);

router.get('/logout',
  function(req, res) {
    console.log('in the logout handler');
  }
);

module.exports = loginGov;
