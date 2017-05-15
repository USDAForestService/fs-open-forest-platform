'use strict';

let express =  require('express');
let bodyParser = require('body-parser');

let Validator = require('jsonschema').Validator;
let v = new Validator();
let validatorOptions = { 'nestedErrors' : true };

var schemas = require('./noncommercial-schema.es6');
v.addSchema(schemas.noncommercialSchema);
v.addSchema(schemas.noncommercialApplicantInfoSchema);
v.addSchema(schemas.noncommercialFieldsSchema);
v.addSchema(schemas.phoneNumberSchema);
v.addSchema(schemas.applicantInfoBaseSchema);
v.addSchema(schemas.commonFieldsSchema);

let app = express();
app.use(bodyParser.json());

let extractField = (errorObj, withArg) => {
  if (withArg && errorObj.property === 'instance') {
    return errorObj.argument;
  } else if (withArg) {
    // assumption is that the string otherwise is 'instance.<field>'
    return errorObj.property.substring(9) + '.' + errorObj.argument;
  } else {
    return errorObj.property.substring(9);
  }
};

// and store into db
// populates a tempControlNumber on the object before return
let createNoncommercialTempApp = (req, res) => {
  let result = v.validate(req.body, schemas.noncommercialSchema, validatorOptions);
  let errorArr = [];
  let errorRet = {};

  if (result.errors.length > 0) {
    console.log(result);
    for (var error of result.errors) {
      if (error.name === 'required') {
        errorArr.push(error.name + '-' + extractField(error, true));
      } else if (error.name === 'enum' || error.name === 'pattern' || error.name === 'type')  {
        errorArr.push(error.name + '-' + extractField(error, false));
      }
    }

    errorRet['errors'] = errorArr;

    res.status(400).json(errorRet);
  } else {
    req.body['tempControlNumber'] = 1;
    res.status(201).json(req.body);
  }
};

// POST /permits/applications/special-uses/noncommercial/
// creates a new noncommercial application
app.post('/permits/applications/special-uses/noncommercial', createNoncommercialTempApp);

// PUT /permits/applications/special-uses/noncommercial/:tempControlNumber
// updates an existing noncommercial application
// may not be able to update everything wholesale due to possible field audit requirements

// GET /permits/applications/special-uses/noncommercial/:tempControlNumber
// retrieve an existing noncommercial application

app.listen(8080);

module.exports = app;
