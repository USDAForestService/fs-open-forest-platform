/**
 * Module for feedback routes
 * @module routers/nrm
 */

const express = require('express');

const nrmController = require('../controllers/nrm-service.es6');

const router = express.Router();

// get all nrm service
router.get('/', nrmController.getEntries);

// get nrm by id
router.get('/:id', nrmController.getEntry);

// create new nrm entry
router.post('/create', nrmController.createEntry);

module.exports = router;
