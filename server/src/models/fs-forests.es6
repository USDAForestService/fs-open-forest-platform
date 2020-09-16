/**
 * Module for fs forests model
 * @module models/fs-forests
 */
module.exports = (sequelize, DataTypes) => sequelize.define(
  'fsForests',
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
    woodCost: {
      type: DataTypes.DOUBLE,
      field: 'wood_cost',
      validate: {
        min: 0
      }
    },
    minCords: {
      type: DataTypes.INTEGER,
      field: 'min_cords',
      validate: {
        min: 0
      }
    },
    maxCords: {
      type: DataTypes.INTEGER,
      field: 'max_cords',
      validate: {
        min: 0
      }
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
    },
    cuttingAreas: {
      type: DataTypes.JSONB,
      field: 'cutting_areas'
    },
    mapLinks: {
      type: DataTypes.JSONB,
      field: 'map_links'
    },
    contact: {
      type: DataTypes.JSONB,
      field: 'contact'
    },
    possId: {
      type: DataTypes.STRING(50),
      field: 'poss_financial_id'
    },
    state: {
      type: DataTypes.STRING(50),
      field: 'state'
    },
    stateFips: {
      type: DataTypes.STRING(10),
      field: 'state_fips'
    },
    region: {
      type: DataTypes.INTEGER,
      field: 'region'
    },
    permitType: {
      type: DataTypes.INTEGER,
      field: 'permit_type'
    }
  },
  {
    timestamps: true,
    freezeTableName: true
  }
);
