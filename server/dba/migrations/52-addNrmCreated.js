'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'nrmEntries';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'add',
        field: 'created',
        type: Sequelize.DATE
      },
      {
        operation: 'add',
        field: 'updated',
        type: Sequelize.DATE
      }
    ];
    return doTransaction(TABLE_NAME, queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'remove',
        field: 'created'
      },
      {
        operation: 'remove',
        field: 'updated'
      }
    ];
    return doTransaction(TABLE_NAME, queryInterface, operations);
  }
};
