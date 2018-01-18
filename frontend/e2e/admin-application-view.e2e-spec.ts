import { AdminApplicationView } from './app.po';
import { FieldValidation } from './field-validation.po';
import { browser, element, by, Key } from 'protractor';

fdescribe('Admin applications page', () => {
  let page: AdminApplicationView;

  beforeEach(() => {
    page = new AdminApplicationView();
  });

  it('should display breadcrumbs', () => {
    page.navigateTo();
    expect<any>(element(by.css('nav')).isDisplayed()).toBeTruthy();
  });
});
