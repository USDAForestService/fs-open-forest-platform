'use strict';

module.exports = function(sequelize, DataTypes) {
  const christmasTreesForestSpecies = sequelize.define('christmas_trees_forest_species',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
        allowNull: false
      },
      forestId: {
        type: DataTypes.INTEGER,
        field: 'forest_id',
        allowNull: false
      },
      speciesId: {
        type: DataTypes.INTEGER,
        field: 'species_id',
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        field: 'status'
      }
    },
    {
      timestamps: false
    });
  return christmasTreesForestSpecies;
};