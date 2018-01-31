'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'christmasTreesForests';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'change',
        field: 'start_date',
        options: {
          type: Sequelize.DATEONLY
        }
      },
      {
        operation: 'change',
        field: 'end_date',
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
        field: 'start_date',
        options: {
          type: Sequelize.DATE
        }
      },
      {
        operation: 'change',
        field: 'end_date',
        options: {
          type: Sequelize.DATE
        }
      }
    ];

    return doTransaction(TABLE_NAME, queryInterface, operations);
  }
};
