'use strict';

const express = require('express');

const middleware = require('./middleware.es6');
const noncommercial = require('./noncommercial.es6');
const passportConfig = require('./auth/passport-config.es6');
const tempOutfitter = require('./temp-outfitter.es6');
const util = require('./util.es6');

const router = express.Router();

// allow anyone to check the preflights
router.options('*', middleware.setCorsHeaders, (req, res) => {
  res.set('Access-Control-Allow-Headers', 'accept, content-type');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
  res.send();
});

/* return universal passport user */
router.get('/auth/user', middleware.setCorsHeaders, middleware.checkPermissions, passportConfig.getPassportUser);

/* universal passport logout */
router.get('/auth/logout', middleware.setCorsHeaders, middleware.checkPermissions, passportConfig.logout);

/** get a single noncommercial permit application */
router.get(
  '/permits/applications/special-uses/noncommercial/:id',
  middleware.setCorsHeaders,
  middleware.checkPermissions,
  noncommercial.getOne
);
/** create a new noncommercial permit application */
router.post(
  '/permits/applications/special-uses/noncommercial',
  middleware.setCorsHeaders,
  middleware.checkPermissions,
  noncommercial.create
);
/** update a noncommercial permit application */
router.put(
  '/permits/applications/special-uses/noncommercial/:id',
  middleware.setCorsHeaders,
  middleware.checkPermissions,
  noncommercial.update
);

/** get a temp outfitter permit application */
router.get(
  '/permits/applications/special-uses/temp-outfitter/:id',
  middleware.setCorsHeaders,
  middleware.checkPermissions,
  tempOutfitter.getOne
);
/** get temp outfitter files by application id */
router.get(
  '/permits/applications/special-uses/temp-outfitter/:id/files',
  middleware.setCorsHeaders,
  middleware.checkPermissions,
  tempOutfitter.getApplicationFileNames
);
/** get a temp outfitter file */
router.get(
  '/permits/applications/special-uses/temp-outfitter/:id/files/:file',
  middleware.setCorsHeaders,
  middleware.checkPermissions,
  tempOutfitter.streamFile
);
/** create a new temp outfitter permit application */
router.post(
  '/permits/applications/special-uses/temp-outfitter',
  middleware.setCorsHeaders,
  middleware.checkPermissions,
  tempOutfitter.create
);
/** update a temp outfitter permit application */
router.put(
  '/permits/applications/special-uses/temp-outfitter/:id',
  middleware.setCorsHeaders,
  middleware.checkPermissions,
  tempOutfitter.update
);
/** handle temp outfitter file upload and invokes streamToS3 function */
router.post(
  '/permits/applications/special-uses/temp-outfitter/file',
  middleware.setCorsHeaders,
  middleware.checkPermissions,
  tempOutfitter.streamToS3.array('file', 1),
  tempOutfitter.attachFile
);

/** get all applications with status on Received or Hold */
router.get(
  '/permits/applications',
  middleware.setCorsHeaders,
  middleware.checkPermissions,
  middleware.checkAdminPermissions,
  util.getAllOpenApplications
);

/** get the number of seconds that this instance has been running */
router.get('/uptime', (req, res) => {
  res.send('Uptime: ' + process.uptime() + ' seconds');
});

/* serve static documentation pages */
router.use('/docs/api', express.static('docs/api'));

module.exports = router;
