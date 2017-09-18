'use strict';

const vcapConstants = require('./vcap-constants.es6');
const util = require('./util.es6');

const middleware = {};

middleware.setCorsHeaders = (req, res, next) => {
  /* don't cache the API calls */
  res.set('Cache-Control', 'no-cache');
  if (process.env.PLATFORM === 'CI') {
    res.set('Access-Control-Allow-Origin', 'http://localhost:49152');
    res.set('Access-Control-Allow-Credentials', true);
  } else if (process.env.PLATFORM === 'local') {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.set('Access-Control-Allow-Credentials', true);
  } else {
    res.set('Access-Control-Allow-Origin', vcapConstants.intakeClientBaseUrl);
    res.set('Access-Control-Allow-Credentials', true);
  }
  next();
};

/* middleware for checking a valid user */
middleware.checkPermissions = (req, res, next) => {
  if (util.isLocalOrCI()) {
    next();
  } else {
    if (!req.user) {
      res.status(401).send({
        errors: ['Unauthorized']
      });
    } else {
      next();
    }
  }
};

/* middleware for checking a valid admin user */
middleware.checkAdminPermissions = (req, res, next) => {
  if (util.isLocalOrCI()) {
    next();
  } else {
    if (req.user.role !== 'admin' || !vcapConstants.eAuthUserWhiteList.includes(req.user.email)) {
      res.status(403).send({
        errors: ['Forbidden']
      });
    } else {
      next();
    }
  }
};

module.exports = middleware;
