'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'christmasTreesPermits';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'add',
        field: 'permit_issue_date',
        type: Sequelize.STRING(50)
      }
    ];

    return doTransaction(TABLE_NAME, queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'remove',
        field: 'permit_issue_date'
      }
    ];

    return doTransaction(TABLE_NAME, queryInterface, operations);
  }
};
