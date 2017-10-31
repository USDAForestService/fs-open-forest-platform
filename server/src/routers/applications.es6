'use strict';

const express = require('express');
const commonController = require('../controllers/common.es6');
const noncommercialController = require('../controllers/noncommercial.es6');
const tempOutfitterController = require('../controllers/temp-outfitter.es6');

const router = express.Router();

/* get a single noncommercial permit application */
router.get('/special-uses/noncommercial/:id', noncommercialController.getOne);

/* create a new noncommercial permit application */
router.post('/special-uses/noncommercial', noncommercialController.create);

/* update a noncommercial permit application */
router.put('/special-uses/noncommercial/:id', noncommercialController.update);

/* get a temp outfitter permit application */
router.get('/special-uses/temp-outfitter/:id', tempOutfitterController.getOne);

/* get temp outfitter files by application id */
router.get('/special-uses/temp-outfitter/:id/files', tempOutfitterController.getApplicationFileNames);

/* get a temp outfitter file */
router.get('/special-uses/temp-outfitter/:id/files/:file', tempOutfitterController.streamFile);

/* create a new temp outfitter permit application */
router.post('/special-uses/temp-outfitter', tempOutfitterController.create);

/* update a temp outfitter permit application */
router.put('/special-uses/temp-outfitter/:id', tempOutfitterController.update);

/* handle temp outfitter file upload and invokes streamToS3 function */
router.post(
  '/special-uses/temp-outfitter/file',
  tempOutfitterController.streamToS3.array('file', 1),
  tempOutfitterController.attachFile
);

/* handle temp outfitter file delete */
router.post('/special-uses/temp-outfitter/file/:id', tempOutfitterController.deleteFile);

/* get all applications with specified status */
router.get('/:statusGroup', commonController.getPermitApplications);

module.exports = router;
