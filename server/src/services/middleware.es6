/**
 * Module for Express middleware
 * @module services/middleware
 */
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');

const vcapConstants = require('../vcap-constants.es6');
const util = require('./util.es6');

const middleware = {};

let origin = 'http://localhost:4200';
if (util.isProduction()) {
  origin = vcapConstants.INTAKE_CLIENT_BASE_URL
}
let corsOpts = {
  origin: origin,
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: 'accept, content-type',
  methods: 'GET, PUT, POST, DELETE, OPTIONS, PATCH'
}

/**
 * @function setCorsHeaders - Set the http CORS headers.
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
middleware.setCorsHeaders = cors(corsOpts)

/**
 * @function checkPermissions - Check for a valid user.
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
middleware.checkPermissions = (req, res, next) => {
  if (!req.user) {
    res.status(401).send();
  } else {
    next();
  }
};

/**
 * @function checkAdminPermissions - Check for admin permissions.
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
middleware.checkAdminPermissions = (req, res, next) => {
  if (req.user && req.user.role === util.ADMIN_ROLE) {
    next();
  } else {
    res.status(403).send();
  }
};

/**
 * @function checkToken - Check for a valid permit token.
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
middleware.checkToken = (req, res, next) => {
  try {
    jwt.verify(req.query.t, vcapConstants.PERMIT_SECRET);
    next();
  } catch (e) {
    res.status(401).send();
  }
};

module.exports = middleware;
