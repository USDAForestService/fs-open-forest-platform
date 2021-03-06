'use strict';

const TABLE_NAME = "firewoodPermits";

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(TABLE_NAME, 'purchase_date', { type: Sequelize.DATE, allowNull: true }).then(() => {
      queryInterface.sequelize.query('UPDATE "firewoodPermits" SET purchase_date = updated')
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn(TABLE_NAME, 'purchase_date');
  }
};
