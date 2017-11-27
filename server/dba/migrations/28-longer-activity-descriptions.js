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
          type: Sequelize.STRING(400)
        }
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_serv_prv',
        options: {
          type: Sequelize.STRING(400)
        }
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_aud_desc',
        options: {
          type: Sequelize.STRING(400)
        }
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_lst_fac',
        options: {
          type: Sequelize.STRING(400)
        }
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_lst_imp',
        options: {
          type: Sequelize.STRING(400)
        }
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_mtr_eqp',
        options: {
          type: Sequelize.STRING(400)
        }
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_trn_liv',
        options: {
          type: Sequelize.STRING(400)
        }
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_agn_site',
        options: {
          type: Sequelize.STRING(400)
        }
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_cln_rest',
        options: {
          type: Sequelize.STRING(400)
        }
      }
    ];
    return doTransaction(TABLE_NAME, queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {
    let operations = [
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_loc_desc',
        options: {
          type: Sequelize.STRING(255)
        }
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_serv_prv',
        options: {
          type: Sequelize.STRING(255)
        }
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_aud_desc',
        options: {
          type: Sequelize.STRING(255)
        }
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_lst_fac',
        options: {
          type: Sequelize.STRING(255)
        }
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_lst_imp',
        options: {
          type: Sequelize.STRING(255)
        }
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_mtr_eqp',
        options: {
          type: Sequelize.STRING(255)
        }
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_trn_liv',
        options: {
          type: Sequelize.STRING(255)
        }
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_agn_site',
        options: {
          type: Sequelize.STRING(255)
        }
      },
      {
        operation: 'change',
        field: 'temp_out_act_desc_serv_cln_rest',
        options: {
          type: Sequelize.STRING(255)
        }
      }
    ];
    return doTransaction(TABLE_NAME, queryInterface, operations);
  }
};
