const Sequelize = require('sequelize');
const util = require('../services/util.es6');

const sequelize = util.getSequelizeConnection();

const forestsDb = {};
forestsDb.Sequelize = Sequelize;
forestsDb.sequelize = sequelize;

forestsDb.fsForests = require('../models/fs-forests.es6')(sequelize, Sequelize);

module.exports = forestsDb;
