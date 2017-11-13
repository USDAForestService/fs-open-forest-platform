'use strict';

module.exports = function(sequelize, DataTypes) {
  const christmasTreesForestLocations = sequelize.define('christmasTreesForestLocations',
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
      district: {
        type: DataTypes.STRING,
        field: 'district'
      },
      allowed: {
        type: DataTypes.BOOLEAN,
        field: 'allowed'
      },
      type: {
        type: DataTypes.STRING,
        field: 'type'
      },
      description: {
        type: DataTypes.TEXT,
        field: 'description'
      },
      imageFilename: {
        type: DataTypes.STRING,
        field: 'image_filename'
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    });
  return christmasTreesForestLocations;
};
