import { TreesSidebarPage } from './app.po';
import { browser, element, by, Key } from 'protractor';

const testSidebarLink = function(section) {
  element(by.id(`${section}-link`)).click();
  expect(element(by.id(`${section}`)).getAttribute('innerHTML')).toEqual(
    browser.driver.switchTo().activeElement().getAttribute('innerHTML')
  );
};

describe('Xmas sidebar wizard page', () => {
  let page: TreesSidebarPage;

  beforeEach(() => {
    page = new TreesSidebarPage();
    browser.driver.manage().window().setSize(1400, 900);
    page.navigateTo();
  });

  it('should have a title with forest name', () => {
    expect<any>(element(by.css('app-root h1')).getText()).toEqual(
      'Mt. Hood National Forest Christmas tree permit\nNov 1, 2017 - Dec 24, 2017'
    );
  });

  it(`should move focus to section on page when sidebar item is clicked`, () => {
    testSidebarLink('general-guidelines');
    testSidebarLink('tree-locations');
    testSidebarLink('tree-locations-maps');
    testSidebarLink('tree-locations-prohibited');
    testSidebarLink('tree-locations-allowed');
    testSidebarLink('tree-selection');
    testSidebarLink('tree-selection-types-of-trees');
    testSidebarLink('cutting-instructions');
    testSidebarLink('cutting-instructions-before-you-cut');
    testSidebarLink('cutting-instructions-when-you-cut');
    testSidebarLink('cutting-instructions-after-you-cut');
    testSidebarLink('trip-planning');
    testSidebarLink('safety-first');
    testSidebarLink('contact-information');
  });
});
