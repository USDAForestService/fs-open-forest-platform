import { FrontendPage } from '../authenticated/special-uses/app.po';
import { browser, by, element, Key } from 'protractor';

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
    browser.sleep(3500);
    expect(browser.driver.getCurrentUrl()).toContain('login.gov');
  });

  it('should go to login url when link to permit application form is clicked', () => {
    page.navigateTo();
    element(by.css('#noncommercial-background .usa-button')).click();
    browser.sleep(3500);
    expect(browser.driver.getCurrentUrl()).toContain('login.gov');
  });

  it('should go to eauth url when accessing admin pages', () => {
    browser.driver.get('http://localhost:4200/admin/applications');
    browser.sleep(3500);
    expect(browser.driver.getCurrentUrl()).toContain('usda.gov');
  });

  it('should go to eauth url when accessing christmas tree admin reports pages', () => {
    browser.driver.get('http://localhost:4200/admin/christmas-trees/reports');
    browser.sleep(3500);
    expect(browser.driver.getCurrentUrl()).toContain('usda.gov');
  });

  it('should go to eauth url when accessing christmas tree admin season-dates pages', () => {
    browser.driver.get('http://localhost:4200/admin/christmas-trees/season-dates');
    browser.sleep(3500);
    expect(browser.driver.getCurrentUrl()).toContain('usda.gov');
  });
});
