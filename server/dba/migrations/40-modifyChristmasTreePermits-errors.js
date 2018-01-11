'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'christmasTreesPermits';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'add',
        field: 'paygov_error',
        type: Sequelize.STRING(500)
      }
    ];

    return doTransaction(TABLE_NAME, queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'remove',
        field: 'paygov_error'
      }
    ];

    return doTransaction(TABLE_NAME, queryInterface, operations);
  }
};
