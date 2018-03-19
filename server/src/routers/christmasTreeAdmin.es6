'use strict';

/**
 * Module for christmas trees admin routes
 * @module routers/christmasTreeAdmin
 */

const express = require('express');

const christmasTreeAdminController = require('../controllers/christmas-tree-admin.es6');

const router = express.Router();

/** GET christmas tree permit */
router.get(
  '/christmas-trees/permits/:forestId/:startDate/:endDate',
  christmasTreeAdminController.getPermitSummaryReport
);

router.get('/christmas-trees/permits/:permitNumber', christmasTreeAdminController.getPermitReport);

router.put('/christmas-trees/forests/:forestId', christmasTreeAdminController.updateForestDetails);

module.exports = router;
