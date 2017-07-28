let passport = require('passport');
let SamlStrategy = require('passport-saml').Strategy;

let loginGov = {};

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

module.exports = loginGov;
