'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'forests';

module.exports = {
	up: function (queryInterface, Sequelize) {
		let operations = [
			{
			  operation: 'add',
			  field: 'org_structure_code',
			  type: Sequelize.STRING(50)
			}
		];
		return doTransaction(TABLE_NAME, queryInterface, operations);
	},

	down: function (queryInterface, Sequelize) {
		let operations = [
			{
			  operation: 'remove',
			  field: 'org_structure_code'
			}
		];
		return doTransaction(TABLE_NAME, queryInterface, operations);
	}
};