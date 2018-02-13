'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('species');
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.createTable('species', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id' }
    });
  }
};
