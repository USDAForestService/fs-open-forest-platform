'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('christmasTreesForestSpecies');
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.createTable('christmasTreesForestSpecies', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id' }
    });
  }
};
