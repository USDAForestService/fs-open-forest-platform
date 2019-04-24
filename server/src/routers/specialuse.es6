

/**
 * Module for intake permit application routes
 * @module routers/applications
 */

const express = require('express');
const commonController = require('../controllers/common.es6');
const noncommercialController = require('../controllers/special-use/noncommercial.es6');
const tempOutfitterController = require('../controllers/special-use/temp-outfitter.es6');

const router = express.Router();

/** GET a single noncommercial permit application. */
router.get('/noncommercial/:id', noncommercialController.getOne);

/** POST a new noncommercial permit application. */
router.post('/noncommercial', noncommercialController.create);

/** PUT a noncommercial permit application */
router.put('/noncommercial/:id', noncommercialController.update);

/** GET a temp outfitter permit application. */
router.get('/temp-outfitter/:id', tempOutfitterController.getOne);

/** POST a new temp outfitter permit application. */
router.post('/temp-outfitter', tempOutfitterController.create);

/** PUT a temp outfitter permit application. */
router.put('/temp-outfitter/:id', tempOutfitterController.update);

/** POST temp outfitter file upload and invoke streamToS3 function. */
router.post(
  '/temp-outfitter/file',
  tempOutfitterController.streamToS3.array('file', 1),
  tempOutfitterController.attachFile
);

/** GET temp outfitter files for an application, */
router.get('/temp-outfitter/:id/files', tempOutfitterController.getApplicationFileNames);

/** GET a temp outfitter file, */
router.get('/temp-outfitter/:id/files/:file', tempOutfitterController.streamFile);

/** DELETE temp outfitter file. */
router.delete('/temp-outfitter/file/:id', tempOutfitterController.deleteFile);

/** GET all applications with specified status */
router.get('/:statusGroup', commonController.getPermitApplications);

module.exports = router;
