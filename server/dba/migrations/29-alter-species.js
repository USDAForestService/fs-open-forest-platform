'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'species';

module.exports = {
	up: function (queryInterface, Sequelize) {
		let operations = [
			{
			  operation: 'remove',
			  field: 'photos'
			}
		];
		return doTransaction(TABLE_NAME, queryInterface, operations);
	},

	down: function (queryInterface, Sequelize) {
    let operations = [
			{
			  operation: 'add',
			  field: 'photos',
			  type: Sequelize.BLOB
			}
		];
		return doTransaction(TABLE_NAME, queryInterface, operations);
	}
};
