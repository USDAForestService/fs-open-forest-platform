'use strict';

/**
 * Module for permit application routes
 * @module routers/applications
 */

const express = require('express');
const commonController = require('../controllers/common.es6');
const noncommercialController = require('../controllers/noncommercial.es6');
const tempOutfitterController = require('../controllers/temp-outfitter.es6');
const christmasTreeController = require('../controllers/christmas-tree.es6');

const router = express.Router();

/** GET a single noncommercial permit application. */
router.get('/special-uses/noncommercial/:id', noncommercialController.getOne);

/** POST a new noncommercial permit application. */
router.post('/special-uses/noncommercial', noncommercialController.create);

/** PUT a noncommercial permit application */
router.put('/special-uses/noncommercial/:id', noncommercialController.update);

/** GET a temp outfitter permit application. */
router.get('/special-uses/temp-outfitter/:id', tempOutfitterController.getOne);

/** POST a new temp outfitter permit application. */
router.post('/special-uses/temp-outfitter', tempOutfitterController.create);

/** PUT a temp outfitter permit application. */
router.put('/special-uses/temp-outfitter/:id', tempOutfitterController.update);

/** POST temp outfitter file upload and invoke streamToS3 function. */
router.post(
  '/special-uses/temp-outfitter/file',
  tempOutfitterController.streamToS3.array('file', 1),
  tempOutfitterController.attachFile
);

/** GET temp outfitter files for an application, */
router.get('/special-uses/temp-outfitter/:id/files', tempOutfitterController.getApplicationFileNames);

/** GET a temp outfitter file, */
router.get('/special-uses/temp-outfitter/:id/files/:file', tempOutfitterController.streamFile);

/** DELETE temp outfitter file. */
router.delete('/special-uses/temp-outfitter/file/:id', tempOutfitterController.deleteFile);

/** GET all applications with specified status */
router.get('/:statusGroup', commonController.getPermitApplications);

/*POST a new christmas tree application*/
router.post('/christmas-trees', christmasTreeController.create);

/**
 * Permit application routes
 * @exports router
 */
module.exports = router;
