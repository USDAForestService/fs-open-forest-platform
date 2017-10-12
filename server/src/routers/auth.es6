'use strict';

const express = require('express');
const passportConfig = require('../auth/passport-config.es6');

const router = express.Router();

/* return universal passport user */
router.get('/user', passportConfig.getPassportUser);

/* universal passport logout */
router.get('/logout', passportConfig.logout);

module.exports = router;
