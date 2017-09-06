let Issuer = require('openid-client').Issuer;
let jose = require('node-jose');
let passport = require('passport');
let Strategy = require('openid-client').Strategy;
let vcapServices = require('../vcap-services.es6');

let router = require('express').Router();

let loginGov = {};

let basicAuthOptions = {
  headers: {
    Host: 'idp.int.login.gov',
    Authorization:
      'Basic ' +
      new Buffer(vcapServices.loginGovIdpUsername + ':' + vcapServices.loginGovIdpPassword).toString('base64')
  }
};

const params = {
  acr_values: 'http://idmanagement.gov/ns/assurance/loa/1',
  nonce: `${Math.random()}-${Math.random()}`,
  prompt: 'select_account',
  // TODO: replace with VCAP_SERVICES
  redirect_uri: 'https://fs-intake-api-login-test.app.cloud.gov/auth/login-gov/openid/callback',
  response_type: 'code',
  scope: 'openid email',
  state: `${Math.random()}-${Math.random()}`
};

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  done(null, { email: email });
});

loginGov.setup = () => {
  Issuer.defaultHttpOptions = basicAuthOptions;
  Issuer.discover('https://idp.int.login.gov/.well-known/openid-configuration').then(loginGovIssuer => {
    // don't use the userinfo_endpoint, as the userinfo payload is returned with the token_id
    delete loginGovIssuer.userinfo_endpoint;
    let keys = { keys: [vcapServices.loginGovJwk] };
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
        new Strategy({ client, params }, (tokenset, done) => {
          return done(null, { email: tokenset.claims.email });
        })
      );
    });
  });
  return passport;
};

loginGov.router = router;

router.get('/auth/login-gov/openid/login', passport.authenticate('oidc'));

router.get(
  '/auth/login-gov/openid/callback',
  passport.authenticate('oidc', {
    successRedirect: vcapServices.intakeClientBaseUrl
  })
);

router.get('/auth/login-gov/openid/user', (req, res) => {
  console.log(req.user);
  if (!req.user) {
    res.send(401, 'Unauthorized');
  }
  res.send(req.user);
});

router.get('/auth/login-gov/openid/logout', (req, res) => {
  req.logout();
  res.redirect(vcapServices.intakeClientBaseUrl);
});

module.exports = loginGov;
