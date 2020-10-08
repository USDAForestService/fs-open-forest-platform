'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'fsForests';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'add',
        field: 'state_fips',
        type: Sequelize.STRING(10)
      }
    ];
    return doTransaction(TABLE_NAME, queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'remove',
        field: 'state_fips'
      }
    ];
    return doTransaction(TABLE_NAME, queryInterface, operations);
  }
};