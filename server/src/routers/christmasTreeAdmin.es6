'use strict';

const express = require('express');

const christmasTreeController = require('../controllers/christmas-tree.es6');

const router = express.Router();

/*GET christmas tree permit*/
router.get('/christmas-trees/permits/:forestId/:startDate/:endDate', christmasTreeController.getPermits);

module.exports = router;
