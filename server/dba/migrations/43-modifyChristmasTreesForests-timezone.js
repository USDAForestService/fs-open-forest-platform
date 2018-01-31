'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'christmasTreesForests';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'add',
        field: 'timezone',
        type: Sequelize.STRING(50)
      }
    ];

    return doTransaction(TABLE_NAME, queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'remove',
        field: 'timezone'
      }
    ];

    return doTransaction(TABLE_NAME, queryInterface, operations);
  }
};
