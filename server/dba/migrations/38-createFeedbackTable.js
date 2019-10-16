'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('feedback', {
      id: { type: Sequelize.INTEGER, primaryKey: true, field: 'id' },
      email: { type: Sequelize.STRING, field: 'email' },
      forests: { type: Sequelize.ARRAY(Sequelize.STRING), field: 'forests' },
      feedback: { type: Sequelize.STRING, field: 'feedback' },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'created' },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'updated' }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('feedback');
  }
};
