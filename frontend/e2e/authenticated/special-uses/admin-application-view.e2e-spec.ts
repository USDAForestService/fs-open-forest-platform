import { browser, element, by } from 'protractor';
import { loginAdmin, loginPublic } from '../../support/auth-helper';
import { AdminApplicationList, NoncommercialGroupForm } from './app.po';
import { NoncommercialApplicationForm } from './noncommercial-application-form.po';

const page = new AdminApplicationList();
const noncommercial = new NoncommercialGroupForm();
const applicationForm = new NoncommercialApplicationForm();

describe('Admin applications page', () => {
  beforeAll(() => {
    browser.driver.manage().deleteAllCookies();

    noncommercial.navigateTo();

    loginPublic();

    expect<any>(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/mbs/applications/noncommercial-group-use/new');
    applicationForm.createApplication();
  });

  beforeAll(() => {
    page.navigateTo();
    loginAdmin();
  });

  describe('a pending application', () => {
    beforeAll(() => {
      page.navigateTo();
      element.all(by.css(`.application-field-list-values .application-details .usa-button`)).first().click();
      browser.sleep(2000);
    });

    it('should have three call to action buttons', () => {
      expect<any>(element(by.id('accept-application-btn')).isPresent()).toBeTruthy();
      expect<any>(element(by.id('hold-application-btn')).isPresent()).toBeTruthy();
      expect<any>(element(by.id('return-application-btn')).isPresent()).toBeTruthy();
    });

    it('should have breadcrumbs', () => {
      expect<any>(element(by.css('.breadcrumbs')).isPresent()).toBeTruthy();
    });

    it('should not show SUDS ID', () => {
      expect<any>(element(by.id('suds-id')).isPresent()).toBeFalsy();
    });

    it('should return to list page on hold click', () => {
      element(by.id('hold-application-btn')).click();
      expect<any>(element(by.css('#reason-for-action label')).getText()).toEqual('Why is this application on hold?');

      element(by.id('reason-for-return')).sendKeys('test');
      element(by.css('.reason-for-action-buttons .usa-button-primary')).click();
      expect<any>(element.all(by.css('.usa-alert-body .usa-alert-text')).first().getText()).toEqual(
        'Permit application successfully put on hold and an email with your message has been sent to the applicant.'
      );
    });

    it('should return to view application page to update status', () => {
      element.all(by.css(`.application-field-list-values .application-details .usa-button`)).first().click();

      element(by.id('accept-application-btn')).click();
      expect<any>(element(by.css('#reason-for-action label')).getText()).toEqual('Additional message for the permit holder.');
      element(by.css('.reason-for-action-buttons .usa-button-secondary-alt')).click();

      element(by.id('hold-application-btn')).click();
      expect<any>(element(by.css('#reason-for-action label')).getText()).toEqual(
        'Why should hold status be removed from this application?'
      );
      element(by.css('.reason-for-action-buttons .usa-button-secondary-alt')).click();

      element(by.id('return-application-btn')).click();
      expect<any>(element(by.css('#reason-for-action label')).getText()).toEqual('Why is this application being rejected?');
      element(by.id('reason-for-return')).sendKeys('test');
      element(by.css('.reason-for-action-buttons .usa-button-red')).click();
      expect<any>(element.all(by.css('.usa-alert-body .usa-alert-text')).first().getText()).toEqual(
        'Permit application successfully rejected and an email with your message has been sent to the applicant.'
      );
    });
  });

  describe('a rejected application', () => {
    it('should cancel an application when the cancellation button is clicked', () => {
      page.navigateTo();
      element(by.cssContainingText('option', 'Rejected')).click();
      browser.sleep(1);

      element.all(by.css(`.application-field-list-values .application-details .usa-button`)).first().click();

      const cancelButton = element(by.css('.cancel-button-admin'));
      expect<any>(cancelButton.isPresent()).toBeTruthy();
      browser.executeScript('arguments[0].scrollIntoView();', cancelButton.getWebElement());
      cancelButton.click();

      browser.switchTo().alert().accept();

      // expect<any>(element.all(by.css('.usa-alert-body .usa-alert-text')).first().getText()).toEqual(
      //   'Permit application was successfully cancelled.'
      // );
    });
  });

  it('should show SUDS ID after being accepted', () => {
    page.navigateTo();

    element.all(by.css(`.application-field-list-values .application-details .usa-button`)).first().click();

    element(by.id('accept-application-btn')).click();
    element(by.css('.reason-for-action-buttons .usa-button-primary-alt')).click();
    expect<any>(element(by.id('suds-id')).isPresent()).toBeTruthy();
  });
});
