import { TreesWizardPage } from './app.po';
import { browser, element, by, Key } from 'protractor';

describe('Xmas trees wizard page', () => {
  let page: TreesWizardPage;

  beforeEach(() => {
    page = new TreesWizardPage();
    browser.driver.manage().window().setSize(1400, 900);
    page.navigateTo();
  });

  it('should have a title with forest name', () => {
    expect<any>(element(by.css('app-root h1')).getText()).toEqual(
      'Mt. Hood National Forest Christmas tree permit\nNov 1, 2017 - Dec 24, 2017'
    );

    expect<any>(element(by.css('.wizard-step-header')).isPresent()).toBeTruthy();
    expect<any>(element(by.css('.wizard-step-content')).isPresent()).toBeTruthy();
    expect<any>(element(by.css('.wizard-step-footer')).isPresent()).toBeTruthy();
  });

  it('should start on step one, and increment when you click next and prev', () => {
    browser.sleep(1000);
    expect<any>(element(by.css('.step .usa-button-inverse')).getText()).toEqual('1');
    element(by.id('next')).click();
    browser.sleep(1000);
    expect<any>(element(by.css('.step .usa-button-inverse')).getText()).toEqual('2');
    element(by.id('previous')).click();
    browser.sleep(1000);
    expect<any>(element(by.css('.step .usa-button-inverse')).getText()).toEqual('1');
    element(by.id('next')).click();
    browser.sleep(1000);
    expect<any>(element(by.css('.step .usa-button-inverse')).getText()).toEqual('2');
    element(by.id('next')).click();
    browser.sleep(1000);
    expect<any>(element(by.css('.step .usa-button-inverse')).getText()).toEqual('2');
    element(by.id('next')).click();
    browser.sleep(1000);
    expect<any>(element(by.css('.step .usa-button-inverse')).getText()).toEqual('2');
    element(by.id('next')).click();
    browser.sleep(1000);
    expect<any>(element(by.css('.step .usa-button-inverse')).getText()).toEqual('3');
    element(by.id('next')).click();
    browser.sleep(1000);
    expect<any>(element(by.css('.step .usa-button-inverse')).getText()).toEqual('3');
    element(by.id('next')).click();
    browser.sleep(1000);
    expect<any>(element(by.css('.step .usa-button-inverse')).getText()).toEqual('4');
    element(by.id('next')).click();
    browser.sleep(1000);
    expect<any>(element(by.css('.step .usa-button-inverse')).getText()).toEqual('4');
    element(by.id('next')).click();
    browser.sleep(1000);
    expect<any>(element(by.css('.step .usa-button-inverse')).getText()).toEqual('4');
    element(by.id('next')).click();
    browser.sleep(1000);
    expect<any>(element(by.css('.step .usa-button-inverse')).getText()).toEqual('5');
    element(by.id('next')).click();
    browser.sleep(1000);
    expect<any>(element(by.css('.step .usa-button-inverse')).getText()).toEqual('6');
    element(by.id('next')).click();
    browser.sleep(1000);
    expect<any>(element(by.css('.step .usa-button-inverse')).getText()).toEqual('7');
    element(by.id('previous')).click();
    browser.sleep(1000);
    expect<any>(element(by.css('.step .usa-button-inverse')).getText()).toEqual('6');
    element(by.id('previous')).click();
    browser.sleep(1000);
    expect<any>(element(by.css('.step .usa-button-inverse')).getText()).toEqual('5');
    element(by.id('previous')).click();
    browser.sleep(1000);
    expect<any>(element(by.css('.step .usa-button-inverse')).getText()).toEqual('4');
    element(by.id('previous')).click();
    browser.sleep(1000);
    expect<any>(element(by.css('.step .usa-button-inverse')).getText()).toEqual('4');
    element(by.id('previous')).click();
    browser.sleep(1000);
    expect<any>(element(by.css('.step .usa-button-inverse')).getText()).toEqual('4');
    element(by.id('previous')).click();
    browser.sleep(1000);
    expect<any>(element(by.css('.step .usa-button-inverse')).getText()).toEqual('3');
    element(by.id('previous')).click();
    browser.sleep(1000);
    expect<any>(element(by.css('.step .usa-button-inverse')).getText()).toEqual('3');
    element(by.id('previous')).click();
    browser.sleep(1000);
    expect<any>(element(by.css('.step .usa-button-inverse')).getText()).toEqual('2');
    element(by.id('previous')).click();
    browser.sleep(1000);
    expect<any>(element(by.css('.step .usa-button-inverse')).getText()).toEqual('2');
    element(by.id('previous')).click();
    browser.sleep(1000);
    expect<any>(element(by.css('.step .usa-button-inverse')).getText()).toEqual('2');
    element(by.id('previous')).click();
    browser.sleep(1000);
    expect<any>(element(by.css('.step .usa-button-inverse')).getText()).toEqual('1');
  });
});
