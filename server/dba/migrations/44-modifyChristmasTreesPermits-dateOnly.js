'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'christmasTreesPermits';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'change',
        field: 'permit_expire_date',
        options: {
          type: Sequelize.DATEONLY
        }
      }
    ];

    return doTransaction(TABLE_NAME, queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'change',
        field: 'permit_expire_date',
        options: {
          type: Sequelize.DATE
        }
      }
    ];

    return doTransaction(TABLE_NAME, queryInterface, operations);
  }
};
