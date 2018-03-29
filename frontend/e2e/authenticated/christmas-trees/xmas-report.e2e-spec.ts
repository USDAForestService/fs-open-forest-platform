import { TreesReportPage } from './xmas-tree-admin.po';
import { browser, element, by, Key, protractor } from 'protractor';

describe('Xmas tree - Admin Reports', () => {
  let page: TreesReportPage;

  describe('Permit report page', () => {
    beforeAll(() => {
      page = new TreesReportPage();
      browser.driver
        .manage()
        .window()
        .setSize(1400, 900);
      page.navigateTo();
      browser.sleep(800);
      expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/admin/christmas-trees/reports');
    });

    describe('basic elements', () => {
      it('should have a date search radio', () => {
        expect(page.dateReportRadio().isPresent()).toBeTruthy();
      });

      it('should have a permit number search radio', () => {
        expect(page.permitNumberReportRadio().isPresent()).toBeTruthy();
      });

      it('should display a start date', () => {
        expect<any>(page.startMonthInput().isPresent()).toBeTruthy();
        expect<any>(page.startDayInput().isPresent()).toBeTruthy();
        expect<any>(page.startYearInput().isPresent()).toBeTruthy();
      });

      it('should display a end date', () => {
        expect<any>(page.endMonthInput().isPresent()).toBeTruthy();
        expect<any>(page.endDayInput().isPresent()).toBeTruthy();
        expect<any>(page.endYearInput().isPresent()).toBeTruthy();
      });
    });

    describe('forest select', () => {
      it('should show date invalid errors if dates are invalid', () => {
        element(by.id('3-button-label')).click();
        page.startMonthInput().clear();
        expect<any>(page.reportSubmit().click());
        page.startMonthInput().sendKeys('13');
        page.startMonthInput().sendKeys(protractor.Key.TAB);
        expect<any>(page.startMonthError().getText()).toEqual('Start month requires a 1 or 2 digit number that is less than 13.');
        page.startMonthInput().clear();
        page.startMonthInput().sendKeys('10');
        expect<any>(page.startMonthError().isPresent()).toBeFalsy();

        page.startDayInput().clear();
        page.startDayInput().sendKeys('33');
        page.startDayInput().sendKeys(protractor.Key.TAB);
        expect<any>(page.startDayError().getText()).toEqual('Start day requires a 1 or 2 digit number.');
        page.startDayInput().clear();
        page.startDayInput().sendKeys('10');
        expect<any>(page.startDayError().isPresent()).toBeFalsy();
      });

      it('should display error if start date is after end date', () => {
        page.startYearInput().clear();
        page.startYearInput().sendKeys('2040');
        expect<any>(page.startDateTimeError().getText()).toEqual(
          'Start date and time must be before end date and time.'
        );
        page.startYearInput().clear();
        page.startYearInput().sendKeys('2014');
        expect<any>(page.startDateTimeError().isPresent()).toBeFalsy();
      });
    });

    describe('report summary', () => {
      beforeAll(() => {
        page.reportSubmit().click();
        browser.sleep(2000);
      });

      it('should have a details table', () => {
        expect<any>(page.reportDetailsTable().isDisplayed()).toBeTruthy();
      });

      it('should show a download button', () => {
        expect<any>(page.reportDownloadButton().isDisplayed()).toBeTruthy();
      });

      it('should have a title', () => {
        expect<any>(page.reportTitle().isDisplayed()).toBeTruthy();
      });

      it('should have a permit total', () => {
        expect<any>(page.reportPermitTotal().isDisplayed()).toBeTruthy();
      });

      it('should display the report total', () => {
        expect<any>(page.reportTotal().isDisplayed()).toBeTruthy();
      });

      it('should display the trees total', () => {
        expect<any>(page.reportTreeTotal().isDisplayed()).toBeTruthy();
      });
    });
  });

  describe('search by permit number', () => {
    beforeAll(() => {
      page.permitNumberReportRadio().click();
      browser.sleep(500);
    });

    it('should show a required message if not permit number is entered', () => {
      page.permitNumberSubmit().click();
      expect<any>(page.permitNumberRequiredError().isDisplayed()).toBeTruthy();
      expect<any>(page.permitNumberRequiredError().getText()).toEqual('permit number is required.');
    });

    it('should show a error if not permit number is not a number', () => {
      page.permitNumber().sendKeys('a');
      page.permitNumberSubmit().click();
      expect<any>(page.permitNumberRequiredError().isDisplayed()).toBeTruthy();
      expect<any>(page.permitNumberRequiredError().getText()).toEqual('permit number requires an 8 digit number.');
    });

    it('should show a error if not permit number is not long enough', () => {
      page.permitNumber().clear();
      page.permitNumber().sendKeys('1');
      page.permitNumberSubmit().click();
      expect<any>(page.permitNumberRequiredError().isDisplayed()).toBeTruthy();
      expect<any>(page.permitNumberRequiredError().getText()).toEqual('permit number requires an 8 digit number.');
    });

    it('should show a error if the permit is not found', () => {
      page.permitNumber().clear();
      page.permitNumber().sendKeys('11111111');
      expect<any>(page.permitNumberRequiredError().isPresent()).toBeFalsy();
      page.permitNumberSubmit().click();
      expect<any>(page.permitNumberRequiredError().isDisplayed()).toBeTruthy();
      expect<any>(page.permitNotFoundError().getText()).toEqual('Please check that you\'ve entered the correct permit number and try again.');
      expect<any>(element(by.id('api-error')).isDisplayed()).toBeTruthy();
    });

    it('should clear all errors when date search is selected', () => {
      page.dateReportRadio().click();
      expect<any>(page.permitNotFoundError().isPresent()).toBeFalsy();
      expect<any>(element(by.id('api-error')).isPresent()).toBeFalsy();
      expect<any>(page.startDateTimeError().isPresent()).toBeFalsy();
    });
  });
});
