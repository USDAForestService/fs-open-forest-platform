'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('feedbackEntries', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, field: 'id' },
      forests: { type: Sequelize.STRING, field: 'forests' },
      message: { type: Sequelize.STRING, field: 'message' },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'created' },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'updated' }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('feedbackEntries');
  }
};
