'use strict';

const expect = require('chai').expect;

const noncommercialPermitApplicationFactory = require('./data/noncommercial-factory.es6');
const validation = require('../src/validation.es6');

describe('validation tests', () => {
  describe('noncommercial permit application validator', () => {
    it('should pass with a valid application', () => {
      let errors = validation.validateNoncommercial(noncommercialPermitApplicationFactory.create());
      expect(errors).to.have.lengthOf(0);
    });

    it('should fail when type is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.type = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-type');
    });

    it('should fail when type is invalid', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.type = 'invalid';
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('enum-type');
    });

    it('should pass when org type is Corporation', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.orgType = 'Corporation';
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(0);
    });

    it('should fail when org type is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.orgType = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-orgType');
    });

    it('should fail when org type is invalid', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.orgType = 'invalid';
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('enum-orgType');
    });

    it('should fail when district is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.district = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-district');
    });

    it('should fail when region is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.region = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-region');
    });

    it('should fail when forest is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.forest = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-forest');
    });

    it('should fail when event name is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.eventName = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-eventName');
    });

    it('should fail when signature is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.signature = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-signature');
    });

    it('should fail when primary first name is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.primaryFirstName = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.primaryFirstName');
    });

    it('should fail when primary last name is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.primaryLastName = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.primaryLastName');
    });

    it('should fail validation when primary first name is too short', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.primaryFirstName = 'X';
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.primaryFirstName');
    });

    it('should fail validation when primary first name is too long', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.primaryFirstName =
        'There is a bias toward networking-related formats in the JSON Schema specification, most likely due to its heritage in web technologies. There is a bias toward networking-related formats in the JSON Schema specification, most likely due to its heritage in web technologies. There is a bias toward networking-related formats in the JSON Schema specification, most likely due to its heritage in web technologies. There is a bias toward networking-related formats in the JSON Schema specification, most likely due to its heritage in web technologies. ';
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.primaryFirstName');
    });

    it('should fail when primary last name is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.primaryLastName = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.primaryLastName');
    });

    it('should pass when secondary first name and secondary last name are missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.secondaryFirstName = undefined;
      data.applicantInfo.secondaryLastName = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(0);
    });

    it('should fail when day phone is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.dayPhone = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.dayPhone');
    });

    it('should fail when day phone area code is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.dayPhone.areaCode = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.dayPhone.areaCode');
    });

    it('should fail when day phone prefix is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.dayPhone.prefix = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.dayPhone.prefix');
    });

    it('should fail when day phone number is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.dayPhone.number = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.dayPhone.number');
    });

    it('should pass when day phone extension is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.dayPhone.extension = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(0);
    });

    it('should pass when evening phone is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.eveningPhone = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(0);
    });

    it('should fail when evening phone area code is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.eveningPhone.areaCode = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.eveningPhone.areaCode');
    });

    it('should fail when evening phone prefix is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.eveningPhone.prefix = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.eveningPhone.prefix');
    });

    it('should fail when evening phone number is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.eveningPhone.number = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.eveningPhone.number');
    });

    it('should pass when evening phone extension is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.eveningPhone.extension = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(0);
    });

    it('should fail when email is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.emailAddress = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.emailAddress');
    });

    it('should fail when email is invalid', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.emailAddress = 'invalid';
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('pattern-applicantInfo.emailAddress');
    });

    it('should pass when website is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.website = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(0);
    });

    it('should fail when primary address is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.primaryAddress = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.primaryAddress');
    });

    it('should fail when primary address mailing address is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.primaryAddress.mailingAddress = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.primaryAddress.mailingAddress');
    });

    it('should pass when primary address mailing address line 2 is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.primaryAddress.mailingAddress2 = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(0);
    });

    it('should fail when primary address city is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.primaryAddress.mailingCity = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.primaryAddress.mailingCity');
    });

    it('should fail when primary address state is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.primaryAddress.mailingState = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.primaryAddress.mailingState');
    });

    it('should fail when primary address state is invalid', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.primaryAddress.mailingState = 'XX';
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('pattern-applicantInfo.primaryAddress.mailingState');
    });

    it('should fail when primary address zip is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.primaryAddress.mailingZIP = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.primaryAddress.mailingZIP');
    });

    it('should fail when primary address zip is invalid', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.primaryAddress.mailingZIP = 'Hello!';
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('pattern-applicantInfo.primaryAddress.mailingZIP');
    });

    it('should pass when secondary address is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.secondaryAddress = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(0);
    });

    it('should fail when secondary address mailing address is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.secondaryAddress.mailingAddress = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.secondaryAddress.mailingAddress');
    });

    it('should pass when secondary address mailing address line 2 is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.secondaryAddress.mailingAddress2 = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(0);
    });

    it('should fail when secondary address city is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.secondaryAddress.mailingCity = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.secondaryAddress.mailingCity');
    });

    it('should fail when secondary address state is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.secondaryAddress.mailingState = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.secondaryAddress.mailingState');
    });

    it('should fail when secondary address state is invalid', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.secondaryAddress.mailingState = 'XX';
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('pattern-applicantInfo.secondaryAddress.mailingState');
    });

    it('should fail when secondary address zip is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.secondaryAddress.mailingZIP = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.secondaryAddress.mailingZIP');
    });

    it('should fail when secondary address zip is invalid', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.applicantInfo.secondaryAddress.mailingZIP = 'Hello!';
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('pattern-applicantInfo.secondaryAddress.mailingZIP');
    });

    it('should fail when noncommercial fields are missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.noncommercialFields = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-noncommercialFields');
    });

    it('should fail when location description is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.noncommercialFields.locationDescription = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-noncommercialFields.locationDescription');
    });

    it('should fail when number participants is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.noncommercialFields.numberParticipants = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-noncommercialFields.numberParticipants');
    });

    it('should fail when number participants is invalid', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.noncommercialFields.numberParticipants = 'invalid';
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('type-noncommercialFields.numberParticipants');
    });

    it('should fail when number spectators is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.noncommercialFields.numberSpectators = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-noncommercialFields.numberSpectators');
    });

    it('should fail when number spectators is invalid', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.noncommercialFields.numberSpectators = 'invalid';
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('type-noncommercialFields.numberSpectators');
    });

    it('should fail when activity description is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.noncommercialFields.activityDescription = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-noncommercialFields.activityDescription');
    });

    it('should fail when date time range is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.dateTimeRange = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-dateTimeRange');
    });

    it('should fail when start date time is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.dateTimeRange.startDateTime = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-dateTimeRange.startDateTime');
    });

    it('should fail when start date time is not in the correct format', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.dateTimeRange.startDateTime = 'invalid';
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('pattern-dateTimeRange.startDateTime');
    });

    it('should fail when start date time is not a valid date', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.dateTimeRange.startDateTime = '2018-02-31T13:00:00Z';
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('pattern-dateTimeRange.startDateTime');
    });

    it('should fail when end date time is missing', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.dateTimeRange.endDateTime = undefined;
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-dateTimeRange.endDateTime');
    });

    it('should fail when end date time is not in the correct format', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.dateTimeRange.endDateTime = 'invalid';
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('pattern-dateTimeRange.endDateTime');
    });

    it('should fail when end date time is not a valid date', () => {
      const data = noncommercialPermitApplicationFactory.create();
      data.dateTimeRange.endDateTime = '2018-02-31T13:00:00Z';
      const errors = validation.validateNoncommercial(data);
      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('pattern-dateTimeRange.endDateTime');
    });
  });
});
