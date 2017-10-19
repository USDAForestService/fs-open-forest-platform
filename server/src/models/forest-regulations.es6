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
const species = require('../models/species.es6');
const forests_species = require('../models/forest-species.es6');

forests.hasMany(forests_species, {foreignKey: 'forestId', sourceKey: 'id'});
forests_species.belongsTo(forests, {foreignKey: 'forestId', targetKey: 'id'});

species.belongsTo(forests_species, {foreignKey: 'id', targetKey: 'speciesId'});
forests_species.belongsTo(species, {foreignKey: 'speciesId', targetKey: 'id'});

module.exports = forests;
