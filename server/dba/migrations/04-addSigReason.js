'use strict';

let Promise = require('bluebird');

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

    return Promise.each(operations, (operation) => {
      if (operation.operation === 'add') {
        return queryInterface.addColumn(TABLE_NAME, operation.field, {type: operation.type});
      } else if (operation.operation === 'remove') {
        return queryInterface.removeColumn(TABLE_NAME, operation.field);
      } else if (operation.operation === 'rename') {
        return queryInterface.renameColumn(TABLE_NAME, operation.field, operation.newField);
      }
    });

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

    return Promise.each(operations, (operation) => {
      if (operation.operation === 'add') {
        return queryInterface.addColumn(TABLE_NAME, operation.field, {type: operation.type});
      } else if (operation.operation === 'remove') {
        return queryInterface.removeColumn(TABLE_NAME, operation.field);
      } else if (operation.operation === 'rename') {
        return queryInterface.renameColumn(TABLE_NAME, operation.field, operation.newField);
      }
    });
  }
};
