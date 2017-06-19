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
        operation: 'remove',
        field: 'noncomm_fields_start_month'
      },
      {
        operation: 'remove',
        field: 'noncomm_fields_start_day'
      },
      {
        operation: 'remove',
        field: 'noncomm_fields_start_year',
      },
      {
        operation: 'remove',
        field: 'noncomm_fields_end_month',
      },
      {
        operation: 'remove',
        field: 'noncomm_fields_end_day',
      },
      {
        operation: 'remove',
        field: 'noncomm_fields_end_year',
      },
      {
        operation: 'remove',
        field: 'noncomm_fields_start_hour',
      },
      {
        operation: 'remove',
        field: 'noncomm_fields_start_minutes',
      },
      {
        operation: 'remove',
        field: 'noncomm_fields_start_period',
      },
      {
        operation: 'remove',
        field: 'noncomm_fields_end_hour',
      },
      {
        operation: 'remove',
        field: 'noncomm_fields_end_minutes',
      },
      {
        operation: 'remove',
        field: 'noncomm_fields_end_period',
      }
    ];

    return doTransaction(queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {

    let operations = [
      {
        operation: 'add',
        field: 'noncomm_fields_start_month',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'noncomm_fields_start_day',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'noncomm_fields_start_year',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'noncomm_fields_end_month',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'noncomm_fields_end_day',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'noncomm_fields_end_year',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'noncomm_fields_start_hour',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'noncomm_fields_start_minutes',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'noncomm_fields_start_period',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'noncomm_fields_end_hour',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'noncomm_fields_end_minutes',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'noncomm_fields_end_period',
        type: Sequelize.STRING
      }
    ];

    return doTransaction(queryInterface, operations);
  }
};
