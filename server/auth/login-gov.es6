'use strict';

let express = require('express');
let Issuer = require('openid-client').Issuer;
let jose = require('node-jose');
let passport = require('passport');
let OpenIDConnectStrategy = require('openid-client').Strategy;
let vcapServices = require('../vcap-services.es6');

let loginGov = {};

let basicAuthOptions = {
  headers: {
    Host: 'idp.int.login.gov',
    Authorization:
      'Basic ' +
      new Buffer(vcapServices.loginGovIdpUsername + ':' + vcapServices.loginGovIdpPassword).toString('base64')
  }
};

loginGov.params = {
  acr_values: 'http://idmanagement.gov/ns/assurance/loa/1',
  nonce: new Buffer(`${Math.random()}${Math.random()}`).toString('hex'),
  prompt: 'select_account',
  redirect_uri: vcapServices.baseUrl + '/auth/login-gov/openid/callback',
  response_type: 'code',
  scope: 'openid email',
  state: new Buffer(`${Math.random()}${Math.random()}`).toString('hex')
};

loginGov.setup = () => {
  Issuer.defaultHttpOptions = basicAuthOptions;
  Issuer.discover(vcapServices.loginGovDiscoveryUrl).then(loginGovIssuer => {
    loginGov.issuer = loginGovIssuer;
    let keys = {
      keys: [vcapServices.loginGovJwk]
    };
    jose.JWK.asKeyStore(keys).then(joseKeystore => {
      let client = new loginGovIssuer.Client(
        {
          client_id: vcapServices.loginGovIssuer,
          token_endpoint_auth_method: 'private_key_jwt',
          id_token_signed_response_alg: 'RS256'
        },
        joseKeystore
      );
      passport.use(
        'oidc',
        new OpenIDConnectStrategy(
          {
            client: client,
            params: loginGov.params
          },
          (tokenset, done) => {
            return done(null, {
              email: tokenset.claims.email,
              role: 'user',
              token: tokenset.id_token
            });
          }
        )
      );
    });
  });
  return passport;
};

loginGov.router = express.Router();

loginGov.router.get('/auth/login-gov/openid/login', passport.authenticate('oidc'));

loginGov.router.get('/auth/login-gov/openid/logout', (req, res) => {
  req.logout();
  res.send(`<script>window.location = '${vcapServices.intakeClientBaseUrl}'</script>`);
});

loginGov.router.get(
  '/auth/login-gov/openid/callback',
  passport.authenticate('oidc', { failureRedirect: vcapServices.intakeClientBaseUrl }),
  (req, res) => {
    // res.redirect doesn't pass the Blink's Content Security Policy directive
    res.send(`<script>window.location = '${vcapServices.intakeClientBaseUrl}/logged-in'</script>`);
  }
);

module.exports = loginGov;
