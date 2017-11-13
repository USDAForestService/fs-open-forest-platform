'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'forestSpecies';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'renameTable',
        newTableName: 'christmasTreesForestSpecies'
      }
    ];
    return doTransaction(TABLE_NAME, queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'renameTable',
        newTableName: TABLE_NAME
      }
    ];
    return doTransaction('christmasTreesForestSpecies', queryInterface, operations);
  }
};
