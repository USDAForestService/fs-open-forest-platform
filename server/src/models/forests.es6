

const Sequelize = require('sequelize');
const util = require('../services/util.es6');

const sequelize = util.getSequelizeConnection();

const forestsDb = {};
forestsDb.Sequelize = Sequelize;
forestsDb.sequelize = sequelize;

forestsDb.fsForests = require('../models/fs-forests.es6')(sequelize, Sequelize);
forestsDb.fsForestsPermits = require('../models/fs-forests-permits.es6')(sequelize, Sequelize);

forestsDb.fsForests.hasMany(forestsDb.fsForestsPermits, { foreignKey: 'forestId', sourceKey: 'id' });
forestsDb.fsForestsPermits.belongsTo(forestsDb.fsForests, { foreignKey: 'forestId', targetKey: 'id' });

module.exports = forestsDb;
