'use strict';

/**
 * Module for temp outfitter permit application model
 * @module models/tempoutfitter-application
 */

const Sequelize = require('sequelize');

const util = require('../services/util.es6');

module.exports = util.getSequelizeConnection().define(
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
      field: 'control_number',
      validate: {
        len: {
          args: [0, 50],
          msg: 'controlNumber must be between 1 and 50 characters in length'
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
    applicantInfoPrimaryFirstName: {
      type: Sequelize.STRING(255),
      field: 'applicant_info_primary_first_nm',
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: 'authorizingOfficerTitle must be less than 255 characters in length'
        }
      }
    },
    applicantInfoPrimaryLastName: {
      type: Sequelize.STRING(255),
      field: 'applicant_info_primary_last_nm',
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: 'firstName must be less than 255 characters in length'
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
          args: [3, 3],
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
          args: [3, 3],
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
          args: [4, 4],
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
    applicantInfoPrimaryMailingAddress: {
      type: Sequelize.STRING(255),
      field: 'appl_info_pri_mailing_address',
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
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
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: 'applicantInfoPrimaryMailingCity must be less than 255 characters in length'
        }
      }
    },
    applicantInfoPrimaryMailingState: {
      type: Sequelize.STRING(2),
      field: 'appl_info_pri_mailing_state',
      allowNull: false,
      validate: { isIn: { args: [util.stateCodes], msg: 'applicantInfoPrimaryMailingState is invalid' } }
    },
    applicantInfoPrimaryMailingZIP: {
      type: Sequelize.STRING(5),
      field: 'appl_info_pri_mailing_zip',
      allowNull: false,
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
      validate: {
        len: {
          args: [1, 255],
          msg: 'applicantInfoOrgType must be less than 255 characters in length'
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
      type: Sequelize.STRING(255),
      field: 'temp_outfitter_advertising_url',
      validate: {
        len: {
          args: [0, 255],
          msg: 'tempOutfitterFieldsAdvertisingUrl must be less than 255 characters in length'
        }
      }
    },
    tempOutfitterFieldsAdvertisingDescription: {
      type: Sequelize.STRING(255),
      field: 'temp_outfitter_advertising_desc',
      validate: {
        len: {
          args: [0, 255],
          msg: 'tempOutfitterFieldsAdvertisingDescription must be less than 255 characters in length'
        }
      }
    },
    tempOutfitterFieldsClientCharges: {
      type: Sequelize.STRING(512),
      field: 'temp_outfitter_client_charges',
      allowNull: false,
      validate: {
        len: {
          args: [0, 512],
          msg: 'tempOutfitterFieldsClientCharges must be less than 512 characters in length'
        }
      }
    },
    tempOutfitterFieldsExperienceList: {
      type: Sequelize.STRING(512),
      field: 'temp_outfitter_exp_list',
      validate: {
        len: {
          args: [0, 512],
          msg: 'tempOutfitterFieldsExperienceList must be less than 512 characters in length'
        }
      }
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
      defaultValue: 'Incomplete',
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
      type: Sequelize.STRING(512),
      field: 'applicant_message',
      validate: {
        len: {
          args: [0, 512],
          msg: 'applicantMessage must be less than 512 characters in length'
        }
      }
    },
    applicantInfoFaxAreaCode: {
      type: Sequelize.STRING(3),
      field: 'applicant_info_fax_areacd',
      validate: {
        len: {
          args: [3, 3],
          msg: 'applicantInfoFaxAreaCode must be 3 characters in length'
        },
        is: /^$|[0-9]{3}/
      }
    },
    applicantInfoFaxPrefix: {
      type: Sequelize.STRING(3),
      field: 'applicant_info_fax_prefix',
      validate: {
        len: {
          args: [3, 3],
          msg: 'applicantInfoFaxPrefix must be 3 characters in length'
        },
        is: /^$|[0-9]{3}/
      }
    },
    applicantInfoFaxNumber: {
      type: Sequelize.STRING(4),
      field: 'applicant_info_fax_number',
      validate: {
        len: {
          args: [4, 4],
          msg: 'applicantInfoFaxNumber must be 4 characters in length'
        },
        is: /^$|[0-9]{4}/
      }
    },
    applicantInfoFaxExtension: {
      type: Sequelize.STRING(10),
      field: 'applicant_info_fax_ext',
      validate: {
        len: {
          args: [0, 10],
          msg: 'applicantInfoFaxExtension must be less than 10 characters in length'
        }
      }
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
      type: Sequelize.STRING(255),
      field: 'temp_out_act_desc_serv_end_dt',
      validate: {
        len: {
          args: [0, 255],
          msg: 'tempOutfitterFieldsActDescFieldsEndDateTime must be less than 255 characters in length'
        },
        isValidDateTime(value) {
          if (!util.validateDateTime(value)) {
            throw new Error('tempOutfitterFieldsActDescFieldsEndDateTime must be a valid UTC string');
          }
        }
      }
    },
    tempOutfitterFieldsActDescFieldsStartDateTime: {
      type: Sequelize.STRING(255),
      field: 'temp_out_act_desc_serv_strt_dt',
      validate: {
        len: {
          args: [0, 255],
          msg: 'tempOutfitterFieldsActDescFieldsStartDateTime must be less than 255 characters in length'
        },
        isValidDateTime(value) {
          if (!util.validateDateTime(value)) {
            throw new Error('tempOutfitterFieldsActDescFieldsStartDateTime must be a valid UTC string');
          }
        }
      }
    },
    tempOutfitterFieldsActDescFieldsLocationDesc: {
      type: Sequelize.STRING(400),
      field: 'temp_out_act_desc_serv_loc_desc',
      validate: {
        len: {
          args: [0, 400],
          msg: 'tempOutfitterFieldsActDescFieldsLocationDesc must be less than 400 characters in length'
        }
      }
    },
    tempOutfitterFieldsActDescFieldsServProvided: {
      type: Sequelize.STRING(400),
      field: 'temp_out_act_desc_serv_serv_prv',
      validate: {
        len: {
          args: [0, 400],
          msg: 'tempOutfitterFieldsActDescFieldsServProvided must be less than 400 characters in length'
        }
      }
    },
    tempOutfitterFieldsActDescFieldsAudienceDesc: {
      type: Sequelize.STRING(400),
      field: 'temp_out_act_desc_serv_aud_desc',
      validate: {
        len: {
          args: [0, 400],
          msg: 'tempOutfitterFieldsActDescFieldsAudienceDesc must be less than 400 characters in length'
        }
      }
    },
    tempOutfitterFieldsActDescFieldsListGovFacilities: {
      type: Sequelize.STRING(400),
      field: 'temp_out_act_desc_serv_lst_fac',
      validate: {
        len: {
          args: [0, 400],
          msg: 'tempOutfitterFieldsActDescFieldsListGovFacilities must be less than 400 characters in length'
        }
      }
    },
    tempOutfitterFieldsActDescFieldsListTempImprovements: {
      type: Sequelize.STRING(400),
      field: 'temp_out_act_desc_serv_lst_imp',
      validate: {
        len: {
          args: [0, 400],
          msg: 'tempOutfitterFieldsActDescFieldsListTempImprovements must be less than 400 characters in length'
        }
      }
    },
    tempOutfitterFieldsActDescFieldsStmtMotorizedEquip: {
      type: Sequelize.STRING(400),
      field: 'temp_out_act_desc_serv_mtr_eqp',
      validate: {
        len: {
          args: [0, 400],
          msg: 'tempOutfitterFieldsActDescFieldsStmtMotorizedEquip must be less than 400 characters in length'
        }
      }
    },
    tempOutfitterFieldsActDescFieldsStmtTransportLivestock: {
      type: Sequelize.STRING(400),
      field: 'temp_out_act_desc_serv_trn_liv',
      validate: {
        len: {
          args: [0, 400],
          msg: 'tempOutfitterFieldsActDescFieldsStmtTransportLivestock must be less than 400 characters in length'
        }
      }
    },
    tempOutfitterFieldsActDescFieldsStmtAssignedSite: {
      type: Sequelize.STRING(400),
      field: 'temp_out_act_desc_serv_agn_site',
      validate: {
        len: {
          args: [0, 400],
          msg: 'tempOutfitterFieldsActDescFieldsStmtAssignedSite must be less than 400 characters in length'
        }
      }
    },
    tempOutfitterFieldsActDescFieldsDescCleanupRestoration: {
      type: Sequelize.STRING(400),
      field: 'temp_out_act_desc_serv_cln_rest',
      validate: {
        len: {
          args: [0, 400],
          msg: 'tempOutfitterFieldsActDescFieldsDescCleanupRestoration must be less than 400 characters in length'
        }
      }
    },
    tempOutfitterFieldsActDescFieldsPartySize: {
      type: Sequelize.STRING(255),
      field: 'temp_out_act_desc_serv_pty_size',
      allowNull: false,
      validate: {
        len: {
          args: [0, 255],
          msg: 'tempOutfitterFieldsActDescFieldsPartySize must be less than 255 characters in length'
        }
      }
    },
    tempOutfitterFieldsExpAllCitations: {
      type: Sequelize.STRING(512),
      field: 'temp_outfitter_exp_all_citation',
      validate: {
        len: {
          args: [0, 512],
          msg: 'tempOutfitterFieldsExpAllCitations must be less than 512 characters in length'
        }
      }
    },
    tempOutfitterFieldsExpNatForestPermits: {
      type: Sequelize.STRING(512),
      field: 'temp_outfitter_exp_nat_fst_pmts',
      validate: {
        len: {
          args: [0, 512],
          msg: 'tempOutfitterFieldsExpNatForestPermits must be less than 512 characters in length'
        }
      }
    },
    tempOutfitterFieldsExpOtherPermits: {
      type: Sequelize.STRING(512),
      field: 'temp_outfitter_exp_oth_pmts',
      validate: {
        len: {
          args: [0, 512],
          msg: 'tempOutfitterFieldsExpOtherPermits must be less than 512 characters in length'
        }
      }
    }
  },
  {
    timestamps: true
  }
);
