'use strict';

const url = require('url');
const Sequelize = require('sequelize');
const logger = require('./src/services/logger.es6');

const dbParams = url.parse(process.env.DATABASE_URL, true);
const dbAuth = dbParams.auth.split(':');

const dbConfig = {
  database: dbParams.pathname.split('/')[1],
  username: dbAuth[0],
  password: dbAuth[1],
  host: dbParams.hostname,
  port: dbParams.port,
  ssl: false,
  dialect: dbParams.protocol.split(':')[0],
  seederStorage: 'sequelize',
  logging: function(sql, sequelizeObject) {
       logger.info(`SEQUELIZE: ${sql}`);
  },
  operatorsAliases: false
};

if (dbParams.hostname !== 'localhost' && dbParams.hostname !== 'fs-intake-postgres') {
  dbConfig.ssl = true;
  dbConfig.dialectOptions = {
    ssl: {
      require: true
    }
  };
}

module.exports = dbConfig;
