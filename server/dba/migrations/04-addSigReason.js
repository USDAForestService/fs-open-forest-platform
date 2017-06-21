'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'noncommercialApplications';


module.exports = {
  up: function(queryInterface, Sequelize) {

    let operations = [
      {
        operation: 'add',
        field: 'signature',
        type: Sequelize.STRING(3)
      },
      {
        operation: 'add',
        field: 'reason_for_return',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'noncomm_fields_spectator_count',
        type: Sequelize.STRING
      }
    ];

    return doTransaction(TABLE_NAME, queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {

    let operations = [
      {
        operation: 'remove',
        field: 'signature'
      },
      {
        operation: 'remove',
        field: 'reason_for_return'
      },
      {
        operation: 'remove',
        field: 'noncomm_fields_spectator_count'
      }
    ];

    return doTransaction(TABLE_NAME, queryInterface, operations);
  }
};
