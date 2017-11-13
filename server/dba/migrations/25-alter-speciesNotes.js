'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'speciesNotes';

module.exports = {
	up: function (queryInterface, Sequelize) {
		let operations = [
			{
			  operation: 'add',
			  field: 'display_order',
			  type: Sequelize.INTEGER,
			  allowNull: false,
			  migrationDefaultValue: '1'
			}
		];
		return doTransaction(TABLE_NAME, queryInterface, operations);
	},

	down: function (queryInterface, Sequelize) {
		let operations = [
			{
			  operation: 'remove',
			  field: 'display_order'
			}
		];
		return doTransaction(TABLE_NAME, queryInterface, operations);
	}
};