'use strict';

let jsonschema = require('jsonschema');
let util = require('./util.es6');

let validator = new jsonschema.Validator();
let validatorOptions = { 'nestedErrors' : true };

let addressSchema = require('./json-schemas/address-schema.es6');
let applicantInfoBaseSchema = require('./json-schemas/application-info-base-schema.es6');
let commonFieldsSchema = require('./json-schemas/common-fields-schema.es6');
let noncommercialApplicantInfoSchema = require('./json-schemas/noncommercial-application-info-schema.es6');
let noncommercialFieldsSchema = require('./json-schemas/noncommercial-fields-schema.es6');
let noncommercialSchema = require('./json-schemas/noncommercial-schema.es6');
let phoneNumberSchema = require('./json-schemas/phone-number-schema.es6');
let tempOutfitterAppInfoSchema = require('./json-schemas/tempOutfitter-application-info-schema.es6');
let tempOutfitterFieldsSchema = require('./json-schemas/tempOutfitter-fields-schema.es6');
let tempOutfitterSchema = require('./json-schemas/tempOutfitter-schema.es6');

validator.addSchema(addressSchema);
validator.addSchema(applicantInfoBaseSchema);
validator.addSchema(commonFieldsSchema);
validator.addSchema(noncommercialApplicantInfoSchema);
validator.addSchema(noncommercialFieldsSchema);
validator.addSchema(noncommercialSchema);
validator.addSchema(phoneNumberSchema);
validator.addSchema(tempOutfitterAppInfoSchema);
validator.addSchema(tempOutfitterFieldsSchema);
validator.addSchema(tempOutfitterSchema);


// refactor to take obj:
// inputObj: inputObj,
// schema: schema,
// errors: errorArr,
// prefix: errorPrefix,
// required: true/false,
// requiredKey: 'required-field'

let validateSchema = (input) => {

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

validate.validateNoncommercial = (obj) => {

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
  // let result = validator.validate(obj, noncommercialSchema, validatorOptions);
  // if (result.errors.length > 0) {
  //   util.collateErrors(result, errorArr);
  // }

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

  // if (obj.applicantInfo.eveningPhone && Object.keys(obj.applicantInfo.eveningPhone).length > 0) {
  //   result = validator.validate(obj.applicantInfo.eveningPhone, phoneNumberSchema, validatorOptions);
  //   util.collateErrors(result, errorArr, 'applicantInfo.eveningPhone.');
  // }

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

    // if (obj.applicantInfo.primaryAddress && Object.keys(obj.applicantInfo.primaryAddress).length > 0) {
    //   result = validator.validate(obj.applicantInfo.primaryAddress, addressSchema, validatorOptions);
    //   util.collateErrors(result, errorArr, 'applicantInfo.primaryAddress.');
    // } else {
    //   errorArr.push('required-applicantInfo.primaryAddress');
    // }
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

    // if (obj.applicantInfo.organizationAddress && Object.keys(obj.applicantInfo.organizationAddress).length > 0) {
    //   result = validator.validate(obj.applicantInfo.organizationAddress, addressSchema, validatorOptions);
    //   util.collateErrors(result, errorArr, 'applicantInfo.organizationAddress.');
    // } else {
    //   errorArr.push('required-applicantInfo.organizationAddress');
    // }

    validationObj = {
      inputObj: obj.applicantInfo.primaryAddress,
      schema: addressSchema,
      errors: errorArr,
      prefix: 'applicantInfo.primaryAddress.',
      required: false,
      requiredKey: undefined
    };

    errorArr = validateSchema(validationObj);

    // if (obj.applicantInfo.primaryAddress && Object.keys(obj.applicantInfo.primaryAddress).length > 0) {
    //   result = validator.validate(obj.applicantInfo.primaryAddress, addressSchema, validatorOptions);
    //   util.collateErrors(result, errorArr, 'applicantInfo.primaryAddress.');
    // }
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

  // if (obj.applicantInfo.secondaryAddress && Object.keys(obj.applicantInfo.secondaryAddress).length > 0) {
  //   result = validator.validate(obj.applicantInfo.secondaryAddress, addressSchema, validatorOptions);
  //   util.collateErrors(result, errorArr, 'applicantInfo.secondaryAddress.');
  // }

  if(!util.validateDateTime(obj.noncommercialFields.startDateTime)) {
    errorArr.push('pattern-noncommercialFields.startDateTime');
  }

  if(!util.validateDateTime(obj.noncommercialFields.endDateTime)) {
    errorArr.push('pattern-noncommercialFields.endDateTime');
  }

  return errorArr;
};

validate.validateTempOutfitter = (obj) => {

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

  // let result = validator.validate(obj, tempOutfitterSchema, validatorOptions);
  // if (result.errors.length > 0) {
  //   util.collateErrors(result, errorArr);
  // }

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

  // if (obj.applicantInfo.eveningPhone && Object.keys(obj.applicantInfo.eveningPhone).length > 0) {
  //   result = validator.validate(obj.applicantInfo.eveningPhone, phoneNumberSchema, validatorOptions);
  //   util.collateErrors(result, errorArr, 'applicantInfo.eveningPhone.');
  // }

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

    // if (obj.applicantInfo.primaryAddress && Object.keys(obj.applicantInfo.primaryAddress).length > 0) {
    //   result = validator.validate(obj.applicantInfo.primaryAddress, addressSchema, validatorOptions);
    //   util.collateErrors(result, errorArr, 'applicantInfo.primaryAddress.');
    // } else {
    //   errorArr.push('required-applicantInfo.primaryAddress');
    // }
  }

  // if the orgType is Corporation, then organizationAddress is required and might have a primary address
  // if (req.body.applicantInfo.orgType === 'Corporation') {
  //   if (req.body.applicantInfo.organizationAddress && Object.keys(req.body.applicantInfo.organizationAddress).length > 0) {
  //     result = validator.validate(req.body.applicantInfo.organizationAddress, addressSchema, validatorOptions);
  //     util.collateErrors(result, errorArr, 'applicantInfo.organizationAddress.');
  //   } else {
  //     errorArr.push('required-applicantInfo.organizationAddress');
  //   }
  //
  //   if (req.body.applicantInfo.primaryAddress && Object.keys(req.body.applicantInfo.primaryAddress).length > 0) {
  //     result = validator.validate(req.body.applicantInfo.primaryAddress, addressSchema, validatorOptions);
  //     util.collateErrors(result, errorArr, 'applicantInfo.primaryAddress.');
  //   }
  // }

  // if secondaryAddress exists, then validate it

  validationObj = {
    inputObj: obj.applicantInfo.secondaryAddres,
    schema: addressSchema,
    errors: errorArr,
    prefix: 'applicantInfo.secondaryAddress.',
    required: false,
    requiredKey: undefined
  };

  errorArr = validateSchema(validationObj);

  // if (obj.applicantInfo.secondaryAddress && Object.keys(obj.applicantInfo.secondaryAddress).length > 0) {
  //   result = validator.validate(obj.applicantInfo.secondaryAddress, addressSchema, validatorOptions);
  //   util.collateErrors(result, errorArr, 'applicantInfo.secondaryAddress.');
  // }

  return errorArr;

};

module.exports = validate;
