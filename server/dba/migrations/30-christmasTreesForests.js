'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('christmasTreesForests', {
      id: { type: Sequelize.INTEGER, primaryKey: true, field: 'id' },
      forestName: { type: Sequelize.STRING(50), field: 'forest_name' },
      description: { type: Sequelize.TEXT, field: 'description' },
      orgStructureCode: { type: Sequelize.STRING(50), field: 'org_structure_code' },
      forestUrl: { type: Sequelize.STRING, field: 'forest_url' },
      forestAbbr: { type: Sequelize.STRING(50), field: 'forest_abbr' },
      forestNameShort: { type: Sequelize.STRING, field: 'forest_name_short' },
      timezone: { type: Sequelize.STRING(50), field: 'timezone' },
      startDate: { type: Sequelize.DATE, field: 'start_date' },
      endDate: { type: Sequelize.DATE, field: 'end_date' },
      treeHeight: { type: Sequelize.INTEGER, field: 'tree_height' },
      stumpHeight: { type: Sequelize.INTEGER, field: 'stump_height' },
      stumpDiameter: { type: Sequelize.INTEGER, field: 'stump_diameter' },
      treeCost: { type: Sequelize.NUMERIC(8, 2), field: 'tree_cost' },
      maxNumTrees: { type: Sequelize.INTEGER, field: 'max_num_trees' },
      allowAdditionalHeight: { type: Sequelize.BOOLEAN, field: 'allow_additional_height' },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'created' },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'updated' }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('christmasTreesForests');
  }
};
