'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('fsForests', {
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
      contact: { type: Sequelize.STRING(500), field: 'contact' },
      mapLinks: { type: Sequelize.STRING(500), field: 'map_links' },
      woodCost: { type: Sequelize.NUMERIC(8, 2), field: 'wood_cost' },
      // minCords: { type: Sequelize.STRING(50), field: 'min_cords' },
      // maxCords: { type: Sequelize.STRING(50), field: 'max_cords' },
      cuttingAreas: { type: Sequelize.STRING(500), field: 'cutting_areas' },
      possId: { type: Sequelize.STRING(50), field: 'poss_financial_id' },
      state: { type: Sequelize.STRING(50), field: 'state' },
      region: { type: Sequelize.STRING(50), field: 'region' },
      permitType: { type: Sequelize.STRING(50), field: 'permit_type'},
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'created' },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'updated' },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('fsForests');
  }
};