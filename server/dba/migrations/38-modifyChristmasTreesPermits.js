'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'christmasTreesPermits';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'add',
        field: 'paygov_token',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'paygov_tracking_id',
        type: Sequelize.STRING
      }
    ];

    return doTransaction(TABLE_NAME, queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'remove',
        field: 'paygov_token'
      },
      {
        operation: 'remove',
        field: 'paygov_tracking_id'
      }
    ];

    return doTransaction(TABLE_NAME, queryInterface, operations);
  }
};
