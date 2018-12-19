

/**
 * Module for logging
 * @module services/logger
 */

const winston = require('winston');

const params = require('./expresslogger.es6');

/**
 * @function logger - API function to update permit
 * @param {Object} options - creates a new winston logger
 */
const logger = winston.createLogger(params.loggerParams);

module.exports = logger;
