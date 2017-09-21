'use strict';

const express = require('express');

const commonController = require('./controllers/common.es6');
const middleware = require('./middleware.es6');
const noncommercialController = require('./controllers/noncommercial.es6');
const passportConfig = require('./auth/passport-config.es6');
const tempOutfitterController = require('./controllers/temp-outfitter.es6');

const router = express.Router();

/* allow any server to check the preflights */
router.options('*', middleware.setCorsHeaders, (req, res) => {
  res.set('Access-Control-Allow-Headers', 'accept, content-type');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
  res.send();
});

/* return universal passport user */
router.get('/auth/user', middleware.setCorsHeaders, middleware.checkPermissions, passportConfig.getPassportUser);

/* universal passport logout */
router.get('/auth/logout', middleware.setCorsHeaders, middleware.checkPermissions, passportConfig.logout);

/* get a single noncommercial permit application */
router.get(
  '/permits/applications/special-uses/noncommercial/:id',
  middleware.setCorsHeaders,
  middleware.checkPermissions,
  noncommercialController.getOne
);

/* create a new noncommercial permit application */
router.post(
  '/permits/applications/special-uses/noncommercial',
  middleware.setCorsHeaders,
  middleware.checkPermissions,
  noncommercialController.create
);

/* update a noncommercial permit application */
router.put(
  '/permits/applications/special-uses/noncommercial/:id',
  middleware.setCorsHeaders,
  middleware.checkPermissions,
  noncommercialController.update
);

/* get a temp outfitter permit application */
router.get(
  '/permits/applications/special-uses/temp-outfitter/:id',
  middleware.setCorsHeaders,
  middleware.checkPermissions,
  tempOutfitterController.getOne
);

/* get temp outfitter files by application id */
router.get(
  '/permits/applications/special-uses/temp-outfitter/:id/files',
  middleware.setCorsHeaders,
  middleware.checkPermissions,
  tempOutfitterController.getApplicationFileNames
);

/* get a temp outfitter file */
router.get(
  '/permits/applications/special-uses/temp-outfitter/:id/files/:file',
  middleware.setCorsHeaders,
  middleware.checkPermissions,
  tempOutfitterController.streamFile
);

/* create a new temp outfitter permit application */
router.post(
  '/permits/applications/special-uses/temp-outfitter',
  middleware.setCorsHeaders,
  middleware.checkPermissions,
  tempOutfitterController.create
);

/* update a temp outfitter permit application */
router.put(
  '/permits/applications/special-uses/temp-outfitter/:id',
  middleware.setCorsHeaders,
  middleware.checkPermissions,
  tempOutfitterController.update
);

/* handle temp outfitter file upload and invokes streamToS3 function */
router.post(
  '/permits/applications/special-uses/temp-outfitter/file',
  middleware.setCorsHeaders,
  middleware.checkPermissions,
  tempOutfitterController.streamToS3.array('file', 1),
  tempOutfitterController.attachFile
);

/* get all applications with status on Received or Hold */
router.get(
  '/permits/applications/:statusGroup',
  middleware.setCorsHeaders,
  middleware.checkPermissions,
  middleware.checkAdminPermissions,
  commonController.getAllOpenApplications
);

/* get all applications for the user */
router.get(
  '/user/applications/:statusGroup',
  middleware.setCorsHeaders,
  middleware.checkPermissions,
  commonController.getAllOpenApplications
);

/* get the number of seconds that this instance has been running */
router.get('/uptime', (req, res) => {
  res.send('Uptime: ' + process.uptime() + ' seconds');
});

/* serve static documentation pages */
router.use('/docs/api', express.static('docs/api'));

module.exports = router;
