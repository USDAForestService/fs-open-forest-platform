'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'noncommercialApplications';

// alter column sizes and types
// remove phone type

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

    return doTransaction(TABLE_NAME, queryInterface, operations);
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

    return doTransaction(TABLE_NAME, queryInterface, operations);
  }
};
