'use strict';

let Promise = require('bluebird');


let doTransaction = (tableName, queryInterface, operations) => {
  return queryInterface.sequelize.transaction( (trx) => {

    let moreOperations = addPreparations(tableName, operations);

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
            return 'ERROR: missing operation type eg: add, change, rename, ...';
          }
      }
    });

  });
};


let addPreparations = (tableName, operations) => {
  let moreOperations = [];
  for (let operation of operations) {
    switch (operation.operation) {
        case 'add': {
          break;
        }
        case 'remove': {
          break;
        }
        case 'rename': {
          break;
        }
        case 'change': {
          if ( ! operation.options.allowNull ) {
            moreOperations.push( changeNotNull(tableName, operation) );
          }
          // binary undefined I presume for now means string value rather than number
          if (operation.options.type.options.length && operation.options.type.options.binary === undefined) {
            moreOperations.push( changeStringLength(tableName, operation) );
          }
          break;
        }
        case 'raw': {
          break;
        }
        default: {
          return 'ERROR: missing operation type eg: add, change, rename, ...';
        }
    }
    moreOperations.push(operation);
  }
  return moreOperations;
};


let changeNotNull =  (table, operation) => {
  let field   = operation.field;
  let value   = operation.options.defaultValue;
  let options = {transaction: operation.transaction};

  if (value===undefined) {
    return 'ERROR: options.defaultValue is required when setting allowNull to false';
  }

  return {
    operation: 'raw',
    query: ' update "' +table+ '" '
    + ' set "' +field+ '" = \'' +value+ "'"
    + ' where "' +field+ '" is null', options
  };
};


let changeStringLength = (table, operation) => {
  let field   = operation.field;
  let length  = operation.options.type.options.length;
  let options = {transaction: operation.transaction};

  return {
    operation: 'raw',
    query:  ' update "' +table+ '" '
    + ' set "' +field+ '" = substring("' +field+ '" from 1 for ' +length+ ') '
    + ' where length("'+field+'") <' +length, options
  };
};


module.exports = doTransaction;
