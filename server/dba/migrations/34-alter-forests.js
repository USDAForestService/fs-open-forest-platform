'use strict';

let doTransaction = require('./modules/transaction');


const TABLE_NAME = 'christmas_trees_forests';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'add',
        field: 'forest_abbr',
        type: Sequelize.STRING
      },
	  ]
    return doTransaction(TABLE_NAME, queryInterface, operations);
	},

	down: function (queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'remove',
        field: 'forest_abbr'
      },
    ]
    return doTransaction(TABLE_NAME, queryInterface, operations);
	}
};