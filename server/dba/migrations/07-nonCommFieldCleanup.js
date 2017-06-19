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
        operation: 'add',
        field: 'applicant_info_day_phone_ext',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'applicant_info_eve_phone_ext',
        type: Sequelize.STRING
      },
      {
        operation: 'change',
        field: 'applicant_info_org_mail_state',
        options: { type: Sequelize.STRING(2) }
      },
      {
        operation: 'change',
        field: 'appl_info_pri_mailing_state',
        options: { type: Sequelize.STRING(2), allowNull: false }
      },
      {
        operation: 'change',
        field: 'appl_info_sec_mailing_state',
        options: { type: Sequelize.STRING(2) }
      },
      {
        operation: 'change',
        field: 'applicant_info_org_mailing_zip',
        options: { type: Sequelize.STRING(5) }
      },
      {
        operation: 'change',
        field: 'appl_info_pri_mailing_zip',
        options: { type: Sequelize.STRING(5), allowNull: false }
      },
      {
        operation: 'change',
        field: 'appl_info_sec_mailing_zip',
        options: { type: Sequelize.STRING(5) }
      },
      {
        operation: 'change',
        field: 'applicant_info_day_phone_areacd',
        options: { type: Sequelize.STRING(3), allowNull: false }
      },
      {
        operation: 'change',
        field: 'applicant_info_eve_phone_areacd',
        options: { type: Sequelize.STRING(3) }
      },
      {
        operation: 'change',
        field: 'applicant_info_day_phone_prefix',
        options: { type: Sequelize.STRING(3), allowNull: false }
      },
      {
        operation: 'change',
        field: 'applicant_info_eve_phone_prefix',
        options: { type: Sequelize.STRING(3) }
      },
      {
        operation: 'change',
        field: 'applicant_info_day_phone_number',
        options: { type: Sequelize.STRING(4), allowNull: false }
      },
      {
        operation: 'change',
        field: 'applicant_info_eve_phone_number',
        options: { type: Sequelize.STRING(4) }
      },
      {
        operation: 'change',
        field: 'region',
        options: { type: Sequelize.STRING(2), allowNull: false }
      },
      {
        operation: 'change',
        field: 'forest',
        options: { type: Sequelize.STRING(2), allowNull: false }
      },
      {
        operation: 'change',
        field: 'district',
        options: { type: Sequelize.STRING(2), allowNull: false }
      },
      {
        operation: 'change',
        field: 'event_name',
        options: { type: Sequelize.STRING, allowNull: false }
      },
      {
        operation: 'change',
        field: 'applicant_info_primary_first_nm',
        options: { type: Sequelize.STRING, allowNull: false }
      },
      {
        operation: 'change',
        field: 'applicant_info_primary_last_nm',
        options: { type: Sequelize.STRING, allowNull: false }
      },
      {
        operation: 'change',
        field: 'applicant_info_email_address',
        options: { type: Sequelize.STRING, allowNull: false }
      },
      {
        operation: 'change',
        field: 'applicant_info_org_type',
        options: { type: Sequelize.STRING, allowNull: false }
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
        field: 'noncomm_fields_location_descr',
        options: { type: Sequelize.STRING, allowNull: false }
      },
      {
        operation: 'change',
        field: 'noncomm_fields_num_participants',
        options: { type: Sequelize.STRING, allowNull: false }
      },
      {
        operation: 'raw',
        query: 'ALTER TABLE "' + TABLE_NAME + '" ALTER COLUMN "noncomm_fields_num_participants" '
          + 'TYPE integer USING noncomm_fields_num_participants::integer'
      },
      {
        operation: 'change',
        field: 'noncomm_fields_spectator_count',
        options: { type: Sequelize.STRING, allowNull: false }
      },
      {
        operation: 'raw',
        query: 'ALTER TABLE "' + TABLE_NAME + '" ALTER COLUMN "noncomm_fields_spectator_count" '
          + 'TYPE integer USING noncomm_fields_spectator_count::integer'
      },
      {
        operation: 'change',
        field: 'noncomm_fields_activity_descr',
        options: { type: Sequelize.STRING, allowNull: false }
      },
      {
        operation: 'change',
        field: 'noncomm_fields_start_date_time',
        options: { type: Sequelize.STRING, allowNull: false }
      },
      {
        operation: 'change',
        field: 'noncomm_fields_end_date_time',
        options: { type: Sequelize.STRING, allowNull: false }
      },
      {
        operation: 'change',
        field: 'signature',
        options: { type: Sequelize.STRING(3), allowNull: false }
      }
    ];

    return doTransaction(queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {

    let operations = [
      {
        operation: 'remove',
        field: 'applicant_info_day_phone_ext'
      },
      {
        operation: 'remove',
        field: 'applicant_info_eve_phone_ext'
      },
      {
        operation: 'change',
        field: 'applicant_info_org_mail_state',
        options: { type: Sequelize.STRING }
      },
      {
        operation: 'change',
        field: 'appl_info_pri_mailing_state',
        options: { type: Sequelize.STRING, allowNull: true }
      },
      {
        operation: 'change',
        field: 'appl_info_sec_mailing_state',
        options: { type: Sequelize.STRING }
      },
      {
        operation: 'change',
        field: 'applicant_info_org_mailing_zip',
        options: { type: Sequelize.STRING }
      },
      {
        operation: 'change',
        field: 'appl_info_pri_mailing_zip',
        options: { type: Sequelize.STRING, allowNull: true }
      },
      {
        operation: 'change',
        field: 'appl_info_sec_mailing_zip',
        options: { type: Sequelize.STRING }
      },
      {
        operation: 'change',
        field: 'applicant_info_day_phone_areacd',
        options: { type: Sequelize.STRING, allowNull: true }
      },
      {
        operation: 'change',
        field: 'applicant_info_eve_phone_areacd',
        options: { type: Sequelize.STRING(3) }
      },
      {
        operation: 'change',
        field: 'applicant_info_day_phone_prefix',
        options: { type: Sequelize.STRING, allowNull: true }
      },
      {
        operation: 'change',
        field: 'applicant_info_eve_phone_prefix',
        options: { type: Sequelize.STRING }
      },
      {
        operation: 'change',
        field: 'applicant_info_day_phone_number',
        options: { type: Sequelize.STRING, allowNull: true }
      },
      {
        operation: 'change',
        field: 'applicant_info_eve_phone_number',
        options: { type: Sequelize.STRING }
      },
      {
        operation: 'change',
        field: 'region',
        options: { type: Sequelize.STRING(2), allowNull: true }
      },
      {
        operation: 'change',
        field: 'forest',
        options: { type: Sequelize.STRING(2), allowNull: true }
      },
      {
        operation: 'change',
        field: 'district',
        options: { type: Sequelize.STRING(2), allowNull: true }
      },
      {
        operation: 'change',
        field: 'event_name',
        options: { type: Sequelize.STRING, allowNull: true }
      },
      {
        operation: 'change',
        field: 'applicant_info_primary_first_nm',
        options: { type: Sequelize.STRING, allowNull: true }
      },
      {
        operation: 'change',
        field: 'applicant_info_primary_last_nm',
        options: { type: Sequelize.STRING, allowNull: true }
      },
      {
        operation: 'change',
        field: 'applicant_info_email_address',
        options: { type: Sequelize.STRING, allowNull: true }
      },
      {
        operation: 'change',
        field: 'applicant_info_org_type',
        options: { type: Sequelize.STRING, allowNull: true }
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
        field: 'noncomm_fields_location_descr',
        options: { type: Sequelize.STRING, allowNull: true }
      },
      {
        operation: 'raw',
        query: 'ALTER TABLE "' + TABLE_NAME + '" ALTER COLUMN "noncomm_fields_num_participants" '
          + 'TYPE varchar(255) USING noncomm_fields_num_participants::varchar'
      },
      {
        operation: 'change',
        field: 'noncomm_fields_num_participants',
        options: { type: Sequelize.STRING, allowNull: true }
      },
      {
        operation: 'raw',
        query: 'ALTER TABLE "' + TABLE_NAME + '" ALTER COLUMN "noncomm_fields_spectator_count" '
          + 'TYPE varchar(255) USING noncomm_fields_spectator_count::varchar'
      },
      {
        operation: 'change',
        field: 'noncomm_fields_spectator_count',
        options: { type: Sequelize.STRING, allowNull: true }
      },
      {
        operation: 'change',
        field: 'noncomm_fields_activity_descr',
        options: { type: Sequelize.STRING, allowNull: true }
      },
      {
        operation: 'change',
        field: 'noncomm_fields_start_date_time',
        options: { type: Sequelize.STRING, allowNull: true }
      },
      {
        operation: 'change',
        field: 'noncomm_fields_end_date_time',
        options: { type: Sequelize.STRING, allowNull: true }
      },
      {
        operation: 'change',
        field: 'signature',
        options: { type: Sequelize.STRING(3), allowNull: true }
      }
    ];

    return doTransaction(queryInterface, operations);
  }
};
