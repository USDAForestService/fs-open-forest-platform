import { AdminApplicationList } from './app.po';
import { FieldValidation } from './field-validation.po';
import { browser, element, by, Key } from 'protractor';

describe('Admin applications page', () => {
  let page: AdminApplicationList;

  beforeEach(() => {
    page = new AdminApplicationList();
  });

  it('should go to application view page on click', () => {
    page.navigateTo();

    element(by.css(`#${page.permitId()} .application-details .usa-button`)).click();

    browser.sleep(500);

    expect<any>(element(by.css('app-root h1')).getText()).toEqual('test event');
  });

  it('should have three call to action buttons', () => {
    expect(element(by.id('accept-application-btn')).isPresent()).toBeTruthy();
    expect(element(by.id('hold-application-btn')).isPresent()).toBeTruthy();
    expect(element(by.id('return-application-btn')).isPresent()).toBeTruthy();
  });

  it('should have breadcrumbs', () => {
    expect<any>(element(by.css('.breadcrumbs')).isPresent()).toBeTruthy();
  });

  it('should have type noncommercial', () => {
    expect<any>(element(by.id('permit-type')).getText()).toEqual('Noncommercial');
  });

  it('should return to list page on hold click', () => {
    element(by.id('hold-application-btn')).click();
    expect(element(by.css('#reason-for-action label')).getText()).toEqual('Why is this application on hold?');

    element(by.id('reason-for-return')).sendKeys('test');
    element(by.css('.reason-for-action-buttons .usa-button')).click();
    expect<any>(element(by.css('.usa-alert-body .usa-alert-text')).getText()).toEqual(
      'Permit application successfully put on hold and an email with your message has been sent to the applicant.'
    );
  });

  it('should return to view application page to update status', () => {
    element(by.css(`#${page.permitId()} .application-details .usa-button`)).click();

    element(by.id('accept-application-btn')).click();
    expect(element(by.css('#reason-for-action label')).getText()).toEqual('Additional message for the permit holder.');
    element(by.css('.reason-for-action-buttons .usa-button-outline')).click();

    element(by.id('hold-application-btn')).click();
    expect(element(by.css('#reason-for-action label')).getText()).toEqual(
      'Why should hold status be removed from this application?'
    );
    element(by.css('.reason-for-action-buttons .usa-button-outline')).click();

    element(by.id('return-application-btn')).click();
    expect(element(by.css('#reason-for-action label')).getText()).toEqual('Why is this application being rejected?');
    element(by.id('reason-for-return')).sendKeys('test');
    element(by.css('.reason-for-action-buttons .usa-button-secondary')).click();
    expect<any>(element(by.css('.usa-alert-body .usa-alert-text')).getText()).toEqual(
      'Permit application successfully rejected and an email with your message has been sent to the applicant.'
    );
  });
});
