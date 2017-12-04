'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'christmasTreesForests';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'add',
        field: 'tree_cost',
        type: Sequelize.NUMERIC(8,2)
      },
      {
        operation: 'add',
        field: 'max_num_trees',
        type: Sequelize.INTEGER
      }
    ];
    return doTransaction(TABLE_NAME, queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'remove',
        field: 'tree_cost'
      },
      {
        operation: 'remove',
        field: 'max_num_trees'
      }
    ];
    return doTransaction(TABLE_NAME, queryInterface, operations);
  }
};
