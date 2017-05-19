import { NoncommercialGroupForm } from './app.po';
import { FieldValidation } from './field-validation.po';
import { browser, element, by, Key} from 'protractor';

const checkForPrimaryPermitHolderAddress = function (state) {
  expect(element(by.id('primary-permit-holder-address')).isPresent()).toBe(state);
  expect(element(by.id('primary-permit-holder-address-line-2')).isPresent()).toBe(state);
  expect(element(by.id('primary-permit-holder-city')).isPresent()).toBe(state);
  expect(element(by.id('primary-permit-holder-state')).isPresent()).toBe(state);
  expect(element(by.id('primary-permit-holder-zip')).isPresent()).toBe(state);
};

const checkForSecondPermitHolderAddress = function (state) {
  expect(element(by.id('secondary-permit-holder-address')).isPresent()).toBe(state);
  expect(element(by.id('secondary-permit-holder-address-line-2')).isPresent()).toBe(state);
  expect(element(by.id('secondary-permit-holder-city')).isPresent()).toBe(state);
  expect(element(by.id('secondary-permit-holder-state')).isPresent()).toBe(state);
  expect(element(by.id('secondary-permit-holder-zip')).isPresent()).toBe(state);
};

const checkForAdditionalPhone = function (state) {
  expect(element(by.id('night-phone-1')).isPresent()).toBe(state);
  expect(element(by.id('night-phone-2')).isPresent()).toBe(state);
  expect(element(by.id('night-phone-3')).isPresent()).toBe(state);
  expect(element(by.id('night-phone-4')).isPresent()).toBe(state);
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
    expect(element(by.css('app-root h1')).getText()).toEqual('Apply for a Noncommercial Group Use Permit');
  });
  fieldValidation.validateSimpleTextField('name', 'name-error', 'Event name is required');
  fieldValidation.validateSimpleTextField(
    'first-permit-holder-name',
    'first-permit-holder-name-error',
    'Primary permit holder name is required'
  );
  fieldValidation.validateSimpleTextField('address', 'address-error', 'Address line 1 is required');
  fieldValidation.validateSimpleTextField('city', 'city-error', 'City is required');
  fieldValidation.validateSimpleTextField('state', 'state-error', 'State is required');
  fieldValidation.validateNumberField('zip', 'zip-error', 'Valid ZIP code is required');
  fieldValidation.validateMinMax('zip', 'zip-error', 5, 5);
  fieldValidation.validateEmailField('email', 'email-error', 'Valid email address is required');
  fieldValidation.validateNumberField('day-phone-1', 'day-phone-error', 'Valid phone is required');
  fieldValidation.validateMinMax('day-phone-1', 'day-phone-error', 3, 3, true);
  fieldValidation.validateNumberField('day-phone-2', 'day-phone-error', 'Valid phone is required');
  fieldValidation.validateMinMax('day-phone-2', 'day-phone-error', 3, 3, true);
  fieldValidation.validateNumberField('day-phone-3', 'day-phone-error', 'Valid phone is required');
  fieldValidation.validateMinMax('day-phone-3', 'day-phone-error', 4, 4, true);
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
  fieldValidation.validateSimpleTextField('organization-name', 'organization-name-error', 'Organization name is required');
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
  fieldValidation.validateNumberField('night-phone-1', 'night-phone-error', 'Valid phone is required');
  fieldValidation.validateMinMax('night-phone-1', 'night-phone-error', 3, 3, true);
  fieldValidation.validateNumberField('night-phone-2', 'night-phone-error', 'Valid phone is required');
  fieldValidation.validateMinMax('night-phone-2', 'night-phone-error', 3, 3, true);
  fieldValidation.validateNumberField('night-phone-3', 'night-phone-error', 'Valid phone is required');
  fieldValidation.validateMinMax('night-phone-3', 'night-phone-error', 4, 4, true);
  it('should hide additional phone if add addtional phone checkbox is clicked', () => {
    element(by.id('add-additional-phone')).click();
    expect(element(by.id('add-additional-phone')).isSelected()).toBe(false);
    return checkForAdditionalPhone(false);
  });
  it('should default the "Permit holder address same as group address checkbox" to checked', () => {
    expect(element(by.id('primary-permit-holder-same-address')).isSelected()).toBe(true);
  });
  fieldValidation.validateSimpleTextField(
    'primary-permit-holder-name',
    'primary-permit-holder-name-error',
    'Primary permit holder name is required'
  );
  it('should show primary permit holder address fields if same checkbox is unchecked', () => {
    element(by.id('primary-permit-holder-same-address')).click();
    return checkForPrimaryPermitHolderAddress(true);
  });
  fieldValidation.validateSimpleTextField(
    'primary-permit-holder-address',
    'primary-permit-holder-address-error',
    'Address line 1 is required'
  );
  fieldValidation.validateSimpleTextField('primary-permit-holder-city', 'primary-permit-holder-city-error', 'City is required');
  fieldValidation.validateSimpleTextField('primary-permit-holder-state', 'primary-permit-holder-state-error', 'State is required');
  fieldValidation.validateNumberField('primary-permit-holder-zip', 'primary-permit-holder-zip-error', 'Valid ZIP code is required');
  fieldValidation.validateMinMax('primary-permit-holder-zip', 'primary-permit-holder-zip-error', 5, 5);
  it('should hide primary permit holder address fields if "permit holder same as organization address" is checked', () => {
    element(by.id('primary-permit-holder-same-address')).click();
    return checkForPrimaryPermitHolderAddress(false);
  });
  it('should not show additional permit holder name or address fields by default', () => {
    expect(element(by.id('secondary-permit-holder-name')).isPresent()).toBe(false);
    return checkForSecondPermitHolderAddress(false);
  });
  it('should show secondary permit holder name field but hide secondary address fields if add input is checked', () => {
    element(by.id('add-secondary-permit-holder')).click();
    expect(element(by.id('secondary-permit-holder-name')).isPresent()).toBe(true);
    return checkForSecondPermitHolderAddress(false);
  });
  fieldValidation.validateSimpleTextField(
    'secondary-permit-holder-name',
    'secondary-permit-holder-name-error',
    'Secondary permit holder name is required'
  );
  it('should show secondary permit holder address fields if "secondary-permit-holder-same-address" is checked', () => {
    element(by.id('secondary-permit-holder-same-address')).click();
    return checkForSecondPermitHolderAddress(true);
  });
  fieldValidation.validateSimpleTextField(
    'secondary-permit-holder-address',
    'secondary-permit-holder-address-error',
    'Address line 1 is required'
  );
  fieldValidation.validateSimpleTextField('secondary-permit-holder-city', 'secondary-permit-holder-city-error', 'City is required');
  fieldValidation.validateSimpleTextField('secondary-permit-holder-state', 'secondary-permit-holder-state-error', 'State is required');
  fieldValidation.validateNumberField('secondary-permit-holder-zip', 'secondary-permit-holder-zip-error', 'Valid ZIP code is required');
  fieldValidation.validateMinMax('secondary-permit-holder-zip', 'secondary-permit-holder-zip-error', 5, 5);
  it('should hide secondary permit holder address fields, but remain secondary permit holder name if hide button is clicked', () => {
    element(by.id('secondary-permit-holder-same-address')).click();
    expect(element(by.id('secondary-permit-holder-name')).isPresent()).toBe(true);
    return checkForSecondPermitHolderAddress(false);
  });
  it('should hide secondary permit holder name and address fields if add secondary input is unchecked', () => {
    element(by.id('add-secondary-permit-holder')).click();
    expect(element(by.id('secondary-permit-holder-name')).isPresent()).toBe(false);
    return checkForSecondPermitHolderAddress(false);
  });

  fieldValidation.validateSimpleTextField('location', 'location-error', 'Location is required');
  fieldValidation.validateNumberField('participants', 'participants-error', 'Participants is required');
  fieldValidation.validateSimpleTextField('activity-description', 'activity-description-error', 'Activity Description is required');

  fieldValidation.validateNumberField('end-month', 'start-date-error', 'Start date is required');
  fieldValidation.validateMinMax('start-month', 'start-date-error', 1, 2, true);
  fieldValidation.validateNumberField('start-day', 'start-date-error', 'Start date is required');
  fieldValidation.validateMinMax('start-day', 'start-date-error', 1, 2, true);
  fieldValidation.validateNumberField('start-year', 'start-date-error', 'Start date is required');
  fieldValidation.validateMinMax('start-year', 'start-date-error', 4, 4, true);

  fieldValidation.validateSimpleTextField('start-hour', 'start-time-error', 'Start time is required', true);
  fieldValidation.validateSimpleTextField('start-minutes', 'start-time-error', 'Start time is required', true);
  fieldValidation.validateSimpleTextField('start-period', 'start-time-error', 'Start time is required', true);

  fieldValidation.validateNumberField('end-month', 'end-date-error', 'End date is required');
  fieldValidation.validateMinMax('end-month', 'end-date-error', 1, 2, true);
  fieldValidation.validateNumberField('end-day', 'end-date-error', 'End date is required');
  fieldValidation.validateMinMax('end-day', 'end-date-error', 1, 2, true);
  fieldValidation.validateNumberField('end-year', 'end-date-error', 'End date is required');
  fieldValidation.validateMinMax('end-year', 'end-date-error', 4, 4, true);

  fieldValidation.validateSimpleTextField('end-hour', 'end-time-error', 'End time is required', true);
  fieldValidation.validateSimpleTextField('end-minutes', 'end-time-error', 'End time is required', true);
  fieldValidation.validateSimpleTextField('end-period', 'end-time-error', 'End time is required', true);

  fieldValidation.validateSimpleTextField('signature', 'signature-error', 'Signature is required');
});
