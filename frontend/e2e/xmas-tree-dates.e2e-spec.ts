import { TreesSidebarPage } from './app.po';
import { browser, element, by, Key, protractor } from 'protractor';

describe('Christmas tree  - When to Cut Your Tree page', () => {
  let page: TreesSidebarPage;

  describe( 'Mt Hood', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver.manage().window().setSize(1400, 900);
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
      expect<any>(page.cuttingDatesHoursDefault().getText()).toEqual('Daylight hours only')
    });
  });

  describe( 'Shoshone', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver.manage().window().setSize(1400, 900);
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
      expect<any>(page.cuttingDatesHoursDefault().getText()).toEqual('Daylight hours only')
    });
  });

  describe( 'Arapaho/Roosevelt', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver.manage().window().setSize(1400, 900);
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
      expect<any>(page.cuttingDatesHoursDefault().getText()).toEqual('Daylight hours only')
    });

    it('should display cutting area dates', () => {
      expect<any>(page.cuttingAreaDates(0).isDisplayed()).toBeTruthy();
    });

    it('should display cutting area hours', () => {
      expect<any>(page.cuttingAreaHours(0).isPresent()).toBeTruthy();
    });
  });


});
