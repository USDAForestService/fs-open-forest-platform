'use strict';

let Promise = require('bluebird');

let doTransaction = (tableName, queryInterface, operations) => {
  return queryInterface.sequelize.transaction( (trx) => {
    return Promise.each(operations, (operation) => {
      if (operation.operation === 'add') {
        return queryInterface.addColumn(tableName, operation.field, {type: operation.type}, {transaction: trx});
      } else if (operation.operation === 'remove') {
        return queryInterface.removeColumn(tableName, operation.field, {transaction: trx});
      } else if (operation.operation === 'rename') {
        return queryInterface.renameColumn(tableName, operation.field, operation.newField, {transaction: trx});
      } else if (operation.operation === 'change') {
        return queryInterface.changeColumn(tableName, operation.field, operation.options, {transaction: trx});
      } else if (operation.operation === 'raw') {
        return queryInterface.sequelize.query(operation.query, { type: queryInterface.sequelize.QueryTypes.RAW, transaction: trx });
      }
    });
  });
}

module.exports = doTransaction;
