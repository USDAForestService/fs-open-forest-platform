import { TreesForestFinderPage, TreesSidebarPage } from './xmas-tree-info.po';
import { browser, element, by, Key, protractor } from 'protractor';

describe('Xmas tree  - Find a forest', () => {
  let page: TreesForestFinderPage;

  describe('text search', () => {
    beforeEach(() => {
      page = new TreesForestFinderPage();
      browser.driver
        .manage()
        .window()
        .setSize(1400, 900);
      page.navigateTo();
      browser.sleep(1900);
    });

    it('should appear on the page', () => {
      expect<any>(element(by.id('forest-finder-select')).isPresent()).toBeTruthy();
    });

    it('should let the user enter a forest name and navigate to that forest', () => {
      element(by.id('forest-finder-select')).sendKeys('shoshone');
      browser.sleep(960);
      element(by.id('forest-finder-submit')).click();
      browser.sleep(900);
      expect(browser.getCurrentUrl()).toContain('http://localhost:4200/christmas-trees/forests/shoshone');
    });
  });

});
