'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('speciesNotes', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id' },
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
      note: { type: Sequelize.STRING, allowNull: false, field: 'note' }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('speciesNotes');
  }
};
