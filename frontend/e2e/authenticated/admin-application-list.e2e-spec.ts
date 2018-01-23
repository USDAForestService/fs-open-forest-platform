import { AdminApplicationList } from './app.po';
import { FieldValidation } from './field-validation.po';
import { browser, element, by, Key } from 'protractor';

fdescribe('Apply for a ', () => {
  let list: AdminApplicationList;

  beforeEach(() => {
    list = new AdminApplicationList();
  });

  it('should display forest name', () => {
    list.navigateTo();
    expect<any>(element(by.css('app-root h1')).getText()).toEqual('Mount Baker-Snoqualmie National Forest');
  });

  it('should display have a heading that says pending permit applications', () => {
    list.navigateTo();
    expect<any>(element(by.css('app-root h2')).getText()).toEqual('Pending permit applications');
  });

  it('should show table headings', () => {
    expect<any>(element(by.css('.application-list')).isPresent).toBeTruthy();
  });

  it('should show noncommercial app in grid', () => {
    expect<any>(element(by.css(`#${list.permitId()}  .application-type`)).getText()).toEqual('Noncommercial');
    expect<any>(element(by.css(`#${list.permitId()}  .application-start-date`)).getText()).toEqual(
      '01/12/2019 12:00 pm'
    );

    expect<any>(element(by.css(`#${list.permitId()}  .application-end-date`)).getText()).toEqual('01/19/2019 12:00 pm');

    expect<any>(element(by.css(`#${list.permitId()}  .permit-holder-name`)).getText()).toEqual('John Doe');
  });

  it('should swich applications when changing filter', () => {
    element(by.cssContainingText('option', 'Accepted')).click();
    expect<any>(element(by.css('app-root h2')).getText()).toEqual('Accepted permit applications');
    expect<any>(element(by.id(list.permitId())).isPresent()).toBeFalsy();

    element(by.cssContainingText('option', 'Rejected')).click();
    expect<any>(element(by.css('app-root h2')).getText()).toEqual('Rejected permit applications');

    element(by.cssContainingText('option', 'Cancelled')).click();
    expect<any>(element(by.css('app-root h2')).getText()).toEqual('Cancelled permit applications');

    element(by.cssContainingText('option', 'Expired')).click();
    expect<any>(element(by.css('app-root h2')).getText()).toEqual('Expired permit applications');

    element(by.cssContainingText('option', 'Pending')).click();
    expect<any>(element(by.css('app-root h2')).getText()).toEqual('Pending permit applications');
    expect<any>(element(by.id(list.permitId())).isPresent()).toBeTruthy();
  });
});
