'use strict';

const TABLE_NAME = 'christmasTreesPermits';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(TABLE_NAME, 'purchase_date', { type: Sequelize.DATE, allowNull: true });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn(TABLE_NAME, 'purchase_date');
  }
};
