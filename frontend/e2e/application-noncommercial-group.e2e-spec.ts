import { NoncommercialGroupForm } from './app.po';
import { FieldValidation } from './field-validation.po';
import { browser, element, by, Key } from 'protractor';

const checkForPrimaryPermitHolderAddress = function(state) {
  expect<any>(element(by.id('primary-permit-holder-address')).isPresent()).toBe(state);
  expect<any>(element(by.id('primary-permit-holder-address-line-2')).isPresent()).toBe(state);
  expect<any>(element(by.id('primary-permit-holder-city')).isPresent()).toBe(state);
  expect<any>(element(by.id('primary-permit-holder-state')).isPresent()).toBe(state);
  expect<any>(element(by.id('primary-permit-holder-zip')).isPresent()).toBe(state);
};

const checkForSecondPermitHolderAddress = function(state) {
  expect<any>(element(by.id('secondary-permit-holder-address')).isPresent()).toBe(state);
  expect<any>(element(by.id('secondary-permit-holder-address-line-2')).isPresent()).toBe(state);
  expect<any>(element(by.id('secondary-permit-holder-city')).isPresent()).toBe(state);
  expect<any>(element(by.id('secondary-permit-holder-state')).isPresent()).toBe(state);
  expect<any>(element(by.id('secondary-permit-holder-zip')).isPresent()).toBe(state);
};

const checkForOrganizationAddress = function(state) {
  expect<any>(element(by.id('organization-address')).isPresent()).toBe(state);
  expect<any>(element(by.id('organization-address-line-2')).isPresent()).toBe(state);
  expect<any>(element(by.id('organization-city')).isPresent()).toBe(state);
  expect<any>(element(by.id('organization-state')).isPresent()).toBe(state);
  expect<any>(element(by.id('organization-zip')).isPresent()).toBe(state);
};

const checkForAdditionalPhone = function(state) {
  expect<any>(element(by.id('evening-phone')).isPresent()).toBe(state);
  expect<any>(element(by.id('evening-ext')).isPresent()).toBe(state);
};

