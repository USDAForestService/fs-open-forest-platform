'use strict';

const express = require('express');

const christmasTreeController = require('../controllers/christmas-tree.es6');

const router = express.Router();

/* get list of forests for christmas tree permits */
router.get('/', christmasTreeController.getForests);

/* get regualtions for a single forest */
router.get('/:id', christmasTreeController.getOneGuidelines);

/*POST a new christmas tree application*/
router.post('/christmas-trees/permits', christmasTreeController.create);

/* get one permit */
router.get('/christmas-trees/permits/:id', christmasTreeController.getOnePermit);

module.exports = router;
