'use strict';

/**
 * Module for Express middleware
 * @module services/middleware
 */

const vcapConstants = require('../vcap-constants.es6');
const util = require('./util.es6');

const middleware = {};

/**
 * @function setCorsHeaders - Set the http CORS headers.
 * @param {Object} request
 * @param {Object} response
 */
middleware.setCorsHeaders = (req, res, next) => {
  // Don't cache the API calls.
  res.set('Cache-Control', 'no-cache');
  if (process.env.PLATFORM === 'local' || process.env.PLATFORM === 'CI') {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.set('Access-Control-Allow-Credentials', true);
  } else {
    res.set('Access-Control-Allow-Origin', vcapConstants.INTAKE_CLIENT_BASE_URL);
    res.set('Access-Control-Allow-Credentials', true);
  }
  next();
};

/**
 * @function checkPermissions - Check for a valid user.
 * @param {Object} request
 * @param {Object} response
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
 * @function checkAdminPermissions - Check for admin permsissions.
 * @param {Object} request
 * @param {Object} response
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

module.exports = middleware;
