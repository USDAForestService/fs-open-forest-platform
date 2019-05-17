/**
 * Module for authentication routes
 * @module routers/auth
 */

const express = require('express');
const passport = require('passport');
const passportConfig = require('../auth/passport-config.es6');
const { INTAKE_CLIENT_BASE_URL } = require('../vcap-constants.es6');
const middleware = require('../services/middleware.es6');

const router = express.Router();

/* GET the universal passport user. */
router.get('/user', middleware.checkPermissions, passportConfig.getPassportUser);

/* Universal passport logout. */
router.get('/logout', passportConfig.logout);

/* Public user authentication */
router.get('/public/login', passport.authenticate('public'));
router.get('/public/callback',
  passport.authenticate('public', { failureRedirect: INTAKE_CLIENT_BASE_URL }),
  (_req, res) => res.send(`<script>window.location = '${INTAKE_CLIENT_BASE_URL}/logged-in'</script>`));

router.post('/public/callback',
  passport.authenticate('public', { failureRedirect: INTAKE_CLIENT_BASE_URL }),
  (_req, res) => res.send(`<script>window.location = '${INTAKE_CLIENT_BASE_URL}/logged-in'</script>`));

/* Admin user authentication */
router.get('/admin/login', passport.authenticate('admin'));
router.post('/admin/callback',
  passport.authenticate('admin', { failureRedirect: INTAKE_CLIENT_BASE_URL }),
  (_req, res) => res.send(`<script>window.location = '${INTAKE_CLIENT_BASE_URL}/logged-in'</script>`));

// TODO - eventually remove
router.get('/login-gov/openid/callback', (_req, res) => {
  res.redirect('/auth/public/callback');
});
router.get('/login-gov/openid/logout', (_req, res) => {
  res.redirect('/auth/logout');
});
router.post('/usda-eauth/saml/callback',
  passport.authenticate('admin', { failureRedirect: INTAKE_CLIENT_BASE_URL }),
  (_req, res) => res.send(`<script>window.location = '${INTAKE_CLIENT_BASE_URL}/logged-in'</script>`));

module.exports = router;
