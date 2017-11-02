'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'tempOutfitterApplications';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'change',
        field: 'temp_outfitter_advertising_desc',
        options: {
          type: Sequelize.STRING(512)
        }
      },
      {
        operation: 'change',
        field: 'temp_outfitter_client_charges',
        options: {
          type: Sequelize.STRING(512),
          allowNull: false
        },
        migrationDefaultValue: '0'
      },
      {
        operation: 'change',
        field: 'temp_outfitter_exp_list',
        options: {
          type: Sequelize.STRING(512)
        }
      },
      {
        operation: 'change',
        field: 'applicant_message',
        options: {
          type: Sequelize.STRING(512)
        }
      },
      {
        operation: 'change',
        field: 'temp_outfitter_exp_all_citation',
        options: {
          type: Sequelize.STRING(512)
        }
      },
      {
        operation: 'change',
        field: 'temp_outfitter_exp_nat_fst_pmts',
        options: {
          type: Sequelize.STRING(512)
        }
      },
      {
        operation: 'change',
        field: 'temp_outfitter_exp_oth_pmts',
        options: {
          type: Sequelize.STRING(512)
        }
      }
    ];
    return doTransaction(TABLE_NAME, queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'change',
        field: 'temp_outfitter_advertising_desc'
      },
      {
        operation: 'change',
        field: 'temp_outfitter_client_charges'
      },
      {
        operation: 'change',
        field: 'temp_outfitter_exp_list'
      },
      {
        operation: 'change',
        field: 'applicant_message'
      },
      {
        operation: 'change',
        field: 'temp_outfitter_exp_all_citation'
      },
      {
        operation: 'change',
        field: 'temp_outfitter_exp_nat_fst_pmts'
      },
      {
        operation: 'change',
        field: 'temp_outfitter_exp_oth_pmts'
      }
    ];
    return doTransaction(TABLE_NAME, queryInterface, operations);
  }
};
