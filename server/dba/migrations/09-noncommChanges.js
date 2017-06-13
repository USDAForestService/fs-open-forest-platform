'use strict';

let Promise = require('bluebird');

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

    return Promise.each(operations, (operation) => {
      if (operation.operation === 'add') {
        return queryInterface.addColumn(TABLE_NAME, operation.field, {type: operation.type});
      } else if (operation.operation === 'remove') {
        return queryInterface.removeColumn(TABLE_NAME, operation.field);
      } else if (operation.operation === 'rename') {
        return queryInterface.renameColumn(TABLE_NAME, operation.field, operation.newField);
      } else if (operation.operation === 'change') {
        return queryInterface.changeColumn(TABLE_NAME, operation.field, operation.options);
      } else if (operation.operation === 'raw') {
        return queryInterface.sequelize.query(operation.query, { type: queryInterface.sequelize.QueryTypes.RAW });
      }
    });

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

    return Promise.each(operations, (operation) => {
      if (operation.operation === 'add') {
        return queryInterface.addColumn(TABLE_NAME, operation.field, {type: operation.type});
      } else if (operation.operation === 'remove') {
        return queryInterface.removeColumn(TABLE_NAME, operation.field);
      } else if (operation.operation === 'rename') {
        return queryInterface.renameColumn(TABLE_NAME, operation.field, operation.newField);
      } else if (operation.operation === 'raw') {
        return queryInterface.sequelize.query(operation.query, { type: queryInterface.sequelize.QueryTypes.RAW });
      }
    });
  }
};
