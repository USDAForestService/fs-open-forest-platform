import { ChristmasTreeForm } from './app.po';
import { FieldValidation } from './field-validation.po';
import { browser, element, by, Key } from 'protractor';

describe('Apply for a Christmas tree permit', () => {
  let page: ChristmasTreeForm;
  let fieldValidation: FieldValidation;
  fieldValidation = new FieldValidation();

  beforeEach(() => {
    page = new ChristmasTreeForm();
  });

  it('should display the permit name in the header', () => {
    page.navigateTo();
    expect<any>(element(by.css('app-root h1')).getText()).toEqual('Buy a Christmas tree permit.');
  });

  it('should calculate total cost', () => {
    page.navigateTo();
    element(by.css('.primary-permit-holder-first-name')).sendKeys('Sarah');
    element(by.css('.primary-permit-holder-last-name')).sendKeys('Bell');
    element(by.id('email')).sendKeys('msdf@noemail.com');
    element(by.id('quantity')).sendKeys('2');
    expect<any>(element(by.id('total-cost')).getText()).toEqual('$20');
  });
});
