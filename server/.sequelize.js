'use strict';

const url = require('url');
const Sequelize = require('sequelize');
const logger = require('./src/services/logger.es6');
const vcapConstants = require('./src/vcap-constants.es6');

if (!vcapConstants.database || !vcapConstants.database.url) {
  throw new Error('Database configuraction is not set. Please set DATABASE_URL environment variable or add it to configuration.');
}

const dbParams = url.parse(vcapConstants.database.url, true);
const dbAuth = dbParams.auth.split(':');
const dbLogging = !vcapConstants.database.quiet;

const dbLogger = (sql, sequelizeObject) => logger.info(`SEQUELIZE: ${sql}`);

const dbConfig = {
  database: dbParams.pathname.split('/')[1],
  username: dbAuth[0],
  password: dbAuth[1],
  host: dbParams.hostname,
  port: dbParams.port,
  ssl: false,
  dialect: dbParams.protocol.split(':')[0],
  seederStorage: 'sequelize',
  logging: dbLogging && dbLogger
};

if (vcapConstants.database.ssl) {
  dbConfig.ssl = true;
  dbConfig.dialectOptions = {
    ssl: {
      require: true
    }
  };
}

module.exports = dbConfig;
