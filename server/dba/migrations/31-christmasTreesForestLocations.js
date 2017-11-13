'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('christmasTreesForestLocations', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id' },
      forestId: {
        allowNull: false,
        references: {
            model: 'christmasTreesForests',
            key: 'id',
            as: 'forest_id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        type: Sequelize.INTEGER,
        field: 'forest_id'
      },
      district: { type: Sequelize.STRING, field: 'district' },
      allowed: { type: Sequelize.BOOLEAN, field: 'allowed' },
      type: { type: Sequelize.STRING(20), field: 'type' }, // road or area
      description: { type: Sequelize.TEXT, field: 'description' },
      imageFilename: { type: Sequelize.STRING(100), field: 'image_filename' }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('christmasTreesForestLocations');
  }
};
