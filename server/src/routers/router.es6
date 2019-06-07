/**
 * Module for misc routes
 * @module routers/router
 */

const express = require('express');
const cors = require('cors');
const vcapConstants = require('../vcap-constants.es6');
const util = require('../services/util.es6');
const middleware = require('../services/middleware.es6');
const authRouter = require('./auth.es6');
const christmasTreeRouter = require('./christmasTree.es6');
const christmasTreeAdminRouter = require('./christmasTreeAdmin.es6');
const specialUseRouter = require('./specialuse.es6');

const router = express.Router();

let origin = 'http://localhost:4200';
if (util.isProduction()) {
  origin = vcapConstants.INTAKE_CLIENT_BASE_URL;
}
const corsOpts = {
  origin,
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: 'accept, content-type',
  methods: 'GET, PUT, POST, DELETE, OPTIONS, PATCH'
};

/** Allow any server to check the preflights. */
router.options('*', cors(corsOpts), (_req, res) => {
  res.set('Access-Control-Allow-Headers', 'accept, content-type');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
  res.send();
});

/** Plug in subroutes. */
router.use('/auth', cors(corsOpts), authRouter);
router.use('/permits/applications/special-uses', cors(corsOpts), middleware.checkPermissions, specialUseRouter);
router.use('/forests', cors(corsOpts), christmasTreeRouter);
router.use('/admin/christmas-trees', cors(corsOpts), middleware.checkAdminPermissions, christmasTreeAdminRouter);
router.use('/admin/special-uses', cors(corsOpts), middleware.checkAdminPermissions, specialUseRouter);

module.exports = router;
