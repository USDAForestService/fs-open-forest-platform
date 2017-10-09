'use strict';

const express = require('express');
const middleware = require('../middleware.es6');
const authRouter = require('./auth.es6');
const applicationsRouter = require('./applications.es6');

const router = express.Router();

/* allow any server to check the preflights */
router.options('*', middleware.setCorsHeaders, (req, res) => {
  res.set('Access-Control-Allow-Headers', 'accept, content-type');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
  res.send();
});

router.use('/auth', middleware.setCorsHeaders, middleware.checkPermissions, authRouter);
router.use('/permits/applications', middleware.setCorsHeaders, middleware.checkPermissions, applicationsRouter);

/* get the number of seconds that this instance has been running */
router.get('/uptime', (req, res) => {
  res.send('Uptime: ' + process.uptime() + ' seconds');
});

/* serve static documentation pages */
router.use('/docs/api', express.static('docs/api'));

module.exports = router;
