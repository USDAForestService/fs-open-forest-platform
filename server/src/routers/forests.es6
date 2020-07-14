/**
 * Module for christmas trees routes
 * @module routers/forests
 */

const express = require('express');

const forestController = require('../controllers/forests/forests.es6');

const router = express.Router();

/** get list of forests for christmas tree permits */
router.get('/', forestController.getForests);

/** get regulations for a single forest */
router.get('/:id', forestController.getForest);

/**
 * ChristmasTrees module routes
 * @exports routers/forests
 */
module.exports = router;
