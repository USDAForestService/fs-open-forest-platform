import { NoncommercialGroupForm } from './app.po';
import { FieldValidation } from './field-validation.po';
import { browser, element, by, Key, protractor } from 'protractor';

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
  expect<any>(element(by.id('evening-phone-ext')).isPresent()).toBe(state);
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

  it('should submit an application as individual with only the required fields populated', () => {
    page.navigateTo();
    element(by.css('#person-primary-name .primary-permit-holder-first-name')).sendKeys('Micky');
    element(by.css('#person-primary-name .primary-permit-holder-last-name')).sendKeys('Watson');
    element(by.css('#person-primary-address .primary-permit-holder-address')).sendKeys('933 Easy St');
    element(by.css('#person-primary-address .primary-permit-holder-city')).sendKeys('Madison');
    element(by.css('#person-primary-address .primary-permit-holder-state')).sendKeys('WI');
    element(by.css('#person-primary-address .primary-permit-holder-zip')).sendKeys('55555');
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
    element(by.id('end-hour')).sendKeys('10');
    element(by.id('end-minutes')).sendKeys('10');
    element(by.id('end-period')).sendKeys('PM');
    element(by.id('signature')).sendKeys('SA');
    element(by.id('submit-application')).click();
    expect<any>(element(by.css('app-root h1')).getText()).toEqual('Submitted for review!');
  });

  it('should submit an application as an organization with all fields populated', () => {
    page.navigateTo();
    const ec = protractor.ExpectedConditions;
    browser.wait(ec.presenceOf(element(by.id('organization-label'))));
    element(by.id('organization-label')).click();
    element(by.id('organization-name')).sendKeys('Test organization');
    element(by.css('.organization-address')).sendKeys('933 Easy St');
    element(by.css('.organization-city')).sendKeys('Madison');
    element(by.css('.organization-state')).sendKeys('WI');
    element(by.css('.organization-zip')).sendKeys('55555');
    element(by.id('email')).sendKeys('msdf@noemail.com');
    element(by.id('day-phone')).sendKeys('2222222222');
    element(by.id('day-phone-ext')).sendKeys('2222');
    element(by.id('add-additional-phone-label')).click();
    element(by.id('evening-phone')).sendKeys('1111111111');
    element(by.id('evening-phone-ext')).sendKeys('1111');
    element(by.id('website')).sendKeys('http://test.com');
    element(by.css('#organization-primary-name .primary-permit-holder-first-name')).sendKeys('Micky');
    element(by.css('#organization-primary-name .primary-permit-holder-last-name')).sendKeys('Watson');
    element(by.id('primary-permit-holder-same-address-label')).click();
    element(by.css('#organization-primary-address .primary-permit-holder-address')).sendKeys('933 Easy St');
    element(by.css('#organization-primary-address .primary-permit-holder-city')).sendKeys('Madison');
    element(by.css('#organization-primary-address .primary-permit-holder-state')).sendKeys('WI');
    element(by.css('#organization-primary-address .primary-permit-holder-zip')).sendKeys('55555');
    element(by.id('add-secondary-permit-holder-label')).click();
    element(by.css('.secondary-permit-holder-first-name')).sendKeys('Micky');
    element(by.css('.secondary-permit-holder-last-name')).sendKeys('Watson');
    element(by.id('secondary-permit-holder-same-address-label')).click();
    element(by.css('.secondary-permit-holder-address')).sendKeys('933 Easy St');
    element(by.css('.secondary-permit-holder-city')).sendKeys('Madison');
    element(by.css('.secondary-permit-holder-state')).sendKeys('WI');
    element(by.css('.secondary-permit-holder-zip')).sendKeys('55555');
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
    element(by.id('end-hour')).sendKeys('10');
    element(by.id('end-minutes')).sendKeys('10');
    element(by.id('end-period')).sendKeys('PM');
    element(by.id('signature')).sendKeys('SA');
    element(by.id('submit-application')).click();
    expect<any>(element(by.css('app-root h1')).getText()).toEqual('Submitted for review!');
  });
});
