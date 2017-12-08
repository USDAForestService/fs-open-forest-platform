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

treesDb.christmasTreesForests = require('../models/christmas-trees-forests.es6')(sequelize, Sequelize);
treesDb.species = require('../models/christmas-trees-species.es6')(sequelize, Sequelize);
treesDb.christmasTreesForestSpecies = require('../models/christmas-trees-forest-species.es6')(sequelize, Sequelize);
treesDb.speciesNotes = require('../models/christmas-trees-species-notes.es6')(sequelize, Sequelize);
treesDb.christmasTreesForestLocations = require('../models/christmas-trees-forest-locations.es6')(sequelize, Sequelize);

treesDb.christmasTreesForests.hasMany(treesDb.christmasTreesForestSpecies, {foreignKey: 'forestId', sourceKey: 'id'});
treesDb.christmasTreesForestSpecies.belongsTo(treesDb.christmasTreesForests, {foreignKey: 'forestId', targetKey: 'id'});

treesDb.christmasTreesForests.hasMany(treesDb.christmasTreesForestLocations, {foreignKey: 'forestId', sourceKey: 'id'});
treesDb.christmasTreesForestLocations.belongsTo(treesDb.christmasTreesForests, {foreignKey: 'forestId', targetKey: 'id'});

treesDb.species.belongsTo(treesDb.christmasTreesForestSpecies, {foreignKey: 'id', targetKey: 'speciesId'});
treesDb.christmasTreesForestSpecies.belongsTo(treesDb.species, {foreignKey: 'speciesId', targetKey: 'id'});

treesDb.species.hasMany(treesDb.speciesNotes, {foreignKey: 'speciesId', sourceKey: 'id'});
treesDb.speciesNotes.belongsTo(treesDb.species, {foreignKey: 'speciesId', targetKey: 'id'});

treesDb.christmasTreesPermits = require('../models/christmas-trees-permits.es6')(sequelize, Sequelize);
treesDb.christmasTreesForests.hasMany(treesDb.christmasTreesPermits, {foreignKey: 'forestId', sourceKey: 'id'});
treesDb.christmasTreesPermits.belongsTo(treesDb.christmasTreesForests, {foreignKey: 'forestId', targetKey: 'id'});

module.exports = treesDb;
