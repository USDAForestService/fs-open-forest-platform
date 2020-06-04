'use strict';

const TABLE_NAME = "christmasTreesForests";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(TABLE_NAME, 'region', { type: Sequelize.INTEGER, allowNull: true });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn(TABLE_NAME, 'region');
  }
};
