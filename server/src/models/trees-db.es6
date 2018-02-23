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
treesDb.christmasTreesPermits = require('../models/christmas-trees-permits.es6')(sequelize, Sequelize);
treesDb.christmasTreesForests.hasMany(treesDb.christmasTreesPermits, { foreignKey: 'forestId', sourceKey: 'id' });
treesDb.christmasTreesPermits.belongsTo(treesDb.christmasTreesForests, { foreignKey: 'forestId', targetKey: 'id' });

module.exports = treesDb;
