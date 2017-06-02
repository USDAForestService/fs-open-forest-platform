'use strict';

let Sequelize = require('sequelize');
let url = require('url');

const sequelizeOptions = {
  dialect: url.parse(process.env.DATABASE_URL, true).protocol.split(':')[0]
};

if (url.parse(process.env.DATABASE_URL, true).hostname !== 'localhost') {
  sequelizeOptions.dialectOptions = {
    ssl: true
  };
}

let sequelize = new Sequelize(process.env.DATABASE_URL, sequelizeOptions);

module.exports = sequelize.define('noncommercialApplications', {
  applicationId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'application_id' },
  controlNumber: { type: Sequelize.STRING(50), field: 'control_number' },
  region: { type: Sequelize.STRING(2), field: 'region' },
  forest: { type: Sequelize.STRING(2), field: 'forest' },
  district: { type: Sequelize.STRING(2), field: 'district' },
  authorizingOfficerName: { type: Sequelize.STRING, field: 'authorizing_officer_name' },
  authorizingOfficerTitle: { type: Sequelize.STRING, field: 'authorizing_officer_title' },
  eventName: { type: Sequelize.STRING, field: 'event_name' },
  applicantInfoPrimaryFirstName: { type: Sequelize.STRING, field: 'applicant_info_primary_first_nm' },
  applicantInfoPrimaryLastName: { type: Sequelize.STRING, field: 'applicant_info_primary_last_nm' },
  applicantInfoDayPhoneAreaCode: { type: Sequelize.STRING, field: 'applicant_info_day_phone_areacd' },
  applicantInfoDayPhonePrefix: { type: Sequelize.STRING, field: 'applicant_info_day_phone_prefix' },
  applicantInfoDayPhoneNumber: { type: Sequelize.STRING, field: 'applicant_info_day_phone_number' },
  applicantInfoDayPhonePhoneType: { type: Sequelize.STRING, field: 'applicant_info_day_phone_type' },
  applicantInfoEveningPhoneAreaCode: { type: Sequelize.STRING, field: 'applicant_info_eve_phone_areacd' },
  applicantInfoEveningPhonePrefix: { type: Sequelize.STRING, field: 'applicant_info_eve_phone_prefix' },
  applicantInfoEveningPhoneNumber: { type: Sequelize.STRING, field: 'applicant_info_eve_phone_number' },
  applicantInfoEveningPhonePhoneType: { type: Sequelize.STRING, field: 'applicant_info_eve_phone_type' },
  applicantInfoEmailAddress: { type: Sequelize.STRING, field: 'applicant_info_email_address' },
  applicantInfoOrgMailingAddress: { type: Sequelize.STRING, field: 'applicant_info_org_mail_address' },
  applicantInfoOrgMailingAddress2: { type: Sequelize.STRING, field: 'applicant_info_org_mail_addr2' },
  applicantInfoOrgMailingCity: { type: Sequelize.STRING, field: 'applicant_info_org_mailing_city' },
  applicantInfoOrgMailingState: { type: Sequelize.STRING, field: 'applicant_info_org_mail_state' },
  applicantInfoOrgMailingZIP: { type: Sequelize.STRING, field: 'applicant_info_org_mailing_zip' },
  applicantInfoPrimaryMailingAddress: { type: Sequelize.STRING, field: 'appl_info_pri_mailing_address' },
  applicantInfoPrimaryMailingAddress2: { type: Sequelize.STRING, field: 'appl_info_pri_mailing_address2' },
  applicantInfoPrimaryMailingCity: { type: Sequelize.STRING, field: 'appl_info_pri_mailing_city' },
  applicantInfoPrimaryMailingState: { type: Sequelize.STRING, field: 'appl_info_pri_mailing_state' },
  applicantInfoPrimaryMailingZIP: { type: Sequelize.STRING, field: 'appl_info_pri_mailing_zip' },
  applicantInfoSecondaryMailingAddress: { type: Sequelize.STRING, field: 'appl_info_sec_mailing_address' },
  applicantInfoSecondaryMailingAddress2: { type: Sequelize.STRING, field: 'appl_info_sec_mailing_address2' },
  applicantInfoSecondaryMailingCity: { type: Sequelize.STRING, field: 'appl_info_sec_mailing_city' },
  applicantInfoSecondaryMailingState: { type: Sequelize.STRING, field: 'appl_info_sec_mailing_state' },
  applicantInfoSecondaryMailingZIP: { type: Sequelize.STRING, field: 'appl_info_sec_mailing_zip' },
  applicantInfoOrganizationName: { type: Sequelize.STRING, field: 'applicant_info_org_name' },
  applicantInfoWebsite: { type: Sequelize.STRING, field: 'applicant_info_website' },
  applicantInfoOrgType: { type: Sequelize.STRING, field: 'applicant_info_org_type' },
  applicantInfoSecondaryFirstName: { type: Sequelize.STRING, field: 'applicant_info_sec_first_name' },
  applicantInfoSecondaryLastName: { type: Sequelize.STRING, field: 'applicant_info_sec_last_name' },
  type: { type: Sequelize.STRING, field: 'type' },
  noncommercialFieldsActivityDescription: { type: Sequelize.STRING, field: 'noncomm_fields_activity_descr' },
  noncommercialFieldsLocationDescription: { type: Sequelize.STRING, field: 'noncomm_fields_location_descr' },
  noncommercialFieldsStartDateTime: { type: Sequelize.STRING, field: 'noncomm_fields_start_date_time' },
  noncommercialFieldsEndDateTime: { type: Sequelize.STRING, field: 'noncomm_fields_end_date_time' },
  noncommercialFieldsStartMonth: { type: Sequelize.STRING, field: 'noncomm_fields_start_month' },
  noncommercialFieldsStartDay: { type: Sequelize.STRING, field: 'noncomm_fields_start_day' },
  noncommercialFieldsStartYear: { type: Sequelize.STRING, field: 'noncomm_fields_start_year' },
  noncommercialFieldsEndMonth: { type: Sequelize.STRING, field: 'noncomm_fields_end_month' },
  noncommercialFieldsEndDay: { type: Sequelize.STRING, field: 'noncomm_fields_end_day' },
  noncommercialFieldsEndYear: { type: Sequelize.STRING, field: 'noncomm_fields_end_year' },
  noncommercialFieldsStartHour: { type: Sequelize.STRING, field: 'noncomm_fields_start_hour' },
  noncommercialFieldsStartMinutes: { type: Sequelize.STRING, field: 'noncomm_fields_start_minutes' },
  noncommercialFieldsStartPeriod: { type: Sequelize.STRING, field: 'noncomm_fields_start_period' },
  noncommercialFieldsEndHour: { type: Sequelize.STRING, field: 'noncomm_fields_end_hour' },
  noncommercialFieldsEndMinutes: { type: Sequelize.STRING, field: 'noncomm_fields_end_minutes' },
  noncommercialFieldsEndPeriod: { type: Sequelize.STRING, field: 'noncomm_fields_end_period' },
  noncommercialFieldsNumberParticipants: { type: Sequelize.STRING, field: 'noncomm_fields_num_participants' },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'created' },
  updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'updated' },
  status: { type: Sequelize.STRING, defaultValue: 'Received', field: 'status'}
}, {
  timestamps: true
});
