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
        operation: 'add',
        field: 'applicant_info_sec_first_name',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'applicant_info_sec_last_name',
        type: Sequelize.STRING
      },
      {
        operation: 'remove',
        field: 'applicant_info_secondary_name'
      },
      {
        operation: 'remove',
        field: 'appl_info_pri_permit_hold_nm'
      },
      {
        operation: 'remove',
        field: 'applicant_info_name'
      },
      {
        operation: 'rename',
        field: 'applicant_info_mailing_address',
        newField: 'applicant_info_org_mail_address'
      },
      {
        operation: 'rename',
        field: 'applicant_info_mailing_address2',
        newField: 'applicant_info_org_mail_addr2'
      },
      {
        operation: 'rename',
        field: 'applicant_info_mailing_city',
        newField: 'applicant_info_org_mailing_city'
      },
      {
        operation: 'rename',
        field: 'applicant_info_mailing_state',
        newField: 'applicant_info_org_mail_state'
      },
      {
        operation: 'rename',
        field: 'applicant_info_mailing_zip',
        newField: 'applicant_info_org_mailing_zip'
      },
      {
        operation: 'rename',
        field: 'applicant_info_first_name',
        newField: 'applicant_info_primary_first_nm'
      },
      {
        operation: 'rename',
        field: 'applicant_info_last_name',
        newField: 'applicant_info_primary_last_nm'
      }
    ];

    return doTransaction(queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'remove',
        field: 'applicant_info_sec_first_name'
      },
      {
        operation: 'remove',
        field: 'applicant_info_sec_last_name'
      },
      {
        operation: 'add',
        field: 'applicant_info_secondary_name',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'appl_info_pri_permit_hold_nm',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'applicant_info_name',
        type: Sequelize.STRING
      },
      {
        operation: 'rename',
        newField: 'applicant_info_mailing_address',
        field: 'applicant_info_org_mail_address'
      },
      {
        operation: 'rename',
        newField: 'applicant_info_mailing_address2',
        field: 'applicant_info_org_mail_addr2'
      },
      {
        operation: 'rename',
        newField: 'applicant_info_mailing_city',
        field: 'applicant_info_org_mailing_city'
      },
      {
        operation: 'rename',
        newField: 'applicant_info_mailing_state',
        field: 'applicant_info_org_mail_state'
      },
      {
        operation: 'rename',
        newField: 'applicant_info_mailing_zip',
        field: 'applicant_info_org_mailing_zip'
      },
      {
        operation: 'rename',
        newField: 'applicant_info_first_name',
        field: 'applicant_info_primary_first_nm'
      },
      {
        operation: 'rename',
        newField: 'applicant_info_last_name',
        field: 'applicant_info_primary_last_nm'
      }
    ];

    return doTransaction(queryInterface, operations);
  }
};
