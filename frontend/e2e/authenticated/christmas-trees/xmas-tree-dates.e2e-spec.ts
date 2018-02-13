import { TreesSidebarPage } from './xmas-tree-info.po';
import { browser, element, by, Key, protractor } from 'protractor';

describe('Christmas tree  - When to Cut Your Tree page', () => {
  let page: TreesSidebarPage;

  describe('Mt Hood', () => {
    beforeEach(() => {
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

    it('should display a daily hours heading for the overall forest', () => {
      expect<any>(element(by.id('cutting-season-daily-hours-heading')).isPresent()).toBeTruthy();
    });

    it('should display default daily hours for the overall forest', () => {
      expect<any>(page.cuttingDatesHoursDefault().isPresent()).toBeTruthy();
      expect<any>(page.cuttingDatesHoursDefault().getText()).toEqual('Daylight hours only');
    });

    it('should display a link for users to purchase a permit', () => {
      expect<any>(page.buyPermitLink().isPresent()).toBeTruthy();
    });

    it('should route users to page where they can buy a permit', () => {
      page.buyPermitLink().click();
      browser.sleep(900);
      expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/christmas-trees/forests/mthood/applications');
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

    it('should display a daily hours heading for the overall forest', () => {
      expect<any>(element(by.id('cutting-season-daily-hours-heading')).isPresent()).toBeTruthy();
    });

    it('should display default daily hours for the overall forest', () => {
      expect<any>(page.cuttingDatesHoursDefault().isPresent()).toBeTruthy();
      expect<any>(page.cuttingDatesHoursDefault().getText()).toEqual('Daylight hours only');
    });

    it('should not display a link for users to purchase a permit', () => {
      expect<any>(page.buyPermitLink().isDisplayed()).toBeFalsy();
    });

    it ('should show the season not open info alert', () => {
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

    it('should display a daily hours heading for the overall forest', () => {
      expect<any>(element(by.id('cutting-season-daily-hours-heading')).isPresent()).toBeTruthy();
    });

    it('should display default daily hours for the overall forest', () => {
      expect<any>(page.cuttingDatesHoursDefault().isPresent()).toBeTruthy();
      expect<any>(page.cuttingDatesHoursDefault().getText()).toEqual('Daylight hours only');
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

    it('should display a daily hours heading for the overall forest', () => {
      expect<any>(element(by.id('cutting-season-daily-hours-heading')).isPresent()).toBeTruthy();
    });

    it('should display default daily hours for the overall forest', () => {
      expect<any>(page.cuttingDatesHoursDefault().isPresent()).toBeTruthy();
      expect<any>(page.cuttingDatesHoursDefault().getText()).toEqual('Daylight hours only');
    });

    it('should display cutting area dates', () => {
      expect<any>(element(by.id(`tree-cutting-areas-dates-0`)).isDisplayed()).toBeTruthy();
    });

    it('should display cutting area hours', () => {
      expect<any>(element(by.id(`tree-cutting-areas-hours-0`)).isPresent()).toBeTruthy();
    });

  });
});
