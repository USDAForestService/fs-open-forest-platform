'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let noncommApps = [
      {
        region: '99',
        forest: '50',
        district: '50',
        authorizing_officer_name: 'WILLIAM L.NOXON',
        authorizing_officer_title: null,
        applicant_info_primary_first_nm: 'John',
        applicant_info_primary_last_nm: 'Doe',
        applicant_info_day_phone_areacd: 541,
        applicant_info_day_phone_prefix: 815,
        applicant_info_day_phone_number: 6141,
        applicant_info_email_address: 'test@email.org',
        appl_info_pri_mailing_address: 'ON ANW 0953',
        appl_info_pri_mailing_city: 'ALBANY',
        appl_info_pri_mailing_state: 'OR',
        appl_info_pri_mailing_zip: '97321',
        type: 'noncommercial',
        noncomm_fields_activity_descr: 'PROVIDING WHITEWATER OUTFITTING AND GUIDING ACTIVITIES ON NATIONAL FOREST LANDS',
        noncomm_fields_location_descr: 'string',
        noncomm_fields_start_date_time: '2013-01-12T12:00:00Z',
        noncomm_fields_end_date_time: '2013-01-19T12:00:00Z',
        noncomm_fields_num_participants: 45,
        noncomm_fields_spectator_count: 50,
        created: 'now()',
        updated: 'now()',
        status: 'Received',
        event_name: 'test event',
        applicant_info_org_type: 'Person',
        signature: 'aaa',
        app_control_number: '806d3550-309d-46ea-b12a-f021f7b3d447'
      }
    ];

    return queryInterface.bulkInsert('noncommercialApplications', noncommApps);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('noncommercialApplications', [{ region: ['99'] }]);
  }
};
