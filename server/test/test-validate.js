'use strict';

var expect = require('chai').expect;
var validation = require('../validation.es6');
var noncommercialTestData = require('./data/noncommercialTestData.es6');

describe('validation tests', () => {
  describe('validate noncommercial apps', () => {
    it('should call validate with a valid single permit holder and return no errors', () => {
      let errors = validation.validateNoncommercial(noncommercialTestData.singlePermitHolder.create());

      expect(errors).to.have.lengthOf(0);
    });

    it('should call validate with a missing primary first name and return an error', () => {
      let errors = validation.validateNoncommercial(noncommercialTestData.singlePermitHolderMissingFirstName.create());

      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.primaryFirstName');
    });

    it('should call validate with an evening phone but missing area code and return an error', () => {
      let errors = validation.validateNoncommercial(
        noncommercialTestData.singlePermitHolderEveningPhoneMissingAreaCode.create()
      );

      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.eveningPhone.areaCode');
    });

    it('should call validate with orgType of Person and a missing primary address and return an error', () => {
      let errors = validation.validateNoncommercial(
        noncommercialTestData.singlePermitHolderMissingPrimaryAddress.create()
      );

      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.primaryAddress');
    });

    it('should call validate with orgType of Person and a primary address with missing state and return an error', () => {
      let errors = validation.validateNoncommercial(
        noncommercialTestData.singlePermitHolderMissingPrimaryAddressState.create()
      );

      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.primaryAddress.mailingState');
    });

    it('should call validate with orgType of Corporation and a missing org address and return an error', () => {
      let errors = validation.validateNoncommercial(
        noncommercialTestData.singlePermitHolderOrganizationMissingOrgAddress.create()
      );

      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.organizationAddress');
    });

    it('should call validate with orgType of Corporation and an org address with missing state and return an error', () => {
      let errors = validation.validateNoncommercial(
        noncommercialTestData.singlePermitHolderOrganizationMissingOrgAddressState.create()
      );

      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.organizationAddress.mailingState');
    });

    it('should call validate with orgType of Corporation and a primary address with missing state and return an error', () => {
      let errors = validation.validateNoncommercial(
        noncommercialTestData.singlePermitHolderOrganizationWithPrimaryAddressMissingState.create()
      );

      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.primaryAddress.mailingState');
    });

    it('should call validate with a secondary address and missing state and return an error', () => {
      let errors = validation.validateNoncommercial(
        noncommercialTestData.singlePermitHolderWithSecondaryAddressMissingState.create()
      );

      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('required-applicantInfo.secondaryAddress.mailingState');
    });

    it('should call validate with an invalid startDateTime and return an error', () => {
      let errors = validation.validateNoncommercial(noncommercialTestData.singlePermitHolderBadStartDateTime.create());

      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('pattern-dateTimeRange.startDateTime');
    });

    it('should call validate with an invalid endDateTime and return an error', () => {
      let errors = validation.validateNoncommercial(noncommercialTestData.singlePermitHolderBadEndDateTime.create());

      expect(errors).to.have.lengthOf(1);
      expect(errors[0]).to.equal('pattern-dateTimeRange.endDateTime');
    });
  });
});
