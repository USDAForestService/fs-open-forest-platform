import { browser, element, by } from 'protractor';
import { loginPublic } from '../../support/auth-helper';
import { TempOutfittersForm } from './app.po';
import { FieldValidation } from './field-validation.po';
const path = require('path');

const testSuccessFile = path.resolve(__dirname, 'test-files/success.pdf');

const page = new TempOutfittersForm();
const fieldValidation = new FieldValidation();

describe('Apply for a temp outfitters permit', () => {
  beforeAll(() => {
    browser.driver.manage().deleteAllCookies();
    browser.driver.manage().window().setSize(1400, 900);

    page.navigateTo();

    loginPublic();
  });

  it('should display the permit name in the header', () => {
    page.navigateTo();
    expect<any>(element(by.css('app-root h2')).getText()).toEqual('Apply for a temporary outfitters permit with Open Forest.');
  });

  it('should not show errors by default', () => {
    expect<any>(element(by.id('form-errors')).isPresent()).toBeFalsy();
  });

  fieldValidation.validateFileUploadField('insurance-certificate', 'pdf', true);

  it('should display good standing evidence upload field and business name if organization is clicked', () => {
    element(by.id('organization-label')).click();
    expect<any>(element(by.id('good-standing-evidence-wrapper')).isPresent()).toBeTruthy();
    expect<any>(element(by.id('organization-name')).isPresent()).toBeTruthy();
  });

  it('should not submit application if not all required fields are entered', () => {
    element(by.id('good-standing-evidence')).sendKeys(testSuccessFile);
    element(by.css('.primary-permit-holder-first-name')).sendKeys('test');
    element(by.css('.primary-permit-holder-last-name')).sendKeys('test');
    element(by.id('organization-name')).sendKeys('test');
    element(by.css('.primary-permit-holder-address')).sendKeys('test');
    element(by.css('.primary-permit-holder-address-line-2')).sendKeys('test');
    element(by.css('.primary-permit-holder-city')).sendKeys('test');
    element(by.css('.primary-permit-holder-state')).sendKeys('AK');
    element(by.css('.primary-permit-holder-zip')).sendKeys('55555');
    element(by.id('day-phone')).sendKeys('2222222222');
    element(by.id('day-phone-ext')).sendKeys('2222');
    element(by.id('submit-application')).click();
    expect<any>(element(by.id('form-errors')).isPresent()).toBeTruthy();
  });

  it('should navigate back to temp outfitter', () => {
    page.navigateTo();
    expect<any>(element(by.css('app-root h2')).getText()).toEqual('Apply for a temporary outfitters permit with Open Forest.');
  });

  fieldValidation.validateFileUploadField('guide-document', 'xls');
  fieldValidation.validateFileUploadField('acknowledgement-of-risk-form', 'pdf');
  fieldValidation.validateFileUploadField('insurance-certificate', 'pdf');
  fieldValidation.validateFileUploadField('operating-plan', 'pdf');
  fieldValidation.validateFileUploadField('location-map', 'pdf');

});
