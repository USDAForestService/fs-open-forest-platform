'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'christmasTreesForests';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'add',
        field: 'cutting_areas',
        type: Sequelize.STRING(500)
      }
    ];
    return doTransaction(TABLE_NAME, queryInterface, operations);
  },
  down: function(queryInterface) {
    let operations = [
      {
        operation: 'remove',
        field: 'cutting_areas'
      }
    ];
    return doTransaction(TABLE_NAME, queryInterface, operations);
  }
};
