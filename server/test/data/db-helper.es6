const treesDb = require('../../src/models/trees-db.es6');
const permitFactory = require('./christmas-trees-permit-factory.es6');
const forestFactory = require('./christmas-trees-forest-factory.es6');

const queryInterface = treesDb.sequelize.getQueryInterface();
const operator = treesDb.Sequelize.Op;

module.exports = {
  bulkInsertPermits(items) {
    return queryInterface.bulkInsert('christmasTreesPermits', items);
  },
  bulkDeletePermits(permitIds) {
    return queryInterface.bulkDelete('christmasTreesPermits', {
      permit_id: { [operator.in]: permitIds }
    });
  },
  createForest(forest) {
    return treesDb.christmasTreesForests.create(forestFactory.create(forest));
  },
  createPermit(permit) {
    return treesDb.christmasTreesPermits.create(permitFactory.create(permit));
  },
  destroyAll() {
    Promise.all([
      treesDb.christmasTreesForests.destroy({ where: {}, force: true }),
      treesDb.christmasTreesPermits.destroy({ where: {}, force: true })
    ]);
  }
};
