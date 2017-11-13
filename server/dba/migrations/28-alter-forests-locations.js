'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'forestLocations';

module.exports = {
	up: function (queryInterface, Sequelize) {
		let operations = [
			{
			  operation: 'add',
			  field: 'image_filename',
			  type: Sequelize.STRING(100)
			}
		];
		return doTransaction(TABLE_NAME, queryInterface, operations);
	},

	down: function (queryInterface, Sequelize) {
		let operations = [
			{
			  operation: 'remove',
			  field: 'image_filename'
			}
		];
		return doTransaction(TABLE_NAME, queryInterface, operations);
	}
};
