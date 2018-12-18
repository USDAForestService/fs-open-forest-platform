

/**
 * Module for logging
 * @module services/logger
 */

const winston = require('winston');

const params = require('./expresslogger.es6');

const logger = winston.createLogger(params.loggerParams);

module.exports = logger;
