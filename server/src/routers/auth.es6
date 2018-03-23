'use strict';

/**
 * Module for authentication routes
 * @module routers/auth
 */

const express = require('express');
const passportConfig = require('../auth/passport-config.es6');

const router = express.Router();

/* GET the universal passport user. */
router.get('/user', passportConfig.getPassportUser);

/* Universal passport logout. */
router.get('/logout', passportConfig.logout);

module.exports = router;
