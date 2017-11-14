'use strict';

module.exports = function(sequelize, DataTypes) {
  const christmasTreesForests =  sequelize.define('christmas_trees_forests',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
        allowNull: false
      },
      forestName: {
        type: DataTypes.STRING(50),
        field: 'forest_name',
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(1000),
        field: 'description'
      },
      forestAbbr: {
        type: DataTypes.STRING(255),
        field: 'forest_abbr'
      },
      forestUrl: {
        type: DataTypes.STRING,
        field: 'forest_url'
      },
      treeHeight: {
        type: DataTypes.INTEGER,
        field: 'tree_height'
      },
      stumpHeight: {
        type: DataTypes.INTEGER,
        field: 'stump_height'
      },
      stumpDiameter: {
        type: DataTypes.INTEGER,
        field: 'stump_diameter'
      },
      startDate: {
        type: DataTypes.DATE,
        field: 'start_date',
        allowNull: false
      },
      endDate: {
        type: DataTypes.DATE,
        field: 'end_date',
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created',
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated',
        allowNull: false
      }
    },
    {
      timestamps: true
    });
  return christmasTreesForests;
};
