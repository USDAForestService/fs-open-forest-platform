'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'feedbackEntries';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'change',
        field: 'message',
        options: { type: Sequelize.STRING(1000), allowNull: false },
        migrationDefaultValue: '0'
      }
    ];
    return doTransaction(TABLE_NAME, queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'change',
        field: 'message'
      }
    ];
    return doTransaction(TABLE_NAME, queryInterface, operations);
  }
};
