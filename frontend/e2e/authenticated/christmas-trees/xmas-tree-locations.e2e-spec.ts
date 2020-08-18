import { TreesSidebarPage } from './xmas-tree-info.po';
import { browser, element, by, Key, protractor } from 'protractor';

xdescribe('Xmas tree  - Where to Find Your Tree page', () => {
  let page: TreesSidebarPage;

  xdescribe('Mt Hood', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver
        .manage()
        .window()
        .setSize(1400, 900);
      page.navigateTo('mthood');
      browser.sleep(800);
      page.getTreeLocationLink().click();
      browser.sleep(800);
    });


    xit('should have a where to find a tree section link', () => {
      expect<any>(element(by.id('tree-locations-link')).getText()).toEqual('Where to cut your tree');
    });

  });

  xdescribe('Shoshone', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver
        .manage()
        .window()
        .setSize(1400, 900);
      page.navigateTo('shoshone');
      browser.sleep(800);
      page.getTreeLocationLink().click();
      browser.sleep(100);
    });


    xit('should have a where to find a tree section link', () => {
      expect<any>(element(by.id('tree-locations-link')).getText()).toEqual('Where to cut your tree');
    });

  });

  xdescribe('Arapaho/Roosevelt', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver
        .manage()
        .window()
        .setSize(1400, 900);
      page.navigateTo('arp');
      browser.sleep(800);
      page.getTreeLocationLink().click();
      browser.sleep(100);
    });


    xit('should have a where to find a tree section link', () => {
      expect<any>(element(by.id('tree-locations-link')).getText()).toEqual('Where to cut your tree');
    });

   });

  xdescribe('Flathead', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver
        .manage()
        .window()
        .setSize(1400, 900);
      page.navigateTo('flathead');
      browser.sleep(900);
      page.getTreeLocationLink().click();
      browser.sleep(100);
    });


    xit('should have a where to find a tree section link', () => {
      expect<any>(element(by.id('tree-locations-link')).getText()).toEqual('Where to cut your tree');
    });

  });
});
