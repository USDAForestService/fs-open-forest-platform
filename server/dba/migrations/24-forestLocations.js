'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('forestLocations', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id' },
      forest_id: {
        allowNull: false,
        references: {
            model: 'forests',
            key: 'id',
            as: 'forest_id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        type: Sequelize.INTEGER
      },
      district: { type: Sequelize.STRING, field: 'district' },
      allowed: { type: Sequelize.BOOLEAN, field: 'allowed' },
      type: { type: Sequelize.STRING(20), field: 'type' }, // road or area
      description: { type: Sequelize.STRING, field: 'description' }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('forestLocations');
  }
};
