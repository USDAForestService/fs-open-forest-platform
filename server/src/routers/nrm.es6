/**
 * Module for feedback routes
 * @module routers/nrm
 */

const express = require('express');

const nrmController = require('../controllers/nrm.es6');

const router = express.Router();

// get all nrm service
router.get('/', nrmController.getUnprocessedPermits);

// process all unprocessed permits
router.get('/process', nrmController.updateUnprocessedPermits);

module.exports = router;
