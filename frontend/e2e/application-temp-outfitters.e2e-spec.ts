import { TempOutfittersForm } from './app.po';
import { FieldValidation } from './field-validation.po';
import { browser, element, by, Key } from 'protractor';

describe('Apply for a temp outfitters permit', () => {
  let page: TempOutfittersForm;
  let fieldValidation: FieldValidation;
  fieldValidation = new FieldValidation();

  beforeEach(() => {
    page = new TempOutfittersForm();
  });

  it('should display the permit name in the header', () => {
    page.navigateTo();
    expect<any>(element(by.css('app-root h1')).getText()).toEqual('Apply for a temporary outfitters permit.');
  });

  it('should not show errors by default', () => {
    expect<any>(element(by.id('form-errors')).isPresent()).toBeFalsy();
  });

  fieldValidation.validateFileUploadField('section-guide-identification');
  fieldValidation.validateFileUploadField('section-acknowledgement-of-risk');
  fieldValidation.validateFileUploadField('section-liability-insurance');
  fieldValidation.validateFileUploadField('section-operating-plan');

  it('should not submit application if not all required fields are entered', () => {
    element(by.id('primary-permit-holder-first-name')).sendKeys('test');
    element(by.id('primary-permit-holder-last-name')).sendKeys('test');
    element(by.id('organization-name')).sendKeys('test');
    element(by.id('primary-permit-holder-address')).sendKeys('test');
    element(by.id('primary-permit-holder-address-line-2')).sendKeys('test');
    element(by.id('primary-permit-holder-city')).sendKeys('test');
    element(by.id('primary-permit-holder-state')).sendKeys('AK');
    element(by.id('primary-permit-holder-zip')).sendKeys('55555');
    element(by.id('day-phone')).sendKeys('2222222222');
    element(by.id('day-ext')).sendKeys('2222');
    element(by.id('submit-application')).click();
    expect<any>(element(by.id('form-errors')).isPresent()).toBeTruthy();
  });

  //  fieldValidation.validateFileUploadField('good-standing-evidence-wrapper');

  it('should submit an application with only the required fields populated', () => {
    element(by.id('email')).sendKeys('test@test.com');
    element(by.id('organization-label')).click();
    element(by.id('number-of-trips')).sendKeys('10');
    element(by.id('party-size')).sendKeys('11');
    element(by.id('start-month')).sendKeys('10');
    element(by.id('start-day')).sendKeys('10');
    element(by.id('start-year')).sendKeys('2020');
    element(by.id('end-month')).sendKeys('10');
    element(by.id('end-day')).sendKeys('10');
    element(by.id('end-year')).sendKeys('2020');
    element(by.id('location-description')).sendKeys('test');
    element(by.id('services-provided')).sendKeys('test');
    element(by.id('audience-description')).sendKeys('test');
    element(by.id('description-of-cleanup-and-restoration')).sendKeys('test');
    element(by.id('advertising-description')).sendKeys('test');
    element(by.id('advertising-url')).sendKeys('http://test.com');
    element(by.id('client-charges')).sendKeys('test');
    element(by.id('signature')).sendKeys('test');
    element(by.id('submit-application')).click();
    expect<any>(element(by.css('app-root h1')).getText()).toEqual('Submitted for review!');
  });

  it('should navigate back to temp outfitter', () => {
    page.navigateTo();
    expect<any>(element(by.css('app-root h1')).getText()).toEqual('Apply for a temporary outfitters permit.');
  });

  fieldValidation.validateFileUploadField('section-guide-identification');
  fieldValidation.validateFileUploadField('section-acknowledgement-of-risk');
  fieldValidation.validateFileUploadField('section-liability-insurance');
  fieldValidation.validateFileUploadField('section-operating-plan');

  it('should submit an application', () => {
    element(by.id('primary-permit-holder-first-name')).sendKeys('test');
    element(by.id('primary-permit-holder-last-name')).sendKeys('test');
    element(by.id('organization-name')).sendKeys('test');
    element(by.id('primary-permit-holder-address')).sendKeys('test');
    element(by.id('primary-permit-holder-address-line-2')).sendKeys('test');
    element(by.id('primary-permit-holder-city')).sendKeys('test');
    element(by.id('primary-permit-holder-state')).sendKeys('AK');
    element(by.id('primary-permit-holder-zip')).sendKeys('55555');
    element(by.id('day-phone')).sendKeys('2222222222');
    element(by.id('day-ext')).sendKeys('2222');
    element(by.id('add-additional-phone-label')).click();
    element(by.id('evening-phone')).sendKeys('1111111111');
    element(by.id('evening-ext')).sendKeys('1111');
    element(by.id('fax')).sendKeys('3333333333');
    element(by.id('fax-extension')).sendKeys('');
    element(by.id('email')).sendKeys('test@test.com');
    element(by.id('website')).sendKeys('http://test.com');
    element(by.id('llc-label')).click();
    element(by.id('individual-label')).click();
    element(by.id('individual-citizen-label')).click();
    element(by.id('small-business-label')).click();
    element(by.id('number-of-trips')).sendKeys('10');
    element(by.id('party-size')).sendKeys('11');
    element(by.id('start-month')).sendKeys('10');
    element(by.id('start-day')).sendKeys('10');
    element(by.id('start-year')).sendKeys('2020');
    element(by.id('end-month')).sendKeys('10');
    element(by.id('end-day')).sendKeys('10');
    element(by.id('end-year')).sendKeys('2020');
    element(by.id('location-description')).sendKeys('test');
    element(by.id('services-provided')).sendKeys('test');
    element(by.id('audience-description')).sendKeys('test');
    element(by.id('need-government-facilities-label')).click();
    element(by.id('list-of-government-facilities')).sendKeys('test');
    element(by.id('need-temporary-improvements-label')).click();
    element(by.id('list-of-temporary-improvements')).sendKeys('test');
    element(by.id('have-motorized-equipment-label')).click();
    element(by.id('statement-of-motorized-equipment')).sendKeys('test');
    element(by.id('have-livestock-label')).click();
    element(by.id('statement-of-transportation-of-livestock')).sendKeys('test');
    element(by.id('need-assigned-site-label')).click();
    element(by.id('statement-of-assigned-site')).sendKeys('test');
    element(by.id('description-of-cleanup-and-restoration')).sendKeys('test');
    element(by.id('advertising-description')).sendKeys('test');
    element(by.id('advertising-url')).sendKeys('http://test.com');
    element(by.id('client-charges')).sendKeys('test');
    element(by.id('have-national-forest-permits-label')).click();
    element(by.id('list-all-national-forest-permits')).sendKeys('test');
    element(by.id('have-other-permits-label')).click();
    element(by.id('list-all-other-permits')).sendKeys('test');
    element(by.id('have-citations-label')).click();
    element(by.id('list-all-citations')).sendKeys('test');
    element(by.id('signature')).sendKeys('test');
    element(by.id('submit-application')).click();
    expect<any>(element(by.css('app-root h1')).getText()).toEqual('Submitted for review!');
  });
});
