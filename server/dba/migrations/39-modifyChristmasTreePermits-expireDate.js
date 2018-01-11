'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'christmasTreesPermits';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'add',
        field: 'permit_expire_date',
        type: Sequelize.DATE
      }
    ];

    return doTransaction(TABLE_NAME, queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'remove',
        field: 'permit_expire_date'
      }
    ];

    return doTransaction(TABLE_NAME, queryInterface, operations);
  }
};
