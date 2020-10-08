'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'fsForests';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'add',
        field: 'districts',
        type: Sequelize.JSONB
      }

    ];
    return doTransaction(TABLE_NAME, queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {
    let operations = [
        {
          operation: 'remove',
          field: 'districts'
        },
    ];
    return doTransaction(TABLE_NAME, queryInterface, operations);
  }
};

