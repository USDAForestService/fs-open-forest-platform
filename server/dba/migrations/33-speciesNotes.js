'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('speciesNotes', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id' },
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
      note: { type: Sequelize.STRING, allowNull: false, field: 'note' },
      displayOrder: { type: Sequelize.INTEGER, allowNull: false, field: 'display_order', defaultValue: 1 }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('speciesNotes');
  }
};
