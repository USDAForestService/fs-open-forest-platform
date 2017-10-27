'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'tempOutfitterApplications';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_loc_desc',
        options: {
          type: Sequelize.Integer(512),
          allowNull: false
        },
        migrationDefaultValue: '0'
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_serv_prv',
        options: {
          type: Sequelize.Integer(512),
          allowNull: false
        },
        migrationDefaultValue: '0'
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_aud_desc',
        options: {
          type: Sequelize.Integer(512),
          allowNull: false
        },
        migrationDefaultValue: '0'
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_lst_fac',
        options: {
          type: Sequelize.Integer(512),
          allowNull: false
        },
        migrationDefaultValue: '0'
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_lst_imp',
        options: {
          type: Sequelize.Integer(512),
          allowNull: false
        },
        migrationDefaultValue: '0'
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_mtr_eqp',
        options: {
          type: Sequelize.Integer(512),
          allowNull: false
        },
        migrationDefaultValue: '0'
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_trn_liv',
        options: {
          type: Sequelize.Integer(512),
          allowNull: false
        },
        migrationDefaultValue: '0'
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_agn_site',
        options: {
          type: Sequelize.Integer(512),
          allowNull: false
        },
        migrationDefaultValue: '0'
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_cln_rest',
        options: {
          type: Sequelize.Integer(512),
          allowNull: false
        },
        migrationDefaultValue: '0'
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_pty_size',
        options: {
          type: Sequelize.Integer(512),
          allowNull: false
        },
        migrationDefaultValue: '0'
      }
    ];
    return doTransaction(TABLE_NAME, queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_loc_desc'
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_serv_prv'
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_aud_desc'
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_lst_fac'
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_lst_imp'
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_mtr_eqp'
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_trn_liv'
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_agn_site'
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_cln_rest'
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_pty_size'
      }
    ];
    return doTransaction(TABLE_NAME, queryInterface, operations);
  }
};
