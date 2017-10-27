import { TreesSidebarPage } from './app.po';
import { browser, element, by, Key, protractor } from 'protractor';

describe('Xmas sidebar page', () => {
  let page: TreesSidebarPage;

  beforeEach(() => {
    page = new TreesSidebarPage();
    browser.driver.manage().window().setSize(1400, 900);
    page.navigateTo();
  });

  it('should have a title', () => {
    expect<any>(element(by.css('.trees-header-title')).getText()).toEqual(
      'Christmas tree permit'
    );
  });

  it('should have a sidebar', () => {
    expect<any>(element(by.css('.usa-sidenav-list')).isDisplayed()).toBeTruthy();
  });

  it('should have a cutting section link', () => {
    expect<any>(element(by.id('cutting-instructions-link')).getText()).toEqual(
      'Tree cutting'
    );
  });

  it('should have a locations link', () => {
    expect<any>(element(by.id('tree-locations-link')).getText()).toEqual(
      'Where to find your tree'
    );
  });

  it('should have a species section link', () => {
    expect<any>(element(by.id('tree-selection-link')).getText()).toEqual(
      'Tree selection'
    );
  });


});
