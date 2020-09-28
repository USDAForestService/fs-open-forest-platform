'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'firewoodPermits';

module.exports = {
    up: function(queryInterface, Sequelize) {
        let operations = [
            {
                operation: 'add',
                field: 'min_cost',
                type: Sequelize.INTEGER
            }
        ];

        return doTransaction(TABLE_NAME, queryInterface, operations);
    },
    down: function(queryInterface, Sequelize) {
        let operations = [
            {
                operation: 'remove',
                field: 'min_cost'
            }
        ];

        return doTransaction(TABLE_NAME, queryInterface, operations);
    }
};