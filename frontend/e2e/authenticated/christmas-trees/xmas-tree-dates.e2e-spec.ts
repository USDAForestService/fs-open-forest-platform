import { TreesSidebarPage } from './xmas-tree-info.po';
import { browser, element, by, Key, protractor } from 'protractor';

describe('Christmas tree  - When to Cut Your Tree page', () => {
  let page: TreesSidebarPage;

  describe('Mt Hood', () => {
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

    it('should have a when to cut section link in the sidebar', () => {
      expect<any>(page.cuttingDatesSectionLink().isPresent()).toBeTruthy();
      page.cuttingDatesSectionLink().click();
    });

    it('should have a when to cut section in the guidelines', () => {
      expect<any>(page.cuttingDatesSection().isPresent()).toBeTruthy();
    });

    it('should have a season dates heading', () => {
      expect<any>(element(by.id('cutting-season-dates-heading')).isPresent()).toBeTruthy();
    });

    it('should display a season start and end date for the overall forest', () => {
      expect<any>(page.cuttingDatesSeasonStartAndEnd().isPresent()).toBeTruthy();
    });

    it ('should display a buy button', () => {
      expect<any>(page.buyButton().isDisplayed()).toBeTruthy();
    });

    it ('should not display the buy button header', () => {
      expect<any>(page.buyButtonHeader().isPresent()).toBeTruthy();
      expect(page.buyButtonHeader().getCssValue('top')).toEqual('-100px');
    });
  });

  describe('Shoshone', () => {
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

    it('should have a when to cut section link in the sidebar', () => {
      expect<any>(page.cuttingDatesSectionLink().isPresent()).toBeTruthy();
      page.cuttingDatesSectionLink().click();
    });

    it('should have a when to cut section in the guidelines', () => {
      expect<any>(page.cuttingDatesSection().isPresent()).toBeTruthy();
    });

    it('should have a season dates heading', () => {
      expect<any>(element(by.id('cutting-season-dates-heading')).isPresent()).toBeTruthy();
    });

    it('should display a season start and end date for the overall forest', () => {
      expect<any>(page.cuttingDatesSeasonStartAndEnd().isPresent()).toBeTruthy();
      expect<any>(page.cuttingDatesSeasonStartAndEnd().getText()).toEqual('Dates not yet available.');
    });

    it('should show the season not open info alert', () => {
      expect<any>(page.seasonOpenAlert().isDisplayed()).toBeTruthy();
    });
  });

  describe('Flathead', () => {
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

    it('should have a when to cut section link in the sidebar', () => {
      expect<any>(page.cuttingDatesSectionLink().isPresent()).toBeTruthy();
      page.cuttingDatesSectionLink().click();
    });

    it('should have a when to cut section in the guidelines', () => {
      expect<any>(page.cuttingDatesSection().isPresent()).toBeTruthy();
    });

    it('should have a season dates heading', () => {
      expect<any>(element(by.id('cutting-season-dates-heading')).isPresent()).toBeTruthy();
    });

    it('should display a season start and end date for the overall forest', () => {
      expect<any>(page.cuttingDatesSeasonStartAndEnd().isPresent()).toBeTruthy();
    });
  });

  describe('Arapaho/Roosevelt', () => {
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

    it('should have a when to cut section link in the sidebar', () => {
      expect<any>(page.cuttingDatesSectionLink().isPresent()).toBeTruthy();
      page.cuttingDatesSectionLink().click();
    });

    it('should have a when to cut section in the guidelines', () => {
      expect<any>(page.cuttingDatesSection().isPresent()).toBeTruthy();
    });

    it('should have a season dates heading', () => {
      expect<any>(element(by.id('cutting-season-dates-heading')).isPresent()).toBeTruthy();
    });

    it('should display a season start and end date for the overall forest', () => {
      expect<any>(page.cuttingDatesSeasonStartAndEnd().isPresent()).toBeTruthy();
    });
  });
});
