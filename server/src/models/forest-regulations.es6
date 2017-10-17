'use strict';

const Sequelize = require('sequelize');
const url = require('url');

const sequelizeOptions = {
  dialect: url.parse(process.env.DATABASE_URL, true).protocol.split(':')[0]
};

if (
  url.parse(process.env.DATABASE_URL, true).hostname !== 'localhost' &&
  url.parse(process.env.DATABASE_URL, true).hostname !== 'fs-intake-postgres'
) {
  sequelizeOptions.dialectOptions = {
    ssl: true
  };
}

const sequelize = new Sequelize(process.env.DATABASE_URL, sequelizeOptions);

const forests = require('../models/forests.es6');
const species = require('../models/tree-species.es6');
const forests_species = require('../models/forest-species.es6');

forests.hasMany(forests_species);
forests_species.belongsTo(forests);

species.belongsTo(forests_species);
forests_species.belongsTo(species);


module.exports = forests;