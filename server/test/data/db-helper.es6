const _ = require('lodash/fp');

const treesDb = require('../../src/models/trees-db.es6');
const permitFactory = require('./christmas-trees-permit-factory.es6');
const forestFactory = require('./christmas-trees-forest-factory.es6');

const queryInterface = treesDb.sequelize.getQueryInterface();

const snakeKeys = _.mapKeys(_.snakeCase);

module.exports = {
  bulkInsertPermits(items) {
    const mapped = items.map(p => permitFactory.create(p)).map(snakeKeys);
    return queryInterface.bulkInsert('christmasTreesPermits', mapped, { returning: true });
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
