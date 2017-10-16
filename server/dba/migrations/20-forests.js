'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('forests', {
      id: { type: Sequelize.INTEGER, primaryKey: true, field: 'id' },
      forestName: { type: Sequelize.STRING(50), field: 'forest_name' },
      forestUrl: { type: Sequelize.STRING(50), field: 'forest_url' },
      treeHeight: { type: Sequelize.INTEGER, field: 'tree_height' },
      stumpHeight: { type: Sequelize.INTEGER, field: 'stump_height' },
      stumpDiameter: { type: Sequelize.INTEGER, field: 'stump_diameter' },
      notes: { type: Sequelize.STRING(1000), field: 'notes' },
      startDate: { type: Sequelize.DATE, field: 'start_date' },
      endDate: { type: Sequelize.DATE, field: 'end_date' },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'created' },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'updated' }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('forests');
  }
};
