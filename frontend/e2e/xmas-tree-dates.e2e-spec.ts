import { TreesSidebarPage } from './app.po';
import { browser, element, by, Key, protractor } from 'protractor';

describe('Christmas tree  - When to Cut Your Tree page', () => {
  let page: TreesSidebarPage;

  describe( 'Mt Hood', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver.manage().window().setSize(1400, 900);
      page.navigateTo(3);
      browser.sleep(800);
      page.getTreeLocationLink().click();
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
      expect<any>(page.cuttingDatesHoursDefault().getText()).toEqual('Daylight hours only')
    });
  });

  describe( 'Shoshone', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver.manage().window().setSize(1400, 900);
      page.navigateTo(4);
      browser.sleep(800);
      page.getTreeLocationLink().click();
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
      expect<any>(page.cuttingDatesHoursDefault().getText()).toEqual('Daylight hours only')
    });
  });

  describe( 'Flathead', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver.manage().window().setSize(1400, 900);
      page.navigateTo(2);
      browser.sleep(800);
      page.getTreeLocationLink().click();
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
      expect<any>(page.cuttingDatesHoursDefault().getText()).toEqual('Daylight hours only')
    });
  });

  describe( 'Arapaho/Roosevelt', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver.manage().window().setSize(1400, 900);
      page.navigateTo(1);
      browser.sleep(800);
      page.getTreeLocationLink().click();
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
      expect<any>(page.cuttingDatesHoursDefault().getText()).toEqual('Daylight hours only')
    });

    it('should display cutting area dates', () => {
      expect<any>(element(by.id('tree-cutting-areas-dates-0')).isPresent()).toBeTruthy();
      expect<any>(element(by.id('tree-cutting-areas-dates-1')).isPresent()).toBeTruthy();
    });

    it('should display cutting area hours', () => {
      expect<any>(element(by.id('tree-cutting-areas-hours-0')).isPresent()).toBeTruthy();
      expect<any>(element(by.id('tree-cutting-areas-hours-1')).isPresent()).toBeTruthy();
    });


  });


});
