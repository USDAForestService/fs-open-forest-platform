'use strict';

let Promise = require('bluebird');

const TABLE_NAME = 'noncommercialApplications';

// alter column sizes and types
// remove phone type

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
        operation: 'change',
        field: 'appl_info_pri_mailing_state',
        options: { type: Sequelize.STRING(2), allowNull: true }
      },
      {
        operation: 'change',
        field: 'appl_info_pri_mailing_zip',
        options: { type: Sequelize.STRING(5), allowNull: true }
      },
      {
        operation: 'change',
        field: 'appl_info_pri_mailing_address',
        options: { type: Sequelize.STRING, allowNull: true }
      },
      {
        operation: 'change',
        field: 'appl_info_pri_mailing_city',
        options: { type: Sequelize.STRING, allowNull: true }
      },
      {
        operation: 'change',
        field: 'noncomm_fields_activity_descr',
        options: { type: Sequelize.STRING(512), allowNull: false }
      }
    ];

    return doTransaction(queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {

    let operations = [
      {
        operation: 'change',
        field: 'appl_info_pri_mailing_state',
        options: { type: Sequelize.STRING(2), allowNull: false }
      },
      {
        operation: 'change',
        field: 'appl_info_pri_mailing_zip',
        options: { type: Sequelize.STRING(5), allowNull: false }
      },
      {
        operation: 'change',
        field: 'appl_info_pri_mailing_address',
        options: { type: Sequelize.STRING, allowNull: false }
      },
      {
        operation: 'change',
        field: 'appl_info_pri_mailing_city',
        options: { type: Sequelize.STRING, allowNull: false }
      },
      {
        operation: 'change',
        field: 'noncomm_fields_activity_descr',
        options: { type: Sequelize.STRING, allowNull: false }
      }
    ];

    return doTransaction(queryInterface, operations);
  }
};
