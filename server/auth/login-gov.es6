let passport = require('passport');
let vcapServices = require('../vcap-services.es6');
let Issuer = require('openid-client').Issuer;
let Strategy = require('openid-client').Strategy;
let jose = require('node-jose');

let router = require('express').Router();

let loginGov = {};

let basicAuthOptions = {
  headers: {
    'Content-Type': 'application/json',
    Host: 'idp.int.login.gov',
    Authorization:
      'Basic ' +
      new Buffer(vcapServices.loginGovIdpUsername + ':' + vcapServices.loginGovIdpPassword).toString('base64')
  }
};

loginGov.setup = cb => {
  console.log(
    '------------ in loginGov.setup ',
    vcapServices.loginGovIdpUsername,
    vcapServices.loginGovIdpPassword,
    vcapServices.loginGovJwk
  );
  Issuer.defaultHttpOptions = basicAuthOptions;
  Issuer.discover('https://idp.int.login.gov/.well-known/openid-configuration')
    .then(loginGovIssuer => {
      console.log('----- loginGovIssuer: ', loginGovIssuer);

      let keys = { keys: [vcapServices.loginGovJwk] };
      jose.JWK
        .asKeyStore(keys)
        .then(joseKeystore => {
          let client = new loginGovIssuer.Client(
            {
              client_id: vcapServices.loginGovIssuer,
              client_secret: 'TQV5U29k1gHibH5bx1layBo0OSAvAbRT3UYW3EWrSYBB5swxjVfWUa1BS8lqzxG/0v9wruMcrGadany3',
              token_endpoint_auth_method: 'private_key_jwt',
              id_token_signed_response_alg: 'RS256'
            },
            joseKeystore
          );

          let params = {
            acr_values: 'http://idmanagement.gov/ns/assurance/loa/1',
            nonce: '1234567890123456789012345678901234567890',
            prompt: 'select_account',
            redirect_uri: 'https://fs-intake-api-staging.app.cloud.gov/auth/login-gov/openid/callback',
            response_type: 'code',
            response_mode: 'form_post',
            scope: 'openid email',
            state: 'abcdefghijklmnopabcdefghijklmnopDEBUG'
          };

          passport.use(
            'oidc',
            new Strategy({ client, params }, (tokenset, userinfo, done) => {
              console.log('----- tokenset: ', tokenset);
              console.log('----- access_token: ', tokenset.access_token);
              console.log('----- id_token', tokenset.id_token);
              console.log('----- claims', tokenset.claims);
              console.log('----- userinfo: ', userinfo);
              console.log('----- done: ', done);
              return done(null, false);
            })
          );
          cb();
        })
        .catch(error => {
          console.log('----- key error: ', error);
          cb(error);
        });
    })
    .catch(error => {
      console.log('----- loginGovIssuer error: ', error);
      cb(error);
    });
};

loginGov.router = router;

router.get('/auth/login-gov/openid/login', passport.authenticate('oidc'));

router.get(
  '/auth/login-gov/openid/callback',
  (req, res, next) => {
    console.log('----- openid callback body :', req.body);
    next();
  },
  passport.authenticate('oidc', {
    successRedirect: '/successRedirect',
    failureRedirect: '/failureRedirect'
  }),
  (req, res) => {
    console.log('in the POST callback response handler', req.body);
    res.redirect('/test');
  }
);

router.get('/failureRedirect', (req, res) => {
  res.send(':-(');
});

router.get('/successRedirect', (req, res) => {
  res.send(':-)');
});

module.exports = loginGov;
