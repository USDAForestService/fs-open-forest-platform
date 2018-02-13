'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('christmasTreesForestLocations');
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.createTable('christmasTreesForestLocations', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id' }
    });
  }
};
