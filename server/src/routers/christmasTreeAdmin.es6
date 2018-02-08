'use strict';

const express = require('express');

const christmasTreeController = require('../controllers/christmas-tree.es6');

const router = express.Router();

/*GET christmas tree permit*/
router.get('/christmas-trees/permits/:forestId/:startDate/:endDate', christmasTreeController.getPermits);

router.get('/christmas-trees/permits/:paygovTrackingId', christmasTreeController.getPermitByTrackingId);

router.put('/christmas-trees/forests/:forestId', christmasTreeController.updateForest);

module.exports = router;
