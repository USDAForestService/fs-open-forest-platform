'use strict';

const jsonschema = require('jsonschema');
const util = require('./util.es6');

const validator = new jsonschema.Validator();
const validatorOptions = { nestedErrors: true };

const activityDescriptionFieldsSchema = require('./json-schemas/activityDescription-fields-schema.es6');
const addressSchema = require('./json-schemas/address-schema.es6');
const applicantInfoBaseSchema = require('./json-schemas/application-info-base-schema.es6');
const commonFieldsSchema = require('./json-schemas/common-fields-schema.es6');
const dateTimeRangeSchema = require('./json-schemas/date-time-range-schema.es6');
const noncommercialApplicantInfoSchema = require('./json-schemas/noncommercial-application-info-schema.es6');
const noncommercialFieldsSchema = require('./json-schemas/noncommercial-fields-schema.es6');
const noncommercialSchema = require('./json-schemas/noncommercial-schema.es6');
const phoneNumberSchema = require('./json-schemas/phone-number-schema.es6');
const tempOutfitterAppInfoSchema = require('./json-schemas/tempOutfitter-application-info-schema.es6');
const tempOutfitterFieldsSchema = require('./json-schemas/tempOutfitter-fields-schema.es6');
const tempOutfitterSchema = require('./json-schemas/tempOutfitter-schema.es6');
const experienceFieldsSchema = require('./json-schemas/experience-fields-schema.es6');

validator.addSchema(addressSchema);
validator.addSchema(applicantInfoBaseSchema);
validator.addSchema(commonFieldsSchema);
validator.addSchema(dateTimeRangeSchema);
validator.addSchema(noncommercialApplicantInfoSchema);
validator.addSchema(noncommercialFieldsSchema);
validator.addSchema(noncommercialSchema);
validator.addSchema(phoneNumberSchema);
validator.addSchema(tempOutfitterAppInfoSchema);
validator.addSchema(tempOutfitterFieldsSchema);
validator.addSchema(tempOutfitterSchema);
validator.addSchema(activityDescriptionFieldsSchema);
validator.addSchema(experienceFieldsSchema);

let validateSchema = input => {
  let result;

  if (input.inputObj && Object.keys(input.inputObj).length > 0) {
    result = validator.validate(input.inputObj, input.schema, validatorOptions);
    util.collateErrors(result, input.errors, input.prefix);
  } else {
    if (input.required) {
      input.errors.push(input.requiredKey);
    }
  }

  return input.errors;
};

let validate = {};

validate.validateNoncommercial = obj => {
  let errorArr = [];

  // overall validation
  let validationObj = {
    inputObj: obj,
    schema: noncommercialSchema,
    errors: errorArr,
    prefix: undefined,
    required: false,
    requiredKey: undefined
  };

  errorArr = validateSchema(validationObj);

  validationObj = {
    inputObj: obj.applicantInfo.eveningPhone,
    schema: phoneNumberSchema,
    errors: errorArr,
    prefix: 'applicantInfo.eveningPhone.',
    required: false,
    requiredKey: undefined
  };

  // if there is an evening phone, validate it

  errorArr = validateSchema(validationObj);

  // if the orgType is Individual, then primaryAddress is required
  if (obj.applicantInfo.orgType === 'Person') {
    validationObj = {
      inputObj: obj.applicantInfo.primaryAddress,
      schema: addressSchema,
      errors: errorArr,
      prefix: 'applicantInfo.primaryAddress.',
      required: true,
      requiredKey: 'required-applicantInfo.primaryAddress'
    };

    errorArr = validateSchema(validationObj);
  }

  // if the orgType is Corporation, then organizationAddress is required and might have a primary address
  if (obj.applicantInfo.orgType === 'Corporation') {
    validationObj = {
      inputObj: obj.applicantInfo.organizationAddress,
      schema: addressSchema,
      errors: errorArr,
      prefix: 'applicantInfo.organizationAddress.',
      required: true,
      requiredKey: 'required-applicantInfo.organizationAddress'
    };

    errorArr = validateSchema(validationObj);

    validationObj = {
      inputObj: obj.applicantInfo.primaryAddress,
      schema: addressSchema,
      errors: errorArr,
      prefix: 'applicantInfo.primaryAddress.',
      required: false,
      requiredKey: undefined
    };

    errorArr = validateSchema(validationObj);
  }

  // if secondaryAddress exists, then validate it
  validationObj = {
    inputObj: obj.applicantInfo.secondaryAddress,
    schema: addressSchema,
    errors: errorArr,
    prefix: 'applicantInfo.secondaryAddress.',
    required: false,
    requiredKey: undefined
  };

  errorArr = validateSchema(validationObj);

  if (obj.dateTimeRange && !util.validateDateTime(obj.dateTimeRange.startDateTime)) {
    errorArr.push('pattern-dateTimeRange.startDateTime');
  }

  if (obj.dateTimeRange && !util.validateDateTime(obj.dateTimeRange.endDateTime)) {
    errorArr.push('pattern-dateTimeRange.endDateTime');
  }

  return errorArr;
};

validate.validateTempOutfitter = obj => {
  let errorArr = [];

  // overall validation
  let validationObj = {
    inputObj: obj,
    schema: tempOutfitterSchema,
    errors: errorArr,
    prefix: undefined,
    required: false,
    requiredKey: undefined
  };

  errorArr = validateSchema(validationObj);

  // if there is an evening phone, validate it
  validationObj = {
    inputObj: obj.applicantInfo.eveningPhone,
    schema: phoneNumberSchema,
    errors: errorArr,
    prefix: 'applicantInfo.eveningPhone.',
    required: false,
    requiredKey: undefined
  };

  errorArr = validateSchema(validationObj);

  // if there is a fax number, validate it
  validationObj = {
    inputObj: obj.applicantInfo.faxNumber,
    schema: phoneNumberSchema,
    errors: errorArr,
    prefix: 'applicantInfo.faxNumber.',
    required: false,
    requiredKey: undefined
  };

  errorArr = validateSchema(validationObj);

  // primaryAddress is always required

  validationObj = {
    inputObj: obj.applicantInfo.primaryAddress,
    schema: addressSchema,
    errors: errorArr,
    prefix: 'applicantInfo.primaryAddress.',
    required: true,
    requiredKey: 'required-applicantInfo.primaryAddress'
  };

  errorArr = validateSchema(validationObj);

  return errorArr;
};

module.exports = validate;
