/**
 * Module for misc routes
 * @module routers/router
 */

const express = require('express');
const middleware = require('../services/middleware.es6');
const authRouter = require('./auth.es6');
const christmasTreeRouter = require('./christmasTree.es6');
const forests = require('./forests.es6');
const christmasTreeAdminRouter = require('./christmasTreeAdmin.es6');
const specialUseRouter = require('./specialuse.es6');
const feedbackRouter = require('./feedback.es6');
const nrmRouter = require('./nrm.es6');

const router = express.Router();

/** Allow any server to check the preflights. */
router.options('*', middleware.setCorsHeaders, (_req, res) => {
  res.set('Access-Control-Allow-Headers', 'accept, content-type');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
  res.send();
});

/** Manually add Cache-Control header */
router.use((_req, res, next) => {
  res.set('Cache-Control', 'no-cache');
  next();
});

/** Plug in subroutes. */
router.use('/auth', middleware.setCorsHeaders, authRouter);
router.use('/permits/applications/special-uses', middleware.setCorsHeaders, middleware.checkPermissions, specialUseRouter);
router.use('/forests', middleware.setCorsHeaders, christmasTreeRouter);
router.use('/fsforests', middleware.setCorsHeaders, forests);
router.use('/christmas-trees/admin', middleware.setCorsHeaders, middleware.checkAdminPermissions, christmasTreeAdminRouter);
router.use('/admin/special-uses', middleware.setCorsHeaders, middleware.checkAdminPermissions, specialUseRouter);
router.use('/feedback', middleware.setCorsHeaders, feedbackRouter);
router.use('/nrm-service', middleware.setCorsHeaders, nrmRouter);

module.exports = router;
