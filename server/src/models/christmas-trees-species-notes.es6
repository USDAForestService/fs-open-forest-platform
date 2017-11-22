'use strict';

module.exports = function(sequelize, DataTypes) {
  const speciesNotes =  sequelize.define('speciesNotes',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
        allowNull: false
      },
      speciesId: {
        type: DataTypes.INTEGER,
        field: 'species_id',
        allowNull: false
      },
      note: {
        type: DataTypes.STRING,
        field: 'note'
      },
      displayOrder: {
        type: DataTypes.INTEGER,
        field: 'display_order'
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    });
  return speciesNotes;
};
