import { by, element } from 'protractor';
import { SpecialUseHomepage } from '../authenticated/special-uses/app.po';

const page = new SpecialUseHomepage();

describe('frontend App', () => {
  it('should display login and create account links', () => {
    page.navigateTo();
    expect<any>(element(by.id('log-in')).isPresent()).toBeTruthy();
    expect<any>(element(by.id('create-account')).isPresent()).toBeTruthy();
    expect<any>(element(by.id('log-out')).isPresent()).toBeFalsy();
    expect<any>(element(by.id('view-applications')).isPresent()).toBeFalsy();
    expect<any>(element(by.id('login-to-suds')).isPresent()).toBeFalsy();
  });
});
