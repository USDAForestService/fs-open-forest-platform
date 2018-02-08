'use strict';

/**
 * Module for noncommercial permit application model
 * @module models/noncommercial-application
 */

const Sequelize = require('sequelize');

const util = require('../services/util.es6');

module.exports = util.getSequelizeConnection().define(
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
    controlNumber: {
      type: Sequelize.STRING(50),
      field: 'control_number',
      validate: {
        len: {
          args: [0, 50],
          msg: 'controlNumber must be less than 50 characters in length'
        }
      }
    },
    region: {
      type: Sequelize.STRING(2),
      field: 'region',
      allowNull: false,
      validate: {
        len: {
          args: [2, 2],
          msg: 'region must be 2 characters in length'
        }
      }
    },
    forest: {
      type: Sequelize.STRING(2),
      field: 'forest',
      allowNull: false,
      validate: {
        len: {
          args: [2, 2],
          msg: 'forest must be 2 characters in length'
        }
      }
    },
    district: {
      type: Sequelize.STRING(2),
      field: 'district',
      allowNull: false,
      validate: {
        len: {
          args: [2, 2],
          msg: 'district must be 2 characters in length'
        }
      }
    },
    authorizingOfficerName: {
      type: Sequelize.STRING(255),
      field: 'authorizing_officer_name',
      validate: {
        len: {
          args: [0, 255],
          msg: 'authorizingOfficerName must be less than 255 characters in length'
        }
      }
    },
    authorizingOfficerTitle: {
      type: Sequelize.STRING(255),
      field: 'authorizing_officer_title',
      validate: {
        len: {
          args: [0, 255],
          msg: 'authorizingOfficerTitle must be less than 255 characters in length'
        }
      }
    },
    eventName: {
      type: Sequelize.STRING(255),
      field: 'event_name',
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: 'eventName must be less than 255 characters in length'
        }
      }
    },
    applicantInfoPrimaryFirstName: {
      type: Sequelize.STRING,
      field: 'applicant_info_primary_first_nm',
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: 'primaryFirstName must be less than 255 characters in length'
        }
      }
    },
    applicantInfoPrimaryLastName: {
      type: Sequelize.STRING,
      field: 'applicant_info_primary_last_nm',
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: 'primaryLastName must be less than 255 characters in length'
        }
      }
    },
    applicantInfoDayPhoneAreaCode: {
      type: Sequelize.STRING(3),
      field: 'applicant_info_day_phone_areacd',
      allowNull: false,
      validate: {
        len: {
          args: [3, 3],
          msg: 'applicantInfoDayPhoneAreaCode must be 3 characters in length'
        },
        is: /^$|[0-9]{3}/
      }
    },
    applicantInfoDayPhonePrefix: {
      type: Sequelize.STRING(3),
      field: 'applicant_info_day_phone_prefix',
      allowNull: false,
      validate: {
        len: {
          args: [3, 3],
          msg: 'applicantInfoDayPhonePrefix must be 3 characters in length'
        },
        is: /^$|[0-9]{3}/
      }
    },
    applicantInfoDayPhoneNumber: {
      type: Sequelize.STRING(4),
      field: 'applicant_info_day_phone_number',
      allowNull: false,
      validate: {
        len: {
          args: [4, 4],
          msg: 'applicantInfoDayPhoneNumber must be 4 characters in length'
        },
        is: /^$|[0-9]{4}/
      }
    },
    applicantInfoDayPhoneExtension: {
      type: Sequelize.STRING(10),
      field: 'applicant_info_day_phone_ext',
      validate: {
        len: {
          args: [0, 10],
          msg: 'applicantInfoDayPhoneExtension must be less than 10 characters in length'
        }
      }
    },
    applicantInfoEveningPhoneAreaCode: {
      type: Sequelize.STRING(3),
      field: 'applicant_info_eve_phone_areacd',
      validate: {
        len: {
          args: [0, 3],
          msg: 'applicantInfoEveningPhoneAreaCode must be 3 characters in length'
        },
        is: /^$|[0-9]{3}/
      }
    },
    applicantInfoEveningPhonePrefix: {
      type: Sequelize.STRING(3),
      field: 'applicant_info_eve_phone_prefix',
      validate: {
        len: {
          args: [0, 3],
          msg: 'applicantInfoEveningPhonePrefix must be 3 characters in length'
        },
        is: /^$|[0-9]{3}/
      }
    },
    applicantInfoEveningPhoneNumber: {
      type: Sequelize.STRING(4),
      field: 'applicant_info_eve_phone_number',
      validate: {
        len: {
          args: [0, 4],
          msg: 'applicantInfoEveningPhoneNumber must be 4 characters in length'
        },
        is: /^$|[0-9]{4}/
      }
    },
    applicantInfoEveningPhoneExtension: {
      type: Sequelize.STRING(10),
      field: 'applicant_info_eve_phone_ext',
      validate: {
        len: {
          args: [0, 10],
          msg: 'applicantInfoEveningPhoneExtension must be less than 10 characters in length'
        }
      }
    },
    applicantInfoEmailAddress: {
      type: Sequelize.STRING(255),
      field: 'applicant_info_email_address',
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: 'applicantInfoEmailAddress must be less than 255 characters in length'
        },
        isEmail: true
      }
    },
    applicantInfoOrgMailingAddress: {
      type: Sequelize.STRING(255),
      field: 'applicant_info_org_mail_address',
      validate: {
        len: {
          args: [0, 255],
          msg: 'applicantInfoOrgMailingAddress must be less than 255 characters in length'
        }
      }
    },
    applicantInfoOrgMailingAddress2: {
      type: Sequelize.STRING(255),
      field: 'applicant_info_org_mail_addr2',
      validate: {
        len: {
          args: [0, 255],
          msg: 'applicantInfoOrgMailingAddress2 must be less than 255 characters in length'
        }
      }
    },
    applicantInfoOrgMailingCity: {
      type: Sequelize.STRING(255),
      field: 'applicant_info_org_mailing_city',
      validate: {
        len: {
          args: [0, 255],
          msg: 'applicantInfoOrgMailingCity must be less than 255 characters in length'
        }
      }
    },
    applicantInfoOrgMailingState: {
      type: Sequelize.STRING(2),
      field: 'applicant_info_org_mail_state',
      validate: { isIn: { args: [util.stateCodes], msg: 'applicantInfoOrgMailingState is invalid' } }
    },
    applicantInfoOrgMailingZIP: {
      type: Sequelize.STRING(5),
      field: 'applicant_info_org_mailing_zip',
      validate: {
        is: /^$|[0-9]{5}/
      }
    },
    applicantInfoPrimaryMailingAddress: {
      type: Sequelize.STRING(255),
      field: 'appl_info_pri_mailing_address',
      validate: {
        len: {
          args: [0, 255],
          msg: 'applicantInfoPrimaryMailingAddress must be less than 255 characters in length'
        }
      }
    },
    applicantInfoPrimaryMailingAddress2: {
      type: Sequelize.STRING(255),
      field: 'appl_info_pri_mailing_address2',
      validate: {
        len: {
          args: [0, 255],
          msg: 'applicantInfoPrimaryMailingAddress2 must be less than 255 characters in length'
        }
      }
    },
    applicantInfoPrimaryMailingCity: {
      type: Sequelize.STRING(255),
      field: 'appl_info_pri_mailing_city',
      validate: {
        len: {
          args: [0, 255],
          msg: 'applicantInfoPrimaryMailingCity must be less than 255 characters in length'
        }
      }
    },
    applicantInfoPrimaryMailingState: {
      type: Sequelize.STRING(2),
      field: 'appl_info_pri_mailing_state',
      validate: { isIn: { args: [util.stateCodes], msg: 'applicantInfoPrimaryMailingState is invalid' } }
    },
    applicantInfoPrimaryMailingZIP: {
      type: Sequelize.STRING(5),
      field: 'appl_info_pri_mailing_zip',
      validate: {
        len: {
          args: [0, 5],
          msg: 'applicantInfoSecondaryMailingAddress must be 5 characters in length'
        },
        is: /^$|[0-9]{5}/
      }
    },
    applicantInfoSecondaryMailingAddress: {
      type: Sequelize.STRING(255),
      field: 'appl_info_sec_mailing_address',
      validate: {
        len: {
          args: [0, 255],
          msg: 'applicantInfoSecondaryMailingAddress must be less than 255 characters in length'
        }
      }
    },
    applicantInfoSecondaryMailingAddress2: {
      type: Sequelize.STRING(255),
      field: 'appl_info_sec_mailing_address2',
      validate: {
        len: {
          args: [0, 255],
          msg: 'applicantInfoSecondaryMailingAddress2 must be less than 255 characters in length'
        }
      }
    },
    applicantInfoSecondaryMailingCity: {
      type: Sequelize.STRING(255),
      field: 'appl_info_sec_mailing_city',
      validate: {
        len: {
          args: [0, 255],
          msg: 'applicantInfoSecondaryMailingCity must be less than 255 characters in length'
        }
      }
    },
    applicantInfoSecondaryMailingState: {
      type: Sequelize.STRING(2),
      field: 'appl_info_sec_mailing_state',
      validate: { isIn: { args: [util.stateCodes], msg: 'applicantInfoSecondaryMailingState is invalid' } }
    },
    applicantInfoSecondaryMailingZIP: {
      type: Sequelize.STRING(5),
      field: 'appl_info_sec_mailing_zip',
      validate: {
        is: /^$|[0-9]{5}/
      }
    },
    applicantInfoOrganizationName: {
      type: Sequelize.STRING(255),
      field: 'applicant_info_org_name',
      validate: {
        len: {
          args: [0, 255],
          msg: 'applicantInfoOrganizationName must be less than 255 characters in length'
        }
      }
    },
    applicantInfoWebsite: {
      type: Sequelize.STRING(255),
      field: 'applicant_info_website',
      validate: {
        len: {
          args: [0, 255],
          msg: 'applicantInfoWebsite must be less than 255 characters in length'
        }
      }
    },
    applicantInfoOrgType: {
      type: Sequelize.STRING(255),
      field: 'applicant_info_org_type',
      allowNull: false,
      validate: { isIn: { args: [util.noncommercialOrgTypes], msg: 'orgType is invalid' } }
    },
    applicantInfoSecondaryFirstName: {
      type: Sequelize.STRING(255),
      field: 'applicant_info_sec_first_name',
      validate: {
        len: {
          args: [0, 255],
          msg: 'applicantInfoSecondaryFirstName must be less than 255 characters in length'
        }
      }
    },
    applicantInfoSecondaryLastName: {
      type: Sequelize.STRING(255),
      field: 'applicant_info_sec_last_name',
      validate: {
        len: {
          args: [0, 255],
          msg: 'applicantInfoSecondaryLastName must be less than 255 characters in length'
        }
      }
    },
    type: {
      type: Sequelize.STRING(255),
      field: 'type',
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: 'type must be less than 255 characters in length'
        }
      }
    },
    noncommercialFieldsActivityDescription: {
      type: Sequelize.STRING(512),
      field: 'noncomm_fields_activity_descr',
      allowNull: false,
      validate: {
        len: {
          args: [1, 512],
          msg: 'noncommercialFieldsActivityDescription must be less than 512 characters in length'
        }
      }
    },
    noncommercialFieldsLocationDescription: {
      type: Sequelize.STRING(255),
      field: 'noncomm_fields_location_descr',
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: 'noncommercialFieldsLocationDescription must be less than 255 characters in length'
        }
      }
    },
    noncommercialFieldsStartDateTime: {
      type: Sequelize.STRING(255),
      field: 'noncomm_fields_start_date_time',
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: 'noncommercialFieldsStartDateTime must be less than 255 characters in length'
        },
        isValidDateTime(value) {
          if (!util.validateDateTime(value)) {
            throw new Error('startDateTime must be a valid UTC string');
          }
        }
      }
    },
    noncommercialFieldsEndDateTime: {
      type: Sequelize.STRING(255),
      field: 'noncomm_fields_end_date_time',
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: 'noncommercialFieldsEndDateTime must be less than 255 characters in length'
        },
        isValidDateTime(value) {
          if (!util.validateDateTime(value)) {
            throw new Error('endDateTime must be a valid UTC string');
          }
        }
      }
    },
    noncommercialFieldsNumberParticipants: {
      type: Sequelize.INTEGER,
      field: 'noncomm_fields_num_participants',
      allowNull: false
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
      type: Sequelize.STRING(255),
      defaultValue: 'Submitted',
      field: 'status',
      allowNull: false,
      validate: { isIn: { args: [util.statusOptions], msg: 'status is invalid' } }
    },
    signature: {
      type: Sequelize.STRING(3),
      field: 'signature',
      allowNull: false,
      validate: {
        len: {
          args: [2, 3],
          msg: 'signature must be 2 or 3 characters in length'
        }
      }
    },
    authEmail: {
      type: Sequelize.STRING(255),
      field: 'auth_email',
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: 'authEmail must be less than 255 characters in length'
        },
        isEmail: true
      }
    },
    applicantMessage: {
      type: Sequelize.STRING(255),
      field: 'applicant_message',
      validate: {
        len: {
          args: [0, 255],
          msg: 'applicantMessage must be less than 255 characters in length'
        }
      }
    },
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
