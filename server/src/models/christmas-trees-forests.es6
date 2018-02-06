'use strict';

const moment = require('moment-timezone');
const util = require('../util.es6');

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

  christmasTreesForests.addHook('afterFind', (forest) => {
    if (!util.isProduction()) {
      if (forest) {
        // forest is closed and configured
        if (forest.id === 1) {
          forest.startDate = moment().tz(forest.timezone).add(6, 'months').format('YYYY-MM-DD HH:mm:ss');
          forest.endDate = moment().tz(forest.timezone).add(8, 'months').format('YYYY-MM-DD HH:mm:ss');
        }
        // open forest is Mt Hood
        if (forest.id === 3) {
          forest.startDate = moment().tz(forest.timezone).subtract(2, 'months').format('YYYY-MM-DD HH:mm:ss');
          forest.endDate = moment().tz(forest.timezone).add(1, 'months').format('YYYY-MM-DD HH:mm:ss');
        }
        // closed forest with nothing configured yet is Shoshone
        if (forest.id === 4) {
          forest.startDate = moment().tz(forest.timezone).subtract(2, 'years').format('YYYY-MM-DD HH:mm:ss');
          forest.endDate = moment().tz(forest.timezone).subtract(1, 'years').format('YYYY-MM-DD HH:mm:ss');
        }
      }
    }
  });

  return christmasTreesForests;
};
