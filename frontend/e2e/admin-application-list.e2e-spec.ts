import { AdminApplicationList } from './app.po';
import { FieldValidation } from './field-validation.po';
import { browser, element, by, Key } from 'protractor';

describe('Apply for a ', () => {
  let list: AdminApplicationList;

  beforeEach(() => {
    list = new AdminApplicationList();
  });

  it('should display forest name', () => {
    list.navigateTo();
    expect<any>(element(by.css('app-root h1')).getText()).toEqual('Mount Baker-Snoqualmie National Forest');
  });

  it('should display applications sub-header', () => {
    list.navigateTo();
    expect<any>(element(by.css('app-root h2')).getText()).toEqual('Permit applications');
  });

  it('should show table headings', () => {
    expect<any>(element(by.css('.application-list')).isPresent).toBeTruthy();
  });
});
