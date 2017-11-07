import { TreesForestFinderPage, TreesSidebarPage } from './app.po';
import { browser, element, by, Key, protractor } from 'protractor';

fdescribe('Xmas tree  - Find a forest', () => {
  let page: TreesForestFinderPage;

  describe( 'text search', () => {
    beforeEach(() => {
      page = new TreesForestFinderPage();
      browser.driver.manage().window().setSize(1400, 900);
      page.navigateTo();
      browser.sleep(800);
    });

    it('should appear on the page', () => {
      expect<any>(element(by.id('forest-finder-input')).isPresent()).toBeTruthy();
    });

    it('should let the user enter a forest name', () => {
      element(by.id('forest-finder-input')).sendKeys('shoshone');
      browser.sleep(560);
    });

  });
});
