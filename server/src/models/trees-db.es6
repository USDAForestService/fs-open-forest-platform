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

const treesDb = {};
treesDb.Sequelize = Sequelize;  
treesDb.sequelize = sequelize;

treesDb.forests = require('../models/forests.es6')(sequelize, Sequelize);
treesDb.species = require('../models/species.es6')(sequelize, Sequelize);
treesDb.forestSpecies = require('../models/forest-species.es6')(sequelize, Sequelize);
treesDb.speciesNotes = require('../models/species-notes.es6')(sequelize, Sequelize);
treesDb.forestLocations = require('../models/forest-locations.es6')(sequelize, Sequelize);

treesDb.forests.hasMany(treesDb.forestSpecies, {foreignKey: 'forestId', sourceKey: 'id'});
treesDb.forestSpecies.belongsTo(treesDb.forests, {foreignKey: 'forestId', targetKey: 'id'});

treesDb.forests.hasMany(treesDb.forestLocations, {foreignKey: 'forestId', sourceKey: 'id'});
treesDb.forestLocations.belongsTo(treesDb.forests, {foreignKey: 'forestId', targetKey: 'id'});

treesDb.species.belongsTo(treesDb.forestSpecies, {foreignKey: 'id', targetKey: 'speciesId'});
treesDb.forestSpecies.belongsTo(treesDb.species, {foreignKey: 'speciesId', targetKey: 'id'});

treesDb.species.hasMany(treesDb.speciesNotes, {foreignKey: 'speciesId', sourceKey: 'id'});
treesDb.speciesNotes.belongsTo(treesDb.species, {foreignKey: 'speciesId', targetKey: 'id'});

module.exports = treesDb;
