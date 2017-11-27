'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('christmasTreesForestSpecies', {
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
      speciesId: {
        allowNull: false,
        references: {
            model: 'species',
            key: 'id',
            as: 'species_id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        type: Sequelize.INTEGER,
        field: 'species_id'
      },
      status: { type: Sequelize.STRING, field: 'status' }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('christmasTreesForestSpecies');
  }
};
