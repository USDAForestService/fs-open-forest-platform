'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'tempOutfitterApplications';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'add',
        field: 'temp_out_act_desc_serv_pty_size',
        type: Sequelize.INTEGER,
        migrationDefaultValue: 0,
        allowNull: false
      },
      {
        operation: 'add',
        field: 'temp_outfitter_exp_all_citation',
        type: Sequelize.STRING,
        allowNull: true
      },
      {
        operation: 'add',
        field: 'temp_outfitter_exp_nat_fst_pmts',
        type: Sequelize.STRING,
        allowNull: true
      },
      {
        operation: 'add',
        field: 'temp_outfitter_exp_oth_pmts',
        type: Sequelize.STRING,
        allowNull: true
      }
    ];

    return doTransaction(TABLE_NAME, queryInterface, operations);
  },
  down: function(queryInterface) {
    let operations = [
      {
        operation: 'remove',
        field: 'temp_out_act_desc_serv_pty_size'
      },
      {
        operation: 'remove',
        field: 'temp_outfitter_exp_all_citation'
      },
      {
        operation: 'remove',
        field: 'temp_outfitter_exp_nat_fst_pmts'
      },
      {
        operation: 'remove',
        field: 'temp_outfitter_exp_oth_pmts'
      }
    ];

    return doTransaction(TABLE_NAME, queryInterface, operations);
  }
};
