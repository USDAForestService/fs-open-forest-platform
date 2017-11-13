'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'forestLocations';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'renameTable',
        newTableName: 'christmas_trees_forest_locations'
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
    return doTransaction('christmas_trees_forest_locations', queryInterface, operations);
  }
};
