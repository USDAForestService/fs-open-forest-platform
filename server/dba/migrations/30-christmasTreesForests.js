'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('christmasTreesForests', {
      id: { type: Sequelize.INTEGER, primaryKey: true, field: 'id' },
      forestName: { type: Sequelize.STRING(50), field: 'forest_name' },
      description: { type: Sequelize.TEXT, field: 'description' },
      forestUrl: { type: Sequelize.STRING, field: 'forest_url' },
      treeHeight: { type: Sequelize.INTEGER, field: 'tree_height' },
      stumpHeight: { type: Sequelize.INTEGER, field: 'stump_height' },
      stumpDiameter: { type: Sequelize.INTEGER, field: 'stump_diameter' },
      startDate: { type: Sequelize.DATE, field: 'start_date' },
      endDate: { type: Sequelize.DATE, field: 'end_date' },
      orgStructureCode: { type: Sequelize.STRING(50), field: 'org_structure_code' },
      forestAbbr: { type: Sequelize.STRING(50), field: 'forest_abbr'},
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'created' },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'updated' }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('christmasTreesForests');
  }
};
