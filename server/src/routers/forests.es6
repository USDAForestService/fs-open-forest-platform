/**
 * Module for fsforests routes
 * @module routers/forests
 */

const express = require('express');
const firewoodController = require('../controllers/forests/firewood-permits.es6');
const forestController = require('../controllers/forests/forests.es6');

const router = express.Router();

/** get list of forests for christmas tree permits */
router.get('/', forestController.getForests);

/** get regulations for a single forest */
router.get('/:id', forestController.getForest);

// get a single firewood permit by id
router.get('/firewood-permits/:id', firewoodController.getOnePermit);

router.post('/firewood-permits', firewoodController.create);

router.put('/firewood-permits/:id', firewoodController.updatePermitApplication);

router.get('/firewood-permits/:id/save', firewoodController.getPDF);

// router.get('/firewood-permits/pdf', firewoodController.getPDF);

/**
 * Firewood module routes
 * @exports routers/forests
 */
module.exports = router;
