/**
 * Module for christmas trees routes
 * @module routers/forests
 */

const express = require('express');

const christmasTreeController = require('../controllers/christmas-tree/permits.es6');
const forestController = require('../controllers/forests/forests.es6');
const middleware = require('../services/middleware.es6');

const router = express.Router();

/** get list of forests for christmas tree permits */
router.get('/', forestController.getForests);

/** get regulations for a single forest */
router.get('/:id', forestController.getForest);

/** POST a new christmas tree application */
router.post('/christmas-trees/permits', christmasTreeController.create);

/** Cancel or Complete permit application */
router.put('/christmas-trees/permits', middleware.checkToken, christmasTreeController.updatePermitApplication);

/** get one permit */
router.get('/christmas-trees/permits/:id', middleware.checkToken, christmasTreeController.getOnePermit);

/** get printable copy of the permit */
router.get('/christmas-trees/permits/:id/print', christmasTreeController.printPermit);

/**
 * ChristmasTrees module routes
 * @exports routers/forests
 */
module.exports = router;
