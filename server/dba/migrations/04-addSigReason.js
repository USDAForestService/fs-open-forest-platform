'use strict';

let Promise = require('bluebird');

const TABLE_NAME = 'noncommercialApplications';

let doTransaction = (queryInterface, operations) => {
  return queryInterface.sequelize.transaction( (trx) => {
    return Promise.each(operations, (operation) => {
      if (operation.operation === 'add') {
        return queryInterface.addColumn(TABLE_NAME, operation.field, {type: operation.type}, {transaction: trx});
      } else if (operation.operation === 'remove') {
        return queryInterface.removeColumn(TABLE_NAME, operation.field, {transaction: trx});
      } else if (operation.operation === 'rename') {
        return queryInterface.renameColumn(TABLE_NAME, operation.field, operation.newField, {transaction: trx});
      } else if (operation.operation === 'change') {
        return queryInterface.changeColumn(TABLE_NAME, operation.field, operation.options, {transaction: trx});
      } else if (operation.operation === 'raw') {
        return queryInterface.sequelize.query(operation.query, { type: queryInterface.sequelize.QueryTypes.RAW, transaction: trx });
      }
    });
  });
};

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

    return doTransaction(queryInterface, operations);
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

    return doTransaction(queryInterface, operations);
  }
};
