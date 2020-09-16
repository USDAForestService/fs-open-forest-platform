import { TreesSidebarPage } from './xmas-tree-info.po';
import { browser, element, by, Key, protractor } from 'protractor';

describe('Christmas tree  - Contact Us', () => {
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
    });

    xit('should have a contact us section link in the sidebar', () => {
      expect<any>(page.contactUsSectionLink().isPresent()).toBeTruthy();
      page.contactUsSectionLink().click();
      browser.sleep(800);
    });

    xit('should have a contact us section in the guidelines', () => {
      expect<any>(page.contactUsSection().isPresent()).toBeTruthy();
    });
  });

  xdescribe('Arapaho', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver
        .manage()
        .window()
        .setSize(1400, 900);
      page.navigateTo('arp');
      browser.sleep(800);
    });

    xit('should have a contact us section link in the sidebar', () => {
      expect<any>(page.contactUsSectionLink().isPresent()).toBeTruthy();
      page.contactUsSectionLink().click();
      browser.sleep(800);
    });

    xit('should have a contact us section in the guidelines', () => {
      expect<any>(page.contactUsSection().isPresent()).toBeTruthy();
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
    });

    xit('should have a contact us section link in the sidebar', () => {
      expect<any>(page.contactUsSectionLink().isPresent()).toBeTruthy();
      page.contactUsSectionLink().click();
      browser.sleep(800);
    });

    xit('should have a contact us section in the guidelines', () => {
      expect<any>(page.contactUsSection().isPresent()).toBeTruthy();
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
      browser.sleep(800);
    });

    xit('should have a contact us section link in the sidebar', () => {
      expect<any>(page.contactUsSectionLink().isPresent()).toBeTruthy();
      page.contactUsSectionLink().click();
      browser.sleep(800);
    });

    xit('should have a contact us section in the guidelines', () => {
      expect<any>(page.contactUsSection().isPresent()).toBeTruthy();
    });

  });
});
