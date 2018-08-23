'use strict';

let doTransaction = require('./modules/transaction');

const NONCOMERICIAL_TABLE_NAME = 'noncommercialApplications';
const TEMP_OUTFITTER_TABLE_NAME = 'tempOutfitterApplications';
const SEQUENCE_NAME = 'public.special_use_application_id_seq';

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
          NONCOMERICIAL_TABLE_NAME +
          '" ALTER COLUMN application_id SET DEFAULT nextval(\'' +
          SEQUENCE_NAME +
          "'::regclass)"
      },
      {
        operation: 'raw',
        query:
            'ALTER TABLE "' +
            TEMP_OUTFITTER_TABLE_NAME +
            '" ALTER COLUMN application_id SET DEFAULT nextval(\'' +
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
        query: 'ALTER TABLE "' + NONCOMERICIAL_TABLE_NAME + '" ALTER COLUMN application_id DROP DEFAULT'
      },
      {
        operation: 'raw',
        query: 'ALTER TABLE "' + TEMP_OUTFITTER_TABLE_NAME + '" ALTER COLUMN application_id DROP DEFAULT'
      },
      {
        operation: 'raw',
        query: 'DROP SEQUENCE ' + SEQUENCE_NAME
      }
    ];

    return doTransaction('', queryInterface, operations);
  }
};
