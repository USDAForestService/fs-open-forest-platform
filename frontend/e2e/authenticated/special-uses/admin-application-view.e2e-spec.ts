import { AdminApplicationList, NoncommercialGroupForm } from './app.po';
import { NoncommercialApplicationForm } from './noncommercial-application-form.po';
import { FieldValidation } from './field-validation.po';
import { browser, element, by, Key } from 'protractor';

describe('Admin applications page', () => {
  let page: AdminApplicationList;
  let noncommercial: NoncommercialGroupForm;
  let applicationForm: NoncommercialApplicationForm;

  beforeAll(() => {
    noncommercial = new NoncommercialGroupForm;
    applicationForm = new NoncommercialApplicationForm;
    noncommercial.navigateTo();
    browser.sleep(500);
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/applications/noncommercial-group-use/new');
    applicationForm.createApplication();
  });

  beforeEach(() => {
    page = new AdminApplicationList();
  });

  it('should have three call to action buttons', () => {
    page.navigateTo();
    element(by.css(`.application-field-list-values .application-details .usa-button`)).click();
    browser.sleep(500);

    expect(element(by.id('accept-application-btn')).isPresent()).toBeTruthy();
    expect(element(by.id('hold-application-btn')).isPresent()).toBeTruthy();
    expect(element(by.id('return-application-btn')).isPresent()).toBeTruthy();
  });

  it('should have breadcrumbs', () => {
    expect<any>(element(by.css('.breadcrumbs')).isPresent()).toBeTruthy();
  });

  it('should return to list page on hold click', () => {
    element(by.id('hold-application-btn')).click();
    expect(element(by.css('#reason-for-action label')).getText()).toEqual('Why is this application on hold?');

    element(by.id('reason-for-return')).sendKeys('test');
    element(by.css('.reason-for-action-buttons .usa-button-primary')).click();
    expect<any>(element(by.css('.usa-alert-body .usa-alert-text')).getText()).toEqual(
      'Permit application successfully put on hold and an email with your message has been sent to the applicant.'
    );
  });

  it('should return to view application page to update status', () => {
    element(by.css(`.application-field-list-values .application-details .usa-button`)).click();

    element(by.id('accept-application-btn')).click();
    expect(element(by.css('#reason-for-action label')).getText()).toEqual('Additional message for the permit holder.');
    element(by.css('.reason-for-action-buttons .usa-button-secondary-alt')).click();

    element(by.id('hold-application-btn')).click();
    expect(element(by.css('#reason-for-action label')).getText()).toEqual(
      'Why should hold status be removed from this application?'
    );
    element(by.css('.reason-for-action-buttons .usa-button-secondary-alt')).click();

    element(by.id('return-application-btn')).click();
    expect(element(by.css('#reason-for-action label')).getText()).toEqual('Why is this application being rejected?');
    element(by.id('reason-for-return')).sendKeys('test');
    element(by.css('.reason-for-action-buttons .usa-button-red')).click();
    expect<any>(element(by.css('.usa-alert-body .usa-alert-text')).getText()).toEqual(
      'Permit application successfully rejected and an email with your message has been sent to the applicant.'
    );
  });
});
