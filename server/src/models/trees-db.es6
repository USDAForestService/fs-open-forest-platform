'use strict';

const util = require('../services/util.es6');
const Sequelize = require('sequelize');

const sequelize = util.getSequelizeConnection();

const treesDb = {};
treesDb.Sequelize = Sequelize;
treesDb.sequelize = sequelize;

treesDb.christmasTreesForests = require('../models/christmas-trees-forests.es6')(sequelize, Sequelize);
treesDb.christmasTreesPermits = require('../models/christmas-trees-permits.es6')(sequelize, Sequelize);
treesDb.christmasTreesForests.hasMany(treesDb.christmasTreesPermits, { foreignKey: 'forestId', sourceKey: 'id' });
treesDb.christmasTreesPermits.belongsTo(treesDb.christmasTreesForests, { foreignKey: 'forestId', targetKey: 'id' });

module.exports = treesDb;
