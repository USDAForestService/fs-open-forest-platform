'use strict';

let Sequelize = require('sequelize');
let url = require('url');

const sequelizeOptions = {
  dialect: url.parse(process.env.DATABASE_URL, true).protocol.split(':')[0]
};

if (url.parse(process.env.DATABASE_URL, true).hostname !== 'localhost'
    && url.parse(process.env.DATABASE_URL, true).hostname !== 'fs-intake-postgres') {
  sequelizeOptions.dialectOptions = {
    ssl: true
  };
}

let sequelize = new Sequelize(process.env.DATABASE_URL, sequelizeOptions);

module.exports = sequelize.define(
  'noncommercialApplications',
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
    controlNumber: { type: Sequelize.STRING(50), field: 'control_number' },
    region: { type: Sequelize.STRING(2), field: 'region', allowNull: false },
    forest: { type: Sequelize.STRING(2), field: 'forest', allowNull: false },
    district: { type: Sequelize.STRING(2), field: 'district', allowNull: false },
    authorizingOfficerName: { type: Sequelize.STRING, field: 'authorizing_officer_name' },
    authorizingOfficerTitle: { type: Sequelize.STRING, field: 'authorizing_officer_title' },
    eventName: { type: Sequelize.STRING, field: 'event_name', allowNull: false },
    applicantInfoPrimaryFirstName: {
      type: Sequelize.STRING,
      field: 'applicant_info_primary_first_nm',
      allowNull: false
    },
    applicantInfoPrimaryLastName: { type: Sequelize.STRING, field: 'applicant_info_primary_last_nm', allowNull: false },
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
    applicantInfoDayPhoneExtension: { type: Sequelize.STRING(10), field: 'applicant_info_day_phone_ext' },
    applicantInfoEveningPhoneAreaCode: { type: Sequelize.STRING(3), field: 'applicant_info_eve_phone_areacd' },
    applicantInfoEveningPhonePrefix: { type: Sequelize.STRING(3), field: 'applicant_info_eve_phone_prefix' },
    applicantInfoEveningPhoneNumber: { type: Sequelize.STRING(4), field: 'applicant_info_eve_phone_number' },
    applicantInfoEveningPhoneExtension: { type: Sequelize.STRING(10), field: 'applicant_info_eve_phone_ext' },
    applicantInfoEmailAddress: { type: Sequelize.STRING, field: 'applicant_info_email_address', allowNull: false },
    applicantInfoOrgMailingAddress: { type: Sequelize.STRING, field: 'applicant_info_org_mail_address' },
    applicantInfoOrgMailingAddress2: { type: Sequelize.STRING, field: 'applicant_info_org_mail_addr2' },
    applicantInfoOrgMailingCity: { type: Sequelize.STRING, field: 'applicant_info_org_mailing_city' },
    applicantInfoOrgMailingState: { type: Sequelize.STRING(2), field: 'applicant_info_org_mail_state' },
    applicantInfoOrgMailingZIP: { type: Sequelize.STRING(5), field: 'applicant_info_org_mailing_zip' },
    applicantInfoPrimaryMailingAddress: {
      type: Sequelize.STRING,
      field: 'appl_info_pri_mailing_address',
      allowNull: true
    },
    applicantInfoPrimaryMailingAddress2: { type: Sequelize.STRING, field: 'appl_info_pri_mailing_address2' },
    applicantInfoPrimaryMailingCity: { type: Sequelize.STRING, field: 'appl_info_pri_mailing_city', allowNull: true },
    applicantInfoPrimaryMailingState: {
      type: Sequelize.STRING(2),
      field: 'appl_info_pri_mailing_state',
      allowNull: true
    },
    applicantInfoPrimaryMailingZIP: { type: Sequelize.STRING(5), field: 'appl_info_pri_mailing_zip', allowNull: true },
    applicantInfoSecondaryMailingAddress: { type: Sequelize.STRING, field: 'appl_info_sec_mailing_address' },
    applicantInfoSecondaryMailingAddress2: { type: Sequelize.STRING, field: 'appl_info_sec_mailing_address2' },
    applicantInfoSecondaryMailingCity: { type: Sequelize.STRING, field: 'appl_info_sec_mailing_city' },
    applicantInfoSecondaryMailingState: { type: Sequelize.STRING(2), field: 'appl_info_sec_mailing_state' },
    applicantInfoSecondaryMailingZIP: { type: Sequelize.STRING(5), field: 'appl_info_sec_mailing_zip' },
    applicantInfoOrganizationName: { type: Sequelize.STRING, field: 'applicant_info_org_name' },
    applicantInfoWebsite: { type: Sequelize.STRING, field: 'applicant_info_website' },
    applicantInfoOrgType: { type: Sequelize.STRING, field: 'applicant_info_org_type', allowNull: false },
    applicantInfoSecondaryFirstName: { type: Sequelize.STRING, field: 'applicant_info_sec_first_name' },
    applicantInfoSecondaryLastName: { type: Sequelize.STRING, field: 'applicant_info_sec_last_name' },
    type: { type: Sequelize.STRING, field: 'type', allowNull: false },
    noncommercialFieldsActivityDescription: {
      type: Sequelize.STRING(512),
      field: 'noncomm_fields_activity_descr',
      allowNull: false
    },
    noncommercialFieldsLocationDescription: {
      type: Sequelize.STRING,
      field: 'noncomm_fields_location_descr',
      allowNull: false
    },
    noncommercialFieldsStartDateTime: {
      type: Sequelize.STRING,
      field: 'noncomm_fields_start_date_time',
      allowNull: false
    },
    noncommercialFieldsEndDateTime: { type: Sequelize.STRING, field: 'noncomm_fields_end_date_time', allowNull: false },
    noncommercialFieldsNumberParticipants: {
      type: Sequelize.INTEGER,
      field: 'noncomm_fields_num_participants',
      allowNull: false
    },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'created' },
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'updated' },
    status: { type: Sequelize.STRING, defaultValue: 'Received', field: 'status' },
    signature: { type: Sequelize.STRING(3), field: 'signature', allowNull: false },
    reasonForReturn: { type: Sequelize.STRING, field: 'reason_for_return' },
    noncommercialFieldsSpectatorCount: {
      type: Sequelize.INTEGER,
      field: 'noncomm_fields_spectator_count',
      allowNull: false
    }
  },
  {
    timestamps: true
  }
);
