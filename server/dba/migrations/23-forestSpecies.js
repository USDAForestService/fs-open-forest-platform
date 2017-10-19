'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('forestSpecies', {
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
      species_id: {
        allowNull: false,
        references: {
            model: 'species',
            key: 'id',
            as: 'species_id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        type: Sequelize.INTEGER
      },
      status: { type: Sequelize.STRING, field: 'status' }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('forestSpecies');
  }
};
