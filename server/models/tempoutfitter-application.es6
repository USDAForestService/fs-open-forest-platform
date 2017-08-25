'use strict';

let Sequelize = require('sequelize');
let url = require('url');

const sequelizeOptions = {
  dialect: url.parse(process.env.DATABASE_URL, true).protocol.split(':')[0]
};

if (
  url.parse(process.env.DATABASE_URL, true).hostname !== 'localhost' &&
  url.parse(process.env.DATABASE_URL, true).hostname !== 'fs-intake-postgres'
) {
  sequelizeOptions.dialectOptions = {
    ssl: true
  };
}

let sequelize = new Sequelize(process.env.DATABASE_URL, sequelizeOptions);

module.exports = sequelize.define(
  'tempOutfitterApplications',
  {
    applicationId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'application_id',
      allowNull: false
    },
    appControlNumber: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
      field: 'app_control_number',
      allowNull: false
    },
    controlNumber: {
      type: Sequelize.STRING(50),
      field: 'control_number'
    },
    region: {
      type: Sequelize.STRING(2),
      field: 'region',
      allowNull: false
    },
    forest: {
      type: Sequelize.STRING(2),
      field: 'forest',
      allowNull: false
    },
    district: {
      type: Sequelize.STRING(2),
      field: 'district',
      allowNull: false
    },
    authorizingOfficerName: {
      type: Sequelize.STRING,
      field: 'authorizing_officer_name'
    },
    authorizingOfficerTitle: {
      type: Sequelize.STRING,
      field: 'authorizing_officer_title'
    },
    applicantInfoPrimaryFirstName: {
      type: Sequelize.STRING,
      field: 'applicant_info_primary_first_nm',
      allowNull: false
    },
    applicantInfoPrimaryLastName: {
      type: Sequelize.STRING,
      field: 'applicant_info_primary_last_nm',
      allowNull: false
    },
    applicantInfoDayPhoneAreaCode: {
      type: Sequelize.STRING(3),
      field: 'applicant_info_day_phone_areacd',
      allowNull: false
    },
    applicantInfoDayPhonePrefix: {
      type: Sequelize.STRING(3),
      field: 'applicant_info_day_phone_prefix',
      allowNull: false
    },
    applicantInfoDayPhoneNumber: {
      type: Sequelize.STRING(4),
      field: 'applicant_info_day_phone_number',
      allowNull: false
    },
    applicantInfoDayPhoneExtension: {
      type: Sequelize.STRING(10),
      field: 'applicant_info_day_phone_ext'
    },
    applicantInfoEveningPhoneAreaCode: {
      type: Sequelize.STRING(3),
      field: 'applicant_info_eve_phone_areacd'
    },
    applicantInfoEveningPhonePrefix: {
      type: Sequelize.STRING(3),
      field: 'applicant_info_eve_phone_prefix'
    },
    applicantInfoEveningPhoneNumber: {
      type: Sequelize.STRING(4),
      field: 'applicant_info_eve_phone_number'
    },
    applicantInfoEveningPhoneExtension: {
      type: Sequelize.STRING(10),
      field: 'applicant_info_eve_phone_ext'
    },
    applicantInfoEmailAddress: {
      type: Sequelize.STRING,
      field: 'applicant_info_email_address',
      allowNull: false
    },
    applicantInfoPrimaryMailingAddress: {
      type: Sequelize.STRING,
      field: 'appl_info_pri_mailing_address',
      allowNull: false
    },
    applicantInfoPrimaryMailingAddress2: {
      type: Sequelize.STRING,
      field: 'appl_info_pri_mailing_address2'
    },
    applicantInfoPrimaryMailingCity: {
      type: Sequelize.STRING,
      field: 'appl_info_pri_mailing_city',
      allowNull: false
    },
    applicantInfoPrimaryMailingState: {
      type: Sequelize.STRING(2),
      field: 'appl_info_pri_mailing_state',
      allowNull: false
    },
    applicantInfoPrimaryMailingZIP: {
      type: Sequelize.STRING(5),
      field: 'appl_info_pri_mailing_zip',
      allowNull: false
    },
    applicantInfoOrganizationName: {
      type: Sequelize.STRING,
      field: 'applicant_info_org_name'
    },
    applicantInfoWebsite: {
      type: Sequelize.STRING,
      field: 'applicant_info_website'
    },
    applicantInfoOrgType: {
      type: Sequelize.STRING,
      field: 'applicant_info_org_type',
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      field: 'type',
      allowNull: false
    },
    tempOutfitterFieldsIndividualCitizen: {
      type: Sequelize.BOOLEAN,
      field: 'temp_outfitter_indiv_citizen',
      allowNull: false
    },
    tempOutfitterFieldsSmallBusiness: {
      type: Sequelize.BOOLEAN,
      field: 'temp_outfitter_small_business',
      allowNull: false
    },
    tempOutfitterFieldsAdvertisingUrl: {
      type: Sequelize.STRING,
      field: 'temp_outfitter_advertising_url'
    },
    tempOutfitterFieldsAdvertisingDescription: {
      type: Sequelize.STRING,
      field: 'temp_outfitter_advertising_desc'
    },
    tempOutfitterFieldsClientCharges: {
      type: Sequelize.STRING,
      field: 'temp_outfitter_client_charges',
      allowNull: false
    },
    tempOutfitterFieldsExperienceList: {
      type: Sequelize.STRING,
      field: 'temp_outfitter_exp_list'
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
      field: 'created'
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
      field: 'updated'
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: 'Received',
      field: 'status'
    },
    signature: {
      type: Sequelize.STRING(3),
      field: 'signature',
      allowNull: false
    },
    reasonForReturn: {
      type: Sequelize.STRING,
      field: 'reason_for_return'
    },
    applicantInfoFaxAreaCode: {
      type: Sequelize.STRING(3),
      field: 'applicant_info_fax_areacd'
    },
    applicantInfoFaxPrefix: {
      type: Sequelize.STRING(3),
      field: 'applicant_info_fax_prefix'
    },
    applicantInfoFaxNumber: {
      type: Sequelize.STRING(4),
      field: 'applicant_info_fax_number'
    },
    applicantInfoFaxExtension: {
      type: Sequelize.STRING(10),
      field: 'applicant_info_fax_ext'
    },
    tempOutfitterFieldsActDescFieldsNumServiceDaysReq: {
      type: Sequelize.INTEGER,
      field: 'temp_out_act_desc_serv_days_req'
    },
    tempOutfitterFieldsActDescFieldsNumTrips: {
      type: Sequelize.INTEGER,
      field: 'temp_out_act_desc_serv_num_trip'
    },
    tempOutfitterFieldsActDescFieldsEndDateTime: {
      type: Sequelize.STRING,
      field: 'temp_out_act_desc_serv_end_dt'
    },
    tempOutfitterFieldsActDescFieldsStartDateTime: {
      type: Sequelize.STRING,
      field: 'temp_out_act_desc_serv_strt_dt'
    },
    tempOutfitterFieldsActDescFieldsLocationDesc: {
      type: Sequelize.STRING,
      field: 'temp_out_act_desc_serv_loc_desc'
    },
    tempOutfitterFieldsActDescFieldsServProvided: {
      type: Sequelize.STRING,
      field: 'temp_out_act_desc_serv_serv_prv'
    },
    tempOutfitterFieldsActDescFieldsAudienceDesc: {
      type: Sequelize.STRING,
      field: 'temp_out_act_desc_serv_aud_desc'
    },
    tempOutfitterFieldsActDescFieldsListGovFacilities: {
      type: Sequelize.STRING,
      field: 'temp_out_act_desc_serv_lst_fac'
    },
    tempOutfitterFieldsActDescFieldsListTempImprovements: {
      type: Sequelize.STRING,
      field: 'temp_out_act_desc_serv_lst_imp'
    },
    tempOutfitterFieldsActDescFieldsStmtMotorizedEquip: {
      type: Sequelize.STRING,
      field: 'temp_out_act_desc_serv_mtr_eqp'
    },
    tempOutfitterFieldsActDescFieldsStmtTransportLivestock: {
      type: Sequelize.STRING,
      field: 'temp_out_act_desc_serv_trn_liv'
    },
    tempOutfitterFieldsActDescFieldsStmtAssignedSite: {
      type: Sequelize.STRING,
      field: 'temp_out_act_desc_serv_agn_site'
    },
    tempOutfitterFieldsActDescFieldsDescCleanupRestoration: {
      type: Sequelize.STRING,
      field: 'temp_out_act_desc_serv_cln_rest'
    },
    tempOutfitterFieldsActDescFieldsPartySize: {
      type: Sequelize.STRING,
      field: 'temp_out_act_desc_serv_pty_size',
      allowNull: false
    },
    tempOutfitterFieldsExpAllCitations: {
      type: Sequelize.STRING,
      field: 'temp_outfitter_exp_all_citation'
    },
    tempOutfitterFieldsExpNatForestPermits: {
      type: Sequelize.STRING,
      field: 'temp_outfitter_exp_nat_fst_pmts'
    },
    tempOutfitterFieldsExpOtherPermits: {
      type: Sequelize.STRING,
      field: 'temp_outfitter_exp_oth_pmts'
    }
  },
  {
    timestamps: true
  }
);
