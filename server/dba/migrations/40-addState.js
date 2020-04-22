'use strict';

const TABLE_NAME = "christmasTreesForests";

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(TABLE_NAME, 'state', { type: Sequelize.DATE, allowNull: true }).then(() => {
      queryInterface.sequelize.query('UPDATE "christmasTreesForests" SET state = updated')
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn(TABLE_NAME, 'state');
  }
};
