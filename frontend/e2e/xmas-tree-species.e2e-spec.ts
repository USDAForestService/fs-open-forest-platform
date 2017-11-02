import { TreesSidebarPage } from './app.po';
import { browser, element, by, Key, protractor } from 'protractor';

describe('Xmas tree species page', () => {
  let page: TreesSidebarPage;

  beforeEach(() => {
    page = new TreesSidebarPage();
    browser.driver.manage().window().setSize(1400, 900);
    page.navigateTo(3);
    browser.sleep(400);
    page.getTreeSelectionLink().click();
  });

  it('should have a species section link', () => {
    expect<any>(element(by.id('tree-selection-link')).getText()).toEqual(
      'How to choose your tree'
    );
  });

  describe('recommended species', () => {
    it('should display a tree', () => {
      expect<any>(element(by.id('tree-recommended-species-0')).isDisplayed()).toBeTruthy();
      expect<any>(element(by.id('tree-recommended-species-0')).element(by.css('.tree-name')).getText()).not.toBeNull();
    });
  })

});
