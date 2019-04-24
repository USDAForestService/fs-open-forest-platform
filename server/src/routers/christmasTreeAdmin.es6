

/**
 * Module for christmas trees admin routes
 * @module routers/christmasTreeAdmin
 */

const express = require('express');

const christmasTreeAdminController = require('../controllers/christmas-tree/admin.es6');

const router = express.Router();

/** GET christmas tree permit */
router.get('/permits/summary', christmasTreeAdminController.getPermitSummaryReport);

router.get('/permits/:permitNumber', christmasTreeAdminController.getPermitReport);

router.put('/forests/:forestId', christmasTreeAdminController.updateForestDetails);

module.exports = router;
