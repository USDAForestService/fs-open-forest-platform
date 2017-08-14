'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'tempOutfitterApplications';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_pty_size',
        options: { type: Sequelize.STRING, allowNull: false },
        migrationDefaultValue: '0'
      }
    ];
    return doTransaction(TABLE_NAME, queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_pty_size'
      }
    ];
    return doTransaction(TABLE_NAME, queryInterface, operations);
  }
};
