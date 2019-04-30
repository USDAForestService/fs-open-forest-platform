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
router.get('/logout', middleware.checkPermissions, passportConfig.logout);

/* Public user authentication */
router.get('/public/login', passport.authenticate('public'));
router.get('/public/callback', passport.authenticate('public', {
  failureRedirect: INTAKE_CLIENT_BASE_URL,
  successRedirect: `${INTAKE_CLIENT_BASE_URL}/logged-in`
}));
router.post('/public/callback', passport.authenticate('public', {
  failureRedirect: INTAKE_CLIENT_BASE_URL,
  successRedirect: `${INTAKE_CLIENT_BASE_URL}/logged-in`
}));

/* Admin user authentication */
router.get('/admin/login', passport.authenticate('admin'));
router.post('/admin/callback', passport.authenticate('admin', {
  failureRedirect: INTAKE_CLIENT_BASE_URL,
  successRedirect: `${INTAKE_CLIENT_BASE_URL}/logged-in`
}));

// TODO - remove
router.get('/login-gov/openid/login', (_req, res) => { res.redirect('/auth/public/login'); });
router.get('/login-gov/openid/callback', (_req, res) => { res.redirect('/auth/public/callback'); });
router.get('/usda-eauth/saml/login', (_req, res) => { res.redirect('/auth/admin/login'); });
router.post('/usda-eauth/saml/callback', (_req, res) => { res.redirect('/auth/admin/callback'); });

module.exports = router;
