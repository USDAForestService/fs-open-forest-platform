'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'christmasTreesForests';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'remove',
        field: 'cutting_areas'
      },
      {
        operation: 'add',
        field: 'cutting_areas',
        type: Sequelize.JSONB
      }

    ];
    return doTransaction(TABLE_NAME, queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'remove',
        field: 'cutting_areas'
      },
      {
        operation: 'add',
        field: 'cutting_areas',
        type: Sequelize.STRING(500)
      }
    ];
    return doTransaction(TABLE_NAME, queryInterface, operations);
  }
};
