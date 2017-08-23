let passport = require('passport');
let vcapServices = require('../vcap-services.es6');
let Issuer = require('openid-client').Issuer;
let Strategy = require('openid-client').Strategy;

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

loginGov.setup = () => {
  console.log('------------ in loginGov.setup ', vcapServices.loginGovIdpUsername, vcapServices.loginGovIdpPassword);
  Issuer.defaultHttpOptions = basicAuthOptions;
  Issuer.discover('https://idp.int.login.gov/.well-known/openid-configuration')
    .then(loginGovIssuer => {
      console.log('----- loginGovIssuer: ', loginGovIssuer);

      let client = new loginGovIssuer.Client({
        client_id: vcapServices.loginGovIssuer,
        client_secret: 'thisisaveryspecialsecret'
      });

      let params = {
        redirect_uri: 'https://fs-intake-api-staging.app.cloud.gov/auth/login-gov/openid/callback',
        acr_values: 'http://idmanagement.gov/ns/assurance/loa/1',
        response_type: 'code',
        scope: 'openid email',
        prompt: 'select_account',
        nonce: '12345678901234567890123456789012'
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
    })
    .catch(error => {
      console.log('----- loginGovIssuer error: ', error);
    });
};

loginGov.router = router;

router.get(
  '/auth/login-gov/openid/login',
  passport.authenticate('oidc', {
    failureRedirect: '/failureRedirect'
  })
);

router.get(
  '/auth/login-gov/openid/callback',
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
  // console.log('/failureRedirect', req);
  res.send(':-(');
});

router.get('/successRedirect', (req, res) => {
  res.send(':-)');
});

module.exports = loginGov;
