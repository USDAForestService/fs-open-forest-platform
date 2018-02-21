'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'christmasTreesPermits';
const SEQUENCE_NAME = 'public.christmasTreesPermits_permit_number_seq';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'raw',
        query: 'CREATE SEQUENCE ' + SEQUENCE_NAME + ' START 1 MAXVALUE 99999999'
      },
      {
        operation: 'raw',
        query:
          'ALTER TABLE "' +
          TABLE_NAME +
          '" ALTER COLUMN permit_number SET DEFAULT nextval(\'' +
          SEQUENCE_NAME +
          "'::regclass)"
      }
    ];

    return doTransaction('', queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'raw',
        query: 'ALTER TABLE "' + TABLE_NAME + '" ALTER COLUMN permit_number DROP DEFAULT'
      },
      {
        operation: 'raw',
        query: 'DROP SEQUENCE ' + SEQUENCE_NAME
      }
    ];

    return doTransaction('', queryInterface, operations);
  }
};
