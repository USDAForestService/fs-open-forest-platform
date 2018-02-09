import { FrontendPage, HelpMePick } from '../authenticated/app.po';
import { browser, element, by, Key } from 'protractor';

describe('frontend App', () => {
  let page: FrontendPage;

  beforeEach(() => {
    page = new FrontendPage();
  });

  it('should display login and create account links', () => {
    page.navigateTo();
    expect<any>(element(by.id('log-in')).isPresent()).toBeTruthy();
    expect<any>(element(by.id('create-account')).isPresent()).toBeTruthy();
    expect<any>(element(by.id('log-out')).isPresent()).toBeFalsy();
    expect<any>(element(by.id('view-applications')).isPresent()).toBeFalsy();
    expect<any>(element(by.id('login-to-suds')).isPresent()).toBeFalsy();
  });

  it('should go to login url when login is clicked', () => {
    element(by.id('log-in')).click();
    expect<any>(element(by.id('progress-wrapper')).isPresent()).toBeTruthy();
    browser.sleep(4000);
    expect(browser.driver.getCurrentUrl()).toContain('login.gov');
  });

  it('should go to login url when link to permit application form is clicked', () => {
    page.navigateTo();
    element(by.css('#noncommercial-background .usa-button')).click();
    expect<any>(element(by.id('progress-wrapper')).isPresent()).toBeTruthy();
    browser.sleep(4000);
    expect(browser.driver.getCurrentUrl()).toContain('login.gov');
  });

  it('should go to eauth url when accessing admin pages', () => {
    browser.driver.get('http://localhost:4200/admin/applications');
    expect<any>(element(by.id('progress-wrapper')).isPresent()).toBeTruthy();
    browser.sleep(4000);
    expect(browser.driver.getCurrentUrl()).toContain('usda.gov');
  });
});
