'use strict';

let doTransaction = require('./modules/transaction');


const TABLE_NAME = 'christmas_trees_forest_locations';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'raw',
        query: 'ALTER TABLE "' + TABLE_NAME + '" ALTER COLUMN "description" TYPE text'
      }
	  ]
    return doTransaction(TABLE_NAME, queryInterface, operations);
	},

	down: function (queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'raw',
        query: 'ALTER TABLE "' + TABLE_NAME + '" ALTER COLUMN "description" TYPE varchar(255) USING description::varchar'
      }
    ]
    return doTransaction(TABLE_NAME, queryInterface, operations);
	}
};