import { TreesSidebarPage } from './xmas-tree-info.po';
import { browser, element, by, Key, protractor } from 'protractor';

describe('Xmas tree - Forest', () => {
  let page: TreesSidebarPage;

  describe('Shoshone - Rules To Know', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver
        .manage()
        .window()
        .setSize(1400, 900);
      page.navigateTo('shoshone');
      browser.sleep(800);
      expect<any>(page.rulesToKnowSectionLink().isPresent()).toBeTruthy();
      page.rulesToKnowSectionLink().click();
      browser.sleep(100);
      expect<any>(page.rulesToKnowSection().isPresent()).toBeTruthy();
    });

  });

  describe('Arapaho - Rules To Know', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver
        .manage()
        .window()
        .setSize(1400, 900);
      page.navigateTo('arp');
      browser.sleep(800);
      expect<any>(page.rulesToKnowSectionLink().isPresent()).toBeTruthy();
      page.rulesToKnowSectionLink().click();
      browser.sleep(100);
      expect<any>(page.rulesToKnowSection().isPresent()).toBeTruthy();
    });

  });
});
