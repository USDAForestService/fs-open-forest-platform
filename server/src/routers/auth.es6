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

const SCRIPT_REDIRECT = (_req, res) => res.send(`<script>window.location = '${INTAKE_CLIENT_BASE_URL}/logged-in'</script>`);
const publicPassport = passport.authenticate('public', { failureRedirect: INTAKE_CLIENT_BASE_URL });
const adminPassport = passport.authenticate('admin', { failureRedirect: INTAKE_CLIENT_BASE_URL });

/* GET the universal passport user. */
router.get('/user', middleware.checkPermissions, passportConfig.getPassportUser);

/* Universal passport logout. */
router.get('/logout', passportConfig.logout);

/* Public user authentication */
router.get('/public/login', passport.authenticate('public'));
router.get('/public/callback', publicPassport, SCRIPT_REDIRECT);
router.post('/public/callback', publicPassport, SCRIPT_REDIRECT);
// TODO - eventually remove
router.get('/login-gov/openid/callback', publicPassport, SCRIPT_REDIRECT);
router.post('/login-gov/openid/callback', publicPassport, SCRIPT_REDIRECT);
router.get('/login-gov/openid/logout', (_req, res) => res.redirect('/auth/logout'));

/* Admin user authentication */
router.get('/admin/login', passport.authenticate('admin'));
router.post('/admin/callback', adminPassport, SCRIPT_REDIRECT);
// TODO - eventually remove
router.post('/usda-eauth/saml/callback', adminPassport, SCRIPT_REDIRECT);

module.exports = router;
