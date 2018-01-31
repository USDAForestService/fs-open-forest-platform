'use strict';

module.exports = function(sequelize, DataTypes) {
  const christmasTreesForests = sequelize.define(
    'christmasTreesForests',
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
        type: DataTypes.TEXT,
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
      orgStructureCode: {
        type: DataTypes.STRING,
        field: 'org_structure_code'
      },
      treeCost: {
        type: DataTypes.DOUBLE,
        field: 'tree_cost'
      },
      maxNumTrees: {
        type: DataTypes.INTEGER,
        field: 'max_num_trees'
      },
      allowAdditionalHeight: {
        type: DataTypes.BOOLEAN,
        field: 'allow_additional_height'
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
      },
      forestNameShort: {
        type: DataTypes.STRING,
        field: 'forest_name_short'
      },
      timezone: {
        type: DataTypes.STRING,
        field: 'timezone'
      }
    },
    {
      timestamps: true,
      freezeTableName: true
    }
  );
  return christmasTreesForests;
};
