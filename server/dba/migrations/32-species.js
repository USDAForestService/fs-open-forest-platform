'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('species', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id' },
      name: { type: Sequelize.STRING, allowNull: false, field: 'name' },
      webUrl: { type: Sequelize.STRING, field: 'web_url' },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'created' },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'updated' }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('species');
  }
};
