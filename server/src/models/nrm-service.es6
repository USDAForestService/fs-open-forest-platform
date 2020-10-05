

/**
 * Module for nrm-service model
 * @module models/nrmservice
 */

module.exports = (sequelize, DataTypes) => sequelize.define(
  'nrmEntries',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
      allowNull: false
    },
    permitCn: {
      type: DataTypes.STRING(50),
      field: 'permit_cn',
      allowNull: false
    },
    regionCode: {
      type: DataTypes.STRING(50),
      field: 'region_code',
      allowNull: false
    },
    regionName: {
      type: DataTypes.STRING(50),
      field: 'region_name',
      allowNull: false
    },
    forestCode: {
      type: DataTypes.STRING(50),
      field: 'forest_code',
      allowNull: false
    },
    forestName: {
      type: DataTypes.STRING(50),
      field: 'forest_name',
      allowNull: false
    },
    districtCode: {
      type: DataTypes.STRING(50),
      field: 'disctict_code',
      allowNull: false
    },
    districtName: {
      type: DataTypes.STRING(50),
      field: 'district_name',
      allowNull: false
    },
    planCn: {
      type: DataTypes.STRING(50),
      field: 'plan_cn',
      allowNull: false
    },
    planNo: {
      type: DataTypes.INTEGER,
      field: 'plan_no',
      allowNull: false
    },
    planDescription: {
      type: DataTypes.STRING(50),
      field: 'plan_description',
      allowNull: false
    },
    issueNumber: {
      type: DataTypes.STRING(50),
      field: 'issue_number',
      allowNull: false
    },
    permUseCode: {
      type: DataTypes.STRING(50),
      field: 'perm_use_code',
      allowNull: false
    },
    percentOfSalvageVolume: {
      type: DataTypes.INTEGER,
      field: 'percent_of_salvage_volume',
      allowNull: false
    },
    percentOfCwk2Volume: {
      type: DataTypes.INTEGER,
      field: 'percent_of_cwk2_volume',
      allowNull: false
    },
    percentOfCflrVolume: {
      type: DataTypes.INTEGER,
      field: 'percent_of_cflr_volume',
      allowNull: false
    },
    percentOfNftmVolume: {
      type: DataTypes.INTEGER,
      field: 'percent_of_nftm_volume',
      allowNull: false
    },
    stateCode: {
      type: DataTypes.STRING(50),
      field: 'state_code',
      allowNull: false
    },
    stateName: {
      type: DataTypes.STRING(50),
      field: 'state_name',
      allowNull: false
    },
    numberOfPermits: {
      type: DataTypes.INTEGER,
      field: 'number_of_permits',
      allowNull: false
    },
    convertibleNonConvertible: {
      type: DataTypes.STRING(50),
      field: 'convertible_non_convertible',
      allowNull: false
    },
    spuInfo: {
      type: DataTypes.JSONB,
      field: 'spu_info',
      allowNull: false
    },
    createdAt: {
      type: sequelize.DATE, defaultValue: sequelize.NOW, allowNull: false, field: 'created'
    },
    updatedAt: {
      type: sequelize.DATE, defaultValue: sequelize.NOW, allowNull: false, field: 'updated'
    }
  },
  {
    timestamps: true
  }
);
