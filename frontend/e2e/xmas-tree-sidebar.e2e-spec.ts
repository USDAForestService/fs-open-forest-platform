import { TreesSidebarPage } from './app.po';
import { browser, element, by, Key, protractor } from 'protractor';

describe('Xmas sidebar page', () => {
  let page: TreesSidebarPage;

  beforeEach(() => {
    page = new TreesSidebarPage();
    browser.driver.manage().window().setSize(1400, 900);
    page.navigateTo(3); // 3 is mt hood, 4 is shoshone etc.
  });

  it('should have a sidebar', () => {
    expect<any>(element(by.css('.usa-sidenav-list')).isDisplayed()).toBeTruthy();
  });

  it('should have a cutting section link', () => {
    expect<any>(element(by.id('cutting-instructions-link')).getText()).toEqual(
      'How to harvest your tree'
    );
  });

  it('should have a locations link', () => {
    expect<any>(element(by.id('tree-locations-link')).getText()).toEqual(
      'Where to find your tree'
    );
  });

  it('should have a species section link', () => {
    expect<any>(element(by.id('tree-selection-link')).getText()).toEqual(
      'How to choose your tree'
    );
  });

  it('should have a breadcrumb', () => {
    browser.sleep(500);
    expect<any>(element(by.css('.breadcrumbs')).getText()).toEqual(
      'Christmas tree permits > Find a forest > Mt. Hood National Forest Christmas tree permit guidelines'
    );
  });


});
