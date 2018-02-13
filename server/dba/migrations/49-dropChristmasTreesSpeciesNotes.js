'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('speciesNotes');
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.createTable('speciesNotes', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id' }
    });
  }
};
