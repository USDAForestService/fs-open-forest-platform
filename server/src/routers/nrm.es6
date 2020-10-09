/**
 * Module for feedback routes
 * @module routers/nrm
 */

const express = require('express');

const nrmController = require('../controllers/nrm-service.es6');

const router = express.Router();

// get all nrm service
router.get('/', nrmController.getEntries);

module.exports = router;
