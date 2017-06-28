'use strict';

let doTransaction = require('./modules/transaction');

const TABLE_NAME = 'tempOutfitterApplications';

module.exports = {
  up: function(queryInterface, Sequelize) {

    let operations = [
      {
        operation: 'add',
        field: 'applicant_info_fax_areacd',
        type: Sequelize.STRING(3),
        allowNull: true
      },
      {
        operation: 'add',
        field: 'applicant_info_fax_prefix',
        type: Sequelize.STRING(3),
        allowNull: true
      },
      {
        operation: 'add',
        field: 'applicant_info_fax_number',
        type: Sequelize.STRING(4),
        allowNull: true
      },
      {
        operation: 'add',
        field: 'applicant_info_fax_ext',
        type: Sequelize.STRING(10),
        allowNull: true
      },
      {
        operation: 'add',
        field: 'temp_out_act_desc_serv_days_req',
        type: Sequelize.INTEGER,
        allowNull: true
      },
      {
        operation: 'add',
        field: 'temp_out_act_desc_serv_num_trip',
        type: Sequelize.INTEGER,
        allowNull: true
      },
      {
        operation: 'add',
        field: 'temp_out_act_desc_serv_end_dt',
        type: Sequelize.STRING,
        allowNull: true
      },
      {
        operation: 'add',
        field: 'temp_out_act_desc_serv_strt_dt',
        type: Sequelize.STRING,
        allowNull: true
      },
      {
        operation: 'add',
        field: 'temp_out_act_desc_serv_loc_desc',
        type: Sequelize.STRING,
        allowNull: true
      },
      {
        operation: 'add',
        field: 'temp_out_act_desc_serv_serv_prv',
        type: Sequelize.STRING,
        allowNull: true
      },
      {
        operation: 'add',
        field: 'temp_out_act_desc_serv_aud_desc',
        type: Sequelize.STRING,
        allowNull: true
      },
      {
        operation: 'add',
        field: 'temp_out_act_desc_serv_lst_fac',
        type: Sequelize.STRING,
        allowNull: true
      },
      {
        operation: 'add',
        field: 'temp_out_act_desc_serv_lst_imp',
        type: Sequelize.STRING,
        allowNull: true
      },
      {
        operation: 'add',
        field: 'temp_out_act_desc_serv_mtr_eqp',
        type: Sequelize.STRING,
        allowNull: true
      },
      {
        operation: 'add',
        field: 'temp_out_act_desc_serv_trn_liv',
        type: Sequelize.STRING,
        allowNull: true
      },
      {
        operation: 'add',
        field: 'temp_out_act_desc_serv_agn_site',
        type: Sequelize.STRING,
        allowNull: true
      },
      {
        operation: 'add',
        field: 'temp_out_act_desc_serv_cln_rest',
        type: Sequelize.STRING,
        allowNull: true
      },
      {
        operation: 'remove',
        field: 'event_name'
      },
      {
        operation: 'remove',
        field: 'applicant_info_org_mail_address'
      },
      {
        operation: 'remove',
        field: 'applicant_info_org_mail_addr2'
      },
      {
        operation: 'remove',
        field: 'applicant_info_org_mailing_city'
      },
      {
        operation: 'remove',
        field: 'applicant_info_org_mail_state'
      },
      {
        operation: 'remove',
        field: 'applicant_info_org_mailing_zip'
      },
      {
        operation: 'remove',
        field: 'appl_info_sec_mailing_address'
      },
      {
        operation: 'remove',
        field: 'appl_info_sec_mailing_address2'
      },
      {
        operation: 'remove',
        field: 'appl_info_sec_mailing_city'
      },
      {
        operation: 'remove',
        field: 'appl_info_sec_mailing_state'
      },
      {
        operation: 'remove',
        field: 'appl_info_sec_mailing_zip'
      },
      {
        operation: 'remove',
        field: 'applicant_info_sec_first_name'
      },
      {
        operation: 'remove',
        field: 'applicant_info_sec_last_name'
      },
      {
        operation: 'remove',
        field: 'temp_outfitter_activity_desc'
      },
      {
        operation: 'change',
        field: 'temp_outfitter_client_charges',
        options: { type: Sequelize.STRING, allowNull: false },
        migrationDefaultValue: '0'
      }
    ];

    return doTransaction(TABLE_NAME, queryInterface, operations);
  },
  down: function(queryInterface, Sequelize) {

    let operations = [
      {
        operation: 'remove',
        field: 'applicant_info_fax_areacd'
      },
      {
        operation: 'remove',
        field: 'applicant_info_fax_prefix'
      },
      {
        operation: 'remove',
        field: 'applicant_info_fax_number'
      },
      {
        operation: 'remove',
        field: 'applicant_info_fax_ext'
      },
      {
        operation: 'remove',
        field: 'temp_out_act_desc_serv_days_req'
      },
      {
        operation: 'remove',
        field: 'temp_out_act_desc_serv_num_trip'
      },
      {
        operation: 'remove',
        field: 'temp_out_act_desc_serv_end_dt'
      },
      {
        operation: 'remove',
        field: 'temp_out_act_desc_serv_strt_dt'
      },
      {
        operation: 'remove',
        field: 'temp_out_act_desc_serv_loc_desc'
      },
      {
        operation: 'remove',
        field: 'temp_out_act_desc_serv_serv_prv'
      },
      {
        operation: 'remove',
        field: 'temp_out_act_desc_serv_aud_desc'
      },
      {
        operation: 'remove',
        field: 'temp_out_act_desc_serv_lst_fac'
      },
      {
        operation: 'remove',
        field: 'temp_out_act_desc_serv_lst_imp'
      },
      {
        operation: 'remove',
        field: 'temp_out_act_desc_serv_mtr_eqp'
      },
      {
        operation: 'remove',
        field: 'temp_out_act_desc_serv_trn_liv'
      },
      {
        operation: 'remove',
        field: 'temp_out_act_desc_serv_agn_site'
      },
      {
        operation: 'remove',
        field: 'temp_out_act_desc_serv_cln_rest'
      },
      {
        operation: 'add',
        field: 'event_name',
        type: Sequelize.STRING,
        allowNull: false,
        migrationDefaultValue: 'event'
      },
      {
        operation: 'add',
        field: 'applicant_info_org_mail_address',
        type: Sequelize.STRING,
        allowNull: true
      },
      {
        operation: 'add',
        field: 'applicant_info_org_mail_addr2',
        type: Sequelize.STRING,
        allowNull: true
      },
      {
        operation: 'add',
        field: 'applicant_info_org_mailing_city',
        type: Sequelize.STRING,
        allowNull: true
      },
      {
        operation: 'add',
        field: 'applicant_info_org_mail_state',
        type: Sequelize.STRING(2),
        allowNull: true
      },
      {
        operation: 'add',
        field: 'applicant_info_org_mailing_zip',
        type: Sequelize.STRING(5),
        allowNull: true
      },
      {
        operation: 'add',
        field: 'appl_info_sec_mailing_address',
        type: Sequelize.STRING,
        allowNull: true
      },
      {
        operation: 'add',
        field: 'appl_info_sec_mailing_address2',
        type: Sequelize.STRING,
        allowNull: true
      },
      {
        operation: 'add',
        field: 'appl_info_sec_mailing_city',
        type: Sequelize.STRING,
        allowNull: true
      },
      {
        operation: 'add',
        field: 'appl_info_sec_mailing_state',
        type: Sequelize.STRING(2),
        allowNull: true
      },
      {
        operation: 'add',
        field: 'appl_info_sec_mailing_zip',
        type: Sequelize.STRING(5),
        allowNull: true
      },
      {
        operation: 'add',
        field: 'applicant_info_sec_first_name',
        type: Sequelize.STRING,
        allowNull: true
      },
      {
        operation: 'add',
        field: 'applicant_info_sec_last_name',
        type: Sequelize.STRING,
        allowNull: true
      },
      {
        operation: 'add',
        field: 'temp_outfitter_activity_desc',
        type: Sequelize.STRING,
        allowNull: true
      },
      {
        operation: 'change',
        field: 'temp_outfitter_client_charges',
        options: { type: Sequelize.STRING, allowNull: true }
      },
    ];

    return doTransaction(TABLE_NAME, queryInterface, operations);
  }
};
