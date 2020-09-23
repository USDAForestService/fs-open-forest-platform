'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'fsForests';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'add',
        field: 'region_name',
        type: Sequelize.STRING(50)
      },
      {
        operation: 'add',
        field: 'forest_code',
        type: Sequelize.STRING(10)
      }
    ];
    return doTransaction(TABLE_NAME, queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'remove',
        field: 'region_name'
      },
      {
        operation: 'remove',
        field: 'forest_code'
      }
    ];
    return doTransaction(TABLE_NAME, queryInterface, operations);
  }
};
