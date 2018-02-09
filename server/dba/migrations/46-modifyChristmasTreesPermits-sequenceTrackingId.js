'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'christmasTreesPermits';
const SEQUENCE_NAME = 'christmasTreesPermits_agency_tracking_seq';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'raw',
        query: 'CREATE SEQUENCE ' + SEQUENCE_NAME + ' START 10000000 MAXVALUE 99999999'
      },
      {
        operation: 'raw',
        query:
          'ALTER TABLE "' +
          TABLE_NAME +
          '" ADD permit_tracking_id integer NOT NULL DEFAULT nextval(\'' +
          SEQUENCE_NAME +
          "'::regclass)"
      }
    ];

    return doTransaction(TABLE_NAME, queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'remove',
        field: 'permit_tracking_id'
      },
      {
        operation: 'raw',
        query: 'DROP SEQUENCE ' + SEQUENCE_NAME
      }
    ];

    return doTransaction(TABLE_NAME, queryInterface, operations);
  }
};
