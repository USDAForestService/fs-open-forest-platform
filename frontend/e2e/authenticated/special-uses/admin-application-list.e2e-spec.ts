import { browser, element, by } from 'protractor';
import { loginAdmin, loginPublic } from '../../support/auth-helper';
import { AdminApplicationList, NoncommercialGroupForm } from './app.po';
import { NoncommercialApplicationForm } from './noncommercial-application-form.po';

const page = new AdminApplicationList();
const noncommercial = new NoncommercialGroupForm();
const applicationForm = new NoncommercialApplicationForm();

describe('Apply for a ', () => {
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

  it('should display forest name', () => {
    expect<any>(element(by.css('app-root h1')).getText()).toEqual('Mount Baker-Snoqualmie National Forest');
  });

  it('should display header links for authenticated user', () => {
    expect<any>(element(by.id('log-in')).isPresent()).toBeFalsy();
    expect<any>(element(by.id('create-account')).isPresent()).toBeFalsy();
    expect<any>(element(by.id('log-out')).isPresent()).toBeTruthy();
    expect<any>(element(by.id('view-applications')).isPresent()).toBeTruthy();
    expect<any>(element(by.id('login-to-suds')).isPresent()).toBeFalsy();
  });

  it('should display have a heading that says pending permit applications', () => {
    expect<any>(element(by.css('app-root h2')).getText()).toEqual('Pending permit applications for Open Forest');
  });

  it('should show table headings', () => {
    expect<any>(element(by.css('.application-list')).isPresent).toBeTruthy();
  });

  it('should switch applications when changing filter', () => {
    element(by.cssContainingText('option', 'Accepted')).click();
    expect<any>(element(by.css('app-root h2')).getText()).toEqual('Accepted permit applications for Open Forest');

    element(by.cssContainingText('option', 'Rejected')).click();
    expect<any>(element(by.css('app-root h2')).getText()).toEqual('Rejected permit applications for Open Forest');

    element(by.cssContainingText('option', 'Cancelled')).click();
    expect<any>(element(by.css('app-root h2')).getText()).toEqual('Cancelled permit applications for Open Forest');

    element(by.cssContainingText('option', 'Expired')).click();
    expect<any>(element(by.css('app-root h2')).getText()).toEqual('Expired permit applications for Open Forest');

    element(by.cssContainingText('option', 'Pending')).click();
    expect<any>(element(by.css('app-root h2')).getText()).toEqual('Pending permit applications for Open Forest');
  });
});
