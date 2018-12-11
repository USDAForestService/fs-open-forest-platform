'use strict';

/**
 * Module for christmas trees routes
 * @module routers/christmasTree
 */

const express = require('express');

const christmasTreeController = require('../controllers/christmas-tree/permits.es6');
const christmasTreeForestController = require('../controllers/christmas-tree/forests.es6');

const router = express.Router();

/** get list of forests for christmas tree permits */
router.get('/', christmasTreeForestController.getForests);

/** get regulations for a single forest */
router.get('/:id', christmasTreeForestController.getForest);

/** POST a new christmas tree application */
router.post('/christmas-trees/permits', christmasTreeController.create);

/** Cancel or Complete permit application */
router.put('/christmas-trees/permits', christmasTreeController.updatePermitApplication);

/** get one permit */
router.get('/christmas-trees/permits/:id', christmasTreeController.getOnePermit);

/** get printable copy of the permit*/
router.get('/christmas-trees/permits/:id/print', christmasTreeController.printPermit);

/**
 * ChristmasTrees module routes
 * @exports routers/christmasTree
 */
module.exports = router;
