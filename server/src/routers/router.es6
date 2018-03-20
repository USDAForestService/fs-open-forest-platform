'use strict';

/**
 * Module for misc routes
 * @module routers/router
 */

const express = require('express');
const middleware = require('../services/middleware.es6');
const authRouter = require('./auth.es6');
const applicationsRouter = require('./applications.es6');
const christmasTreeRouter = require('./christmasTree.es6');
const christmasTreeAdminRouter = require('./christmasTreeAdmin.es6');

const router = express.Router();

/** Allow any server to check the preflights. */
router.options('*', middleware.setCorsHeaders, (req, res) => {
  res.set('Access-Control-Allow-Headers', 'accept, content-type');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
  res.send();
});

/** Plug in subroutes. */
router.use('/auth', middleware.setCorsHeaders, middleware.checkPermissions, authRouter);
router.use('/permits/applications', middleware.setCorsHeaders, middleware.checkPermissions, applicationsRouter);
router.use('/forests', middleware.setCorsHeaders, christmasTreeRouter);
router.use('/admin', middleware.setCorsHeaders, middleware.checkAdminPermissions, christmasTreeAdminRouter);

/** GET the number of seconds that this instance has been running. */
router.get('/uptime', (req, res) => {
  res.send('Uptime: ' + process.uptime() + ' seconds');
});

/** Serve static code documentation pages. */
router.use('/docs/code', express.static('docs/code'));

module.exports = router;
