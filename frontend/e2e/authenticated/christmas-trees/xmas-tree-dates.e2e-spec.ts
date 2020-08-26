import { TreesSidebarPage } from './xmas-tree-info.po';
import { browser, element, by, Key, protractor } from 'protractor';

xdescribe('Christmas tree  - When to Cut Your Tree page', () => {
  let page: TreesSidebarPage;

  xdescribe('Mt Hood', () => {
    beforeAll(() => {
      page = new TreesSidebarPage();
      browser.driver
        .manage()
        .window()
        .setSize(1400, 900);
      page.navigateTo('mthood');
      browser.sleep(800);
      page.whenToCutDatesSectionLink().click();
      browser.sleep(800);
    });

    xit('should have a when to cut section link in the sidebar', () => {
      expect<any>(page.cuttingDatesSectionLink().isPresent()).toBeTruthy();
      page.cuttingDatesSectionLink().click();
    });

    xit('should have a when to cut section in the guidelines', () => {
      expect<any>(page.cuttingDatesSection().isPresent()).toBeTruthy();
    });

    xit('should have a season dates heading', () => {
      expect<any>(element(by.id('cutting-season-dates-heading')).isPresent()).toBeTruthy();
    });

    xit('should display a season start and end date for the overall forest', () => {
      expect<any>(page.cuttingDatesSeasonStartAndEnd().isPresent()).toBeTruthy();
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
      page.whenToCutDatesSectionLink().click();
      browser.sleep(800);
    });

    xit('should have a when to cut section link in the sidebar', () => {
      expect<any>(page.cuttingDatesSectionLink().isPresent()).toBeTruthy();
      page.cuttingDatesSectionLink().click();
    });

    xit('should have a when to cut section in the guidelines', () => {
      expect<any>(page.cuttingDatesSection().isPresent()).toBeTruthy();
    });

    xit('should have a season dates heading', () => {
      expect<any>(element(by.id('cutting-season-dates-heading')).isPresent()).toBeTruthy();
    });

    xit('should display a season start and end date for the overall forest', () => {
      expect<any>(page.cuttingDatesSeasonStartAndEnd().isPresent()).toBeTruthy();
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
      page.whenToCutDatesSectionLink().click();
      browser.sleep(800);
    });

    xit('should have a when to cut section link in the sidebar', () => {
      expect<any>(page.cuttingDatesSectionLink().isPresent()).toBeTruthy();
      page.cuttingDatesSectionLink().click();
    });

    xit('should have a when to cut section in the guidelines', () => {
      expect<any>(page.cuttingDatesSection().isPresent()).toBeTruthy();
    });

    xit('should have a season dates heading', () => {
      expect<any>(element(by.id('cutting-season-dates-heading')).isPresent()).toBeTruthy();
    });

    xit('should display a season start and end date for the overall forest', () => {
      expect<any>(page.cuttingDatesSeasonStartAndEnd().isPresent()).toBeTruthy();
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
      page.whenToCutDatesSectionLink().click();
      browser.sleep(800);
    });

    xit('should have a when to cut section link in the sidebar', () => {
      expect<any>(page.cuttingDatesSectionLink().isPresent()).toBeTruthy();
      page.cuttingDatesSectionLink().click();
    });

    xit('should have a when to cut section in the guidelines', () => {
      expect<any>(page.cuttingDatesSection().isPresent()).toBeTruthy();
    });

    xit('should have a season dates heading', () => {
      expect<any>(element(by.id('cutting-season-dates-heading')).isPresent()).toBeTruthy();
    });

    xit('should display a season start and end date for the overall forest', () => {
      expect<any>(page.cuttingDatesSeasonStartAndEnd().isPresent()).toBeTruthy();
    });
  });
});
