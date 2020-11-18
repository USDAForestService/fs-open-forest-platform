'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('nrmEntries', {

      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        allowNull: false,
        primaryKey: true,
        field: 'id'
      },
      permitCn: { type: Sequelize.STRING(34), field: 'permit_cn' },
      regionName: { type: Sequelize.STRING(80), field: 'region_name' },
      regionCode: { type: Sequelize.STRING(2), field: 'region_code' },
      forestName: { type: Sequelize.STRING(80), field: 'forest_name' },
      forestCode: { type: Sequelize.STRING(2), field: 'forest_code' },
      districtCode: { type: Sequelize.STRING(2), field: 'district_code' },
      districtName: { type: Sequelize.STRING(80), field: 'district_name' },
      planCn: { type: Sequelize.STRING(34), field: 'plan_cn' },
      planNo: { type: Sequelize.INTEGER, field: 'plan_no' },
      planDescription: { type: Sequelize.STRING(78), field: 'plan_description' },
      issueNumber: { type: Sequelize.STRING(50), field: 'issue_number' },
      issueDate: { type: Sequelize.DATE, field: 'issue_date' },
      permUseCode: { type: Sequelize.STRING(5), field: 'perm_use_code' },
      percentOfSalvageVolume: { type: Sequelize.INTEGER, field: 'percent_of_salvage_volume' },
      percentOfCwk2Volume: { type: Sequelize.INTEGER, field: 'percent_of_cwk2_volume' },
      percentOfCflrVolume: { type: Sequelize.INTEGER, field: 'percent_of_cflr_volume' },
      percentOfNftmVolume: { type: Sequelize.INTEGER, field: 'percent_of_nftm_volume' },
      stateCode: { type: Sequelize.STRING(2), field: 'state_code' },
      stateName: { type: Sequelize.STRING(40), field: 'state_name' },
      numberOfPermits: { type: Sequelize.INTEGER, field: 'number_of_permits' },
      convertibleNonConvertible: { type: Sequelize.STRING(1), field: 'convertible_non_convertible' },
      spuInfo: { type: Sequelize.JSONB, field: 'spu_info' },

    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('nrmEntries');
  }
};