describe('Apply for a noncommercial group use permit', () => {
  let page: NoncommercialGroupForm;
  let fieldValidation: FieldValidation;
  fieldValidation = new FieldValidation();

  beforeEach(() => {
    page = new NoncommercialGroupForm();
  });
  it('should display the permit name in the header', () => {
    page.navigateTo();
    expect<any>(element(by.css('app-root h1')).getText()).toEqual('Apply for a noncommercial group use permit.');
  });
  fieldValidation.validateSimpleTextField('name', 'name-error', 'Event name is required.');
  fieldValidation.validateSimpleTextField('primary-permit-holder-first-name', 'primary-permit-holder-first-name-error', 'Primary permit holder first name is required.');
  fieldValidation.validateSimpleTextField('primary-permit-holder-last-name', 'primary-permit-holder-last-name-error', 'Primary permit holder last name is required.');
  fieldValidation.validateSimpleTextField('primary-permit-holder-address', 'primary-permit-holder-address-error', 'Street address 1 is required.');
  fieldValidation.validateSimpleTextField('primary-permit-holder-city', 'primary-permit-holder-city-error', 'City is required.');
  fieldValidation.validateSimpleTextField('primary-permit-holder-state', 'primary-permit-holder-state-error', 'State is required.');
  fieldValidation.validateNumberField('primary-permit-holder-zip', 'primary-permit-holder-zip-error', 'Valid ZIP code is required.');
  fieldValidation.validateMinMax('primary-permit-holder-zip', 'primary-permit-holder-zip-error', 5, 5);
  fieldValidation.validateEmailField('email', 'email-error', 'Valid email address is required.');
  fieldValidation.validateNumberField('day-phone', 'day-phone-error', 'Valid phone is required.');
  fieldValidation.validateMinMax('day-phone', 'day-phone-error', 10, 10, true);
  it('should select individual by default', () => {
    expect<any>(element(by.id('individual')).isSelected()).toBe(true);
    expect<any>(element(by.id('primary-permit-holder-first-name')).isPresent()).toBe(true);
    expect<any>(element(by.id('primary-permit-holder-last-name')).isPresent()).toBe(true);
    expect<any>(element(by.id('organization')).isSelected()).toBe(false);
    expect<any>(element(by.id('organization-name')).isPresent()).toBe(false);
    checkForPrimaryPermitHolderAddress(true);
  });
  it('should not display organziation by default', () => {
    checkForOrganizationAddress(false);
  });
  it('should display organization name if organization is selected, and hide individual name', () => {
    element(by.id('organization')).click();
    expect<any>(element(by.id('individual')).isSelected()).toBe(false);
    expect<any>(element(by.id('organization')).isSelected()).toBe(true);
    expect<any>(element(by.id('organization-name')).isPresent()).toBe(true);
    checkForPrimaryPermitHolderAddress(false);
    checkForOrganizationAddress(true);
  });
  fieldValidation.validateSimpleTextField('organization-name', 'organization-name-error', 'Organization name is required.');
  it('should display primary permit holder if applying as an organization', () => {
    expect<any>(element(by.id('primary-permit-holder-first-name')).isPresent()).toBe(true);
  });
  it('should not select addional phone by default', () => {
    expect<any>(element(by.id('add-additional-phone')).isSelected()).toBe(false);
    return checkForAdditionalPhone(false);
  });
  it('should see additional phone if add addtional phone checkbox is clicked', () => {
    element(by.id('add-additional-phone')).click();
    expect<any>(element(by.id('add-additional-phone')).isSelected()).toBe(true);
    return checkForAdditionalPhone(true);
  });
  fieldValidation.validateNumberField('evening-phone', 'evening-phone-error', 'Valid phone is required.');
  fieldValidation.validateMinMax('evening-phone', 'evening-phone-error', 10, 10, true);
  it('should hide additional phone if add addtional phone checkbox is clicked', () => {
    element(by.id('add-additional-phone')).click();
    expect<any>(element(by.id('add-additional-phone')).isSelected()).toBe(false);
    return checkForAdditionalPhone(false);
  });
  it('should default the "Permit holder address same as group address checkbox" to checked', () => {
    expect<any>(element(by.id('primary-permit-holder-same-address')).isSelected()).toBe(true);
  });
  // fieldValidation.validateSimpleTextField(
  //   'primary-permit-holder-first-name2',
  //   'primary-permit-holder-first-name-error2',
  //   'Primary permit holder first name is required.'
  // );
  it('should show primary permit holder address fields if same checkbox is unchecked', () => {
    element(by.id('primary-permit-holder-same-address')).click();
    return checkForPrimaryPermitHolderAddress(true);
  });
  it('should hide primary permit holder address fields if "permit holder same as organization address" is checked', () => {
    element(by.id('primary-permit-holder-same-address')).click();
    return checkForPrimaryPermitHolderAddress(false);
  });
  it('should not show additional permit holder name or address fields by default', () => {
    expect<any>(element(by.id('secondary-permit-holder-first-name')).isPresent()).toBe(false);
    return checkForSecondPermitHolderAddress(false);
  });
  it('should show secondary permit holder name field but hide secondary address fields if add input is checked', () => {
    element(by.id('add-secondary-permit-holder')).click();
    expect<any>(element(by.id('secondary-permit-holder-first-name')).isPresent()).toBe(true);
    return checkForSecondPermitHolderAddress(false);
  });
  fieldValidation.validateSimpleTextField('secondary-permit-holder-first-name', 'secondary-permit-holder-first-name-error', 'Secondary permit holder first name is required.');
  fieldValidation.validateSimpleTextField('secondary-permit-holder-last-name', 'secondary-permit-holder-last-name-error', 'Secondary permit holder last name is required.');
  it('should show secondary permit holder address fields if "secondary-permit-holder-same-address" is checked', () => {
    element(by.id('secondary-permit-holder-same-address')).click();
    return checkForSecondPermitHolderAddress(true);
  });
  fieldValidation.validateSimpleTextField('secondary-permit-holder-address', 'secondary-permit-holder-address-error', 'Street address 1 is required.');
  fieldValidation.validateSimpleTextField('secondary-permit-holder-city', 'secondary-permit-holder-city-error', 'City is required.');
  fieldValidation.validateSimpleTextField('secondary-permit-holder-state', 'secondary-permit-holder-state-error', 'State is required.');
  fieldValidation.validateNumberField('secondary-permit-holder-zip', 'secondary-permit-holder-zip-error', 'Valid ZIP code is required.');
  fieldValidation.validateMinMax('secondary-permit-holder-zip', 'secondary-permit-holder-zip-error', 5, 5);
  it('should hide secondary permit holder address fields, but remain secondary permit holder name if hide button is clicked', () => {
    element(by.id('secondary-permit-holder-same-address')).click();
    expect<any>(element(by.id('secondary-permit-holder-first-name')).isPresent()).toBe(true);
    return checkForSecondPermitHolderAddress(false);
  });
  it('should hide secondary permit holder name and address fields if add secondary input is unchecked', () => {
    element(by.id('add-secondary-permit-holder')).click();
    expect<any>(element(by.id('secondary-permit-holder-name')).isPresent()).toBe(false);
    return checkForSecondPermitHolderAddress(false);
  });

  fieldValidation.validateSimpleTextField('location', 'location-error', 'Location is required.');
  fieldValidation.validateNumberField('participants', 'participants-error', 'Participants is required.');
  fieldValidation.validateSimpleTextField('activity-description', 'activity-description-error', 'Activity description is required.');

  fieldValidation.validateSimpleTextField('signature', 'signature-error', 'Initials are required.');

  it('should submit an application with only the required fields populated', () => {
    page.navigateTo();
    element(by.id('individual')).click();
    element(by.id('primary-permit-holder-first-name')).sendKeys('Micky');
    element(by.id('primary-permit-holder-last-name')).sendKeys('Watson');
    element(by.id('primary-permit-holder-address')).sendKeys('933 Easy St');
    element(by.id('primary-permit-holder-city')).sendKeys('Madison');
    element(by.id('primary-permit-holder-state')).sendKeys('WI');
    element(by.id('primary-permit-holder-zip')).sendKeys('55555');
    element(by.id('email')).sendKeys('msdf@noemail.com');
    element(by.id('day-phone')).sendKeys('3333333333');
    element(by.id('name')).sendKeys('Walk in the park');
    element(by.id('location')).sendKeys('Forest');
    element(by.id('participants')).sendKeys('3');
    element(by.id('spectators')).sendKeys('4');
    element(by.id('activity-description')).sendKeys('Walking around');
    element(by.id('start-month')).sendKeys('10');
    element(by.id('start-day')).sendKeys('10');
    element(by.id('start-year')).sendKeys('2020');
    element(by.id('start-hour')).sendKeys('10');
    element(by.id('start-minutes')).sendKeys('10');
    element(by.id('start-period')).sendKeys('AM');
    element(by.id('end-month')).sendKeys('10');
    element(by.id('end-day')).sendKeys('10');
    element(by.id('end-year')).sendKeys('2020');
    element(by.id('end-hour')).sendKeys('10');
    element(by.id('end-minutes')).sendKeys('10');
    element(by.id('end-period')).sendKeys('PM');
    element(by.id('signature')).sendKeys('SA');
    element(by.id('submit-application')).click();
    expect<any>(element(by.css('app-root h1')).getText()).toEqual('Submitted for review!');
  });
});
