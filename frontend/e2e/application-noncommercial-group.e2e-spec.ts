import { NoncommercialGroupForm } from './app.po';
import { element, by } from 'protractor';

let checkForPrimaryPermitHolderAddress = function (state) {
  expect(element(by.id('primary-permit-holder-address')).isPresent()).toBe(state);
  expect(element(by.id('primary-permit-holder-address-line-2')).isPresent()).toBe(state);
  expect(element(by.id('primary-permit-holder-city')).isPresent()).toBe(state);
  expect(element(by.id('primary-permit-holder-state')).isPresent()).toBe(state);
  expect(element(by.id('primary-permit-holder-zip')).isPresent()).toBe(state);
};

let checkForSecondPermitHolderAddress = function (state) {
  expect(element(by.id('secondary-permit-holder-address')).isPresent()).toBe(state);
  expect(element(by.id('secondary-permit-holder-address-line-2')).isPresent()).toBe(state);
  expect(element(by.id('secondary-permit-holder-city')).isPresent()).toBe(state);
  expect(element(by.id('secondary-permit-holder-state')).isPresent()).toBe(state);
  expect(element(by.id('secondary-permit-holder-zip')).isPresent()).toBe(state);
};

let checkForAdditionalPhone = function (state) {
  expect(element(by.id('night-phone-1')).isPresent()).toBe(state);
  expect(element(by.id('night-phone-2')).isPresent()).toBe(state);
  expect(element(by.id('night-phone-3')).isPresent()).toBe(state);
  expect(element(by.id('night-phone-4')).isPresent()).toBe(state);
};

describe('Apply for a noncommercial group use permit', () => {
  let page: NoncommercialGroupForm;

  beforeEach(() => {
    page = new NoncommercialGroupForm();
  });
  it('should display the permit name in the header', () => {
    page.navigateTo();
    expect(element(by.css('app-root h1')).getText()).toEqual('Apply for a Noncommercial Group Use Permit');
  });

  it('should select individual by default', () => {
    expect(element(by.id('individual')).isSelected()).toBe(true);
    expect(element(by.id('first-permit-holder-name')).isPresent()).toBe(true);
    expect(element(by.id('organization')).isSelected()).toBe(false);
    expect(element(by.id('organization-name')).isPresent()).toBe(false);
  });
  it('should not display primary permit holder if applying as individual', () => {
    expect(element(by.id('primary-permit-holder-name')).isPresent()).toBe(false);
  });
  it('should display organizaton name if organization is selected, and hide individual name', () => {
    element(by.id('organization')).click();
    expect(element(by.id('individual')).isSelected()).toBe(false);
    expect(element(by.id('first-permit-holder-name')).isPresent()).toBe(false);
    expect(element(by.id('organization')).isSelected()).toBe(true);
    expect(element(by.id('organization-name')).isPresent()).toBe(true);
  });
  it('should display primary permit holder if applying as an organization', () => {
    expect(element(by.id('primary-permit-holder-name')).isPresent()).toBe(true);
  });
  it('should not select addional phone by default', () => {
    expect(element(by.id('add-additional-phone')).isSelected()).toBe(false);
    return checkForAdditionalPhone(false);
  });
  it('should see additional phone if add addtional phone checkbox is clicked', () => {
    element(by.id('add-additional-phone')).click();
    expect(element(by.id('add-additional-phone')).isSelected()).toBe(true);
    return checkForAdditionalPhone(true);
  });
  it('should hide additional phone if add addtional phone checkbox is clicked', () => {
    element(by.id('add-additional-phone')).click();
    expect(element(by.id('add-additional-phone')).isSelected()).toBe(false);
    return checkForAdditionalPhone(false);
  });
  it('should default the "Permit holder address same as group address checkbox" to checked', () => {
    expect(element(by.id('primary-permit-holder-same-address')).isSelected()).toBe(true);
  });
  it('should show primary permit holder address fields if "permit holder same as organization address" is unchecked', () => {
    element(by.id('primary-permit-holder-same-address')).click();
    return checkForPrimaryPermitHolderAddress(true);
  });
  it('should hide primary permit holder address fields if "permit holder same as organization address" is checked', () => {
    element(by.id('primary-permit-holder-same-address')).click();
    return checkForPrimaryPermitHolderAddress(false);
  });
  it('should not show additional permit holder name or address fields by default', () => {
    expect(element(by.id('secondary-permit-holder-name')).isPresent()).toBe(false);
    return checkForSecondPermitHolderAddress(false);
  });
  it('should show secondary permit holder name field, but hide secondary address fields if "add a secondary permit holder" is clicked', () => {
    element(by.id('add-permit-holder')).click();
    expect(element(by.id('secondary-permit-holder-name')).isPresent()).toBe(true);
    return checkForSecondPermitHolderAddress(false);
  });
  it('should show secondary permit holder address fields if "secondary-permit-holder-same-address" is checked', () => {
    element(by.id('secondary-permit-holder-same-address')).click();
    return checkForSecondPermitHolderAddress(true);
  });
  it('should hide secondary permit holder address fields, but remain secondary permit holder name if "hide secondary permit holder" is clicked', () => {
    element(by.id('secondary-permit-holder-same-address')).click();
    expect(element(by.id('secondary-permit-holder-name')).isPresent()).toBe(true);
    return checkForSecondPermitHolderAddress(false);
  });
  it('should hide secondary permit holder name and address fields, but remain secondary permit holder name if "remove" is clicked', () => {
    element(by.id('hide-secondary-permit-holder')).click();
    expect(element(by.id('secondary-permit-holder-name')).isPresent()).toBe(false);
    return checkForSecondPermitHolderAddress(false);
  });
});
