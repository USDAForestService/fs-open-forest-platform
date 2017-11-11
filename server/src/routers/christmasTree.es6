'use strict';

const express = require('express');

const christmasTreeController = require('../controllers/christmas-tree.es6');

const router = express.Router();

/* get regualtions for a single forest */
router.get('/:id/regulations', christmasTreeController.getOneRegulations);

module.exports = router;
