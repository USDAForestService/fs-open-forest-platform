'use strict';

/**
 * Module for Express middleware
 * @module middleware
 */

const vcapConstants = require('../vcap-constants.es6');
const util = require('./util.es6');

const middleware = {};

/**
 * Set the http headers.
 */
middleware.setCorsHeaders = (req, res, next) => {
  // Don't cache the API calls.
  res.set('Cache-Control', 'no-cache');
  if (process.env.PLATFORM === 'local' || process.env.PLATFORM === 'CI') {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.set('Access-Control-Allow-Credentials', true);
  } else {
    res.set('Access-Control-Allow-Origin', vcapConstants.intakeClientBaseUrl);
    res.set('Access-Control-Allow-Credentials', true);
  }
  next();
};

/**
 * Check for a valid user.
 */
middleware.checkPermissions = (req, res, next) => {
  if (util.isLocalOrCI()) {
    next();
  } else {
    if (!req.user) {
      res.status(401).send();
    } else {
      next();
    }
  }
};

/**
 * Check for admin permsissions.
 */
middleware.checkAdminPermissions = (req, res, next) => {
  if (util.isLocalOrCI()) {
    next();
  } else {
    if (req.user && util.getUserRole(req.user.adminUsername) === util.ADMIN_ROLE) {
      next();
    } else {
      res.status(403).send();
    }
  }
};

/**
 * Express middleware functions
 * @exports middleware
 */
module.exports = middleware;
