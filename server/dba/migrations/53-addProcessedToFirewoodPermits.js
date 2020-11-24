'use strict';

const TABLE_NAME = "firewoodPermits";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(TABLE_NAME, 'processed', { type: Sequelize.BOOLEAN });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn(TABLE_NAME, 'processed');
  }
};
