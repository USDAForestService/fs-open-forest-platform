'use strict';

let Promise = require('bluebird');


let doTransaction = (tableName, queryInterface, operations) => {
  return queryInterface.sequelize.transaction( (trx) => {

    return Promise.each(moreOperations, (operation) => {
      operation.transaction = trx;
      switch (operation.operation) {
        case 'add': {
          return queryInterface.addColumn(tableName, operation.field, {type: operation.type}, {transaction: trx});
        }
        case 'remove': {
          return queryInterface.removeColumn(tableName, operation.field, {transaction: trx});
        }
        case 'rename': {
          return queryInterface.renameColumn(tableName, operation.field, operation.newField, {transaction: trx});
        }
        case 'change': {
          return queryInterface.changeColumn(tableName, operation.field, operation.options, {transaction: trx});
        }
        case 'raw': {
          return queryInterface.sequelize.query(operation.query, { type: queryInterface.sequelize.QueryTypes.RAW, transaction: trx });
        }
        default: {
          return "missing operation type eg: add, change, rename, ...";
        }
      }
    });

  });
}

module.exports = doTransaction;
