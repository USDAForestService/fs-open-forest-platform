'use strict';

const TABLE_NAME = "christmasTreesForests";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(TABLE_NAME, 'state', { type: Sequelize.STRING, allowNull: true });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn(TABLE_NAME, 'state');
  }
};
