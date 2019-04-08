import { SpecialUseHomepage } from '../authenticated/special-uses/app.po';
import { browser, by, element, Key } from 'protractor';


describe('frontend App', () => {
  let page: SpecialUseHomepage;

  beforeEach(() => {
    page = new SpecialUseHomepage();
  });

  afterEach(function() {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });

  it('should display login and create account links', () => {
    page.navigateTo();
    expect<any>(element(by.id('log-in')).isPresent()).toBeTruthy();
    expect<any>(element(by.id('create-account')).isPresent()).toBeTruthy();
    expect<any>(element(by.id('log-out')).isPresent()).toBeFalsy();
    expect<any>(element(by.id('view-applications')).isPresent()).toBeFalsy();
    expect<any>(element(by.id('login-to-suds')).isPresent()).toBeFalsy();
  });

});
