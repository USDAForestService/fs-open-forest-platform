

/**
 * Module for nrm-service model
 * @module models/nrmservice
 */
const Sequelize = require('sequelize');

const util = require('../services/util.es6');

module.exports = util.getSequelizeConnection().define(
  'nrmEntries',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
      allowNull: false
    },
    permitCn: {
      type: Sequelize.STRING(34),
      field: 'permit_cn',
      allowNull: false
    },
    regionCode: {
      type: Sequelize.STRING(2),
      field: 'region_code',
      allowNull: false
    },
    regionName: {
      type: Sequelize.STRING(80),
      field: 'region_name',
      allowNull: false
    },
    forestCode: {
      type: Sequelize.STRING(2),
      field: 'forest_code',
      allowNull: false
    },
    forestName: {
      type: Sequelize.STRING(80),
      field: 'forest_name',
      allowNull: false
    },
    districtCode: {
      type: Sequelize.STRING(2),
      field: 'district_code',
      allowNull: false
    },
    districtName: {
      type: Sequelize.STRING(80),
      field: 'district_name',
      allowNull: false
    },
    planCn: {
      type: Sequelize.STRING(34),
      field: 'plan_cn',
      allowNull: false
    },
    planNo: {
      type: Sequelize.INTEGER,
      field: 'plan_no',
      allowNull: false
    },
    planDescription: {
      type: Sequelize.STRING(78),
      field: 'plan_description',
      allowNull: false
    },
    issueNumber: {
      type: Sequelize.STRING(50),
      field: 'issue_number',
      allowNull: false
    },
    permUseCode: {
      type: Sequelize.STRING(5),
      field: 'perm_use_code',
      allowNull: false
    },
    percentOfSalvageVolume: {
      type: Sequelize.INTEGER,
      field: 'percent_of_salvage_volume',
      allowNull: false
    },
    percentOfCwk2Volume: {
      type: Sequelize.INTEGER,
      field: 'percent_of_cwk2_volume',
      allowNull: false
    },
    percentOfCflrVolume: {
      type: Sequelize.INTEGER,
      field: 'percent_of_cflr_volume',
      allowNull: false
    },
    percentOfNftmVolume: {
      type: Sequelize.INTEGER,
      field: 'percent_of_nftm_volume',
      allowNull: false
    },
    stateCode: {
      type: Sequelize.STRING(2),
      field: 'state_code',
      allowNull: false
    },
    stateName: {
      type: Sequelize.STRING(40),
      field: 'state_name',
      allowNull: false
    },
    numberOfPermits: {
      type: Sequelize.INTEGER,
      field: 'number_of_permits',
      allowNull: false
    },
    convertibleNonConvertible: {
      type: Sequelize.STRING(1),
      field: 'convertible_non_convertible',
      allowNull: false
    },
    lineItemNumber: {
      type: Sequelize.STRING(10),
      field: 'line_item_number',
      allowNull: false
    },
    speciesCode: {
      type: Sequelize.STRING(40),
      field: 'species_code',
      allowNull: false
    },
    productCode: {
      type: Sequelize.STRING(10),
      field: 'product_code',
      allowNull: false
    },
    uomCode: {
      type: Sequelize.STRING(10),
      field: 'uom_code',
      allowNull: false
    },
    soldQuantity: {
      type: Sequelize.STRING(10),
      field: 'sold_quantity',
      allowNull: false
    },
    rate: {
      type: Sequelize.STRING(10),
      field: 'rate',
      allowNull: false
    },
    yieldComponentCode: {
      type: Sequelize.STRING(10),
      field: 'yield_component_code',
      allowNull: false
    },
    mbfConvFactor: {
      type: Sequelize.STRING(10),
      field: 'mbf_conv_factor',
      allowNull: false
    },
    ccfConFactor: {
      type: Sequelize.STRING(10),
      field: 'ccf_con_factor',
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
      field: 'created'
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
      field: 'updated'
    }
  },
  {
    timestamps: true
  }
);
