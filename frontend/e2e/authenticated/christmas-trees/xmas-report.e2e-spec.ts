import { browser, element, by, protractor } from 'protractor';
import { loginAdmin } from '../../support/auth-helper';
import { TreesReportPage } from './xmas-tree-admin.po';

const page = new TreesReportPage();

xdescribe('Xmas tree - Admin Reports', () => {
  xdescribe('Permit report page', () => {
    beforeAll(() => {
      browser.driver.manage().deleteAllCookies();
      browser.driver.manage().window().setSize(1400, 900);

      page.navigateTo();

      loginAdmin();

      expect<any>(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/christmas-trees/admin/reports');
    });

    xdescribe('basic elements', () => {
      it('should have a date search radio', () => {
        expect<any>(page.dateReportRadio().isPresent()).toBeTruthy();
      });

      xit('should have a permit number search radio', () => {
        expect<any>(page.permitNumberReportRadio().isPresent()).toBeTruthy();
      });

      // it('should display a start date', () => {
      //   expect<any>(page.startMonthInput().isPresent()).toBeTruthy();
      //   expect<any>(page.startDayInput().isPresent()).toBeTruthy();
      //   expect<any>(page.startYearInput().isPresent()).toBeTruthy();
      // });
      //
      // it('should display a end date', () => {
      //   expect<any>(page.endMonthInput().isPresent()).toBeTruthy();
      //   expect<any>(page.endDayInput().isPresent()).toBeTruthy();
      //   expect<any>(page.endYearInput().isPresent()).toBeTruthy();
      // });
    });

    xdescribe('forest select', () => {
      xit('should show date invalid errors if dates are invalid', () => {
        element(by.id('3-button-label')).click();
        page.startMonthInput().clear();
        expect<any>(page.reportSubmit().click());
        page.startMonthInput().sendKeys('13');
        page.startMonthInput().sendKeys(protractor.Key.TAB);
        expect<any>(page.startMonthError().getText()).toEqual('Start month requires a 1 or 2 digit number that is less than 13.');
        page.startMonthInput().clear();
        page.startMonthInput().sendKeys('10');
        page.startMonthInput().sendKeys(protractor.Key.TAB);
        expect<any>(page.startMonthError().isPresent()).toBeFalsy();

        page.startDayInput().clear();
        page.startDayInput().sendKeys('33');
        page.startDayInput().sendKeys(protractor.Key.TAB);
        expect<any>(page.startDayError().getText()).toEqual('Start day requires a 1 or 2 digit number.');
        page.startDayInput().clear();
        page.startDayInput().sendKeys('10');
        expect<any>(page.startDayError().isPresent()).toBeFalsy();
      });

      xit('should display error if start date is after end date', () => {
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

    xdescribe('report summary', () => {
      beforeAll(() => {
        page.reportSubmit().click();
      });

      xit('should have a details table', () => {
        expect<any>(page.reportDetailsTable().isDisplayed()).toBeTruthy();
      });

      xit('should show a download button', () => {
        expect<any>(page.reportDownloadButton().isDisplayed()).toBeTruthy();
      });

      xit('should have a title', () => {
        expect<any>(page.reportTitle().isDisplayed()).toBeTruthy();
      });

      xit('should have a permit total', () => {
        expect<any>(page.reportPermitTotal().isDisplayed()).toBeTruthy();
      });

      xit('should display the report total', () => {
        expect<any>(page.reportTotal().isDisplayed()).toBeTruthy();
      });

      xit('should display the trees total', () => {
        expect<any>(page.reportTreeTotal().isDisplayed()).toBeTruthy();
      });
    });
  });

  xdescribe('search by permit number', () => {
    beforeAll(() => {
      page.permitNumberReportRadio().click();
      browser.sleep(1);
    });

    xit('should show a required message if not permit number is entered', () => {
      page.permitNumberSubmit().click();
      expect<any>(page.permitNumberRequiredError().isDisplayed()).toBeTruthy();
      expect<any>(page.permitNumberRequiredError().getText()).toEqual('permit number is required.');
    });

    xit('should show a error if not permit number is not a number', () => {
      page.permitNumber().sendKeys('a');
      page.permitNumberSubmit().click();
      expect<any>(page.permitNumberRequiredError().isDisplayed()).toBeTruthy();
      expect<any>(page.permitNumberRequiredError().getText()).toEqual('permit number requires an 8 digit number.');
    });

    xit('should show a error if not permit number is not long enough', () => {
      page.permitNumber().clear();
      page.permitNumber().sendKeys('1');
      page.permitNumberSubmit().click();
      expect<any>(page.permitNumberRequiredError().isDisplayed()).toBeTruthy();
      expect<any>(page.permitNumberRequiredError().getText()).toEqual('permit number requires an 8 digit number.');
    });

    xit('should show a error if the permit is not found', () => {
      page.permitNumber().clear();
      page.permitNumber().sendKeys('11111111');
      expect<any>(page.permitNumberRequiredError().isPresent()).toBeFalsy();
      page.permitNumberSubmit().click();
      expect<any>(page.permitNumberRequiredError().isDisplayed()).toBeTruthy();
      expect<any>(page.permitNotFoundError().getText()).toEqual('Please check that you\'ve entered the correct permit number and try again.');
      expect<any>(element(by.id('api-error')).isDisplayed()).toBeTruthy();
    });

    xit('should clear all errors when date search is selected', () => {
      page.dateReportRadio().click();
      expect<any>(page.permitNotFoundError().isPresent()).toBeFalsy();
      expect<any>(element(by.id('api-error')).isPresent()).toBeFalsy();
      expect<any>(page.startDateTimeError().isPresent()).toBeFalsy();
    });
  });
});
