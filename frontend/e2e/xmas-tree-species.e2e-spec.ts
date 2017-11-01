import { TreesSidebarPage } from './app.po';
import { browser, element, by, Key, protractor } from 'protractor';

describe('Xmas tree species page', () => {
  let page: TreesSidebarPage;

  beforeEach(() => {
    page = new TreesSidebarPage();
    browser.driver.manage().window().setSize(1400, 900);
    page.navigateTo(3);
    browser.sleep(400);

  });

  it('should have a species section link', () => {
    expect<any>(element(by.id('tree-selection-link')).getText()).toEqual(
      'How to choose your tree'
    );
  });

  describe('recommended species', () => {
    let treeOne;
    beforeEach(() => {
      treeOne = element.all(by.repeater('tree of forest.species')).get(1);
    });
    it('should display Pacific Silver fir', () => {
      expect<any>(element(by.id('tree-recommended-species')).isDisplayed()).toBeTruthy();
    });
  })

});
