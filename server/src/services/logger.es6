'use strict';

/**
 * Module for logging
 * @module services/logger
 */

const winston = require('winston');
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, { json: true, colorize: true} );

const logger = winston;

module.exports = logger;
