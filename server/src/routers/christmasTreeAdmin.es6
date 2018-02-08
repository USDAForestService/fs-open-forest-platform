'use strict';

const express = require('express');

const christmasTreeAdminController = require('../controllers/christmas-tree-admin.es6');

const router = express.Router();

/*GET christmas tree permit*/
router.get('/christmas-trees/permits/:forestId/:startDate/:endDate', christmasTreeAdminController.getPermits);

router.get('/christmas-trees/permits/:paygovTrackingId', christmasTreeAdminController.getPermitByTrackingId);

router.put('/christmas-trees/forests/:forestId', christmasTreeAdminController.updateForest);

module.exports = router;
