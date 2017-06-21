'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'noncommercialApplications';


module.exports = {
  up: function(queryInterface, Sequelize) {

    let operations = [
      {
        operation: 'remove',
        field: 'noncomm_fields_start_month'
      },
      {
        operation: 'remove',
        field: 'noncomm_fields_start_day'
      },
      {
        operation: 'remove',
        field: 'noncomm_fields_start_year',
      },
      {
        operation: 'remove',
        field: 'noncomm_fields_end_month',
      },
      {
        operation: 'remove',
        field: 'noncomm_fields_end_day',
      },
      {
        operation: 'remove',
        field: 'noncomm_fields_end_year',
      },
      {
        operation: 'remove',
        field: 'noncomm_fields_start_hour',
      },
      {
        operation: 'remove',
        field: 'noncomm_fields_start_minutes',
      },
      {
        operation: 'remove',
        field: 'noncomm_fields_start_period',
      },
      {
        operation: 'remove',
        field: 'noncomm_fields_end_hour',
      },
      {
        operation: 'remove',
        field: 'noncomm_fields_end_minutes',
      },
      {
        operation: 'remove',
        field: 'noncomm_fields_end_period',
      }
    ];

    return doTransaction(TABLE_NAME, queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {

    let operations = [
      {
        operation: 'add',
        field: 'noncomm_fields_start_month',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'noncomm_fields_start_day',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'noncomm_fields_start_year',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'noncomm_fields_end_month',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'noncomm_fields_end_day',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'noncomm_fields_end_year',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'noncomm_fields_start_hour',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'noncomm_fields_start_minutes',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'noncomm_fields_start_period',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'noncomm_fields_end_hour',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'noncomm_fields_end_minutes',
        type: Sequelize.STRING
      },
      {
        operation: 'add',
        field: 'noncomm_fields_end_period',
        type: Sequelize.STRING
      }
    ];

    return doTransaction(TABLE_NAME, queryInterface, operations);
  }
};
