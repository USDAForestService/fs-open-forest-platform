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
      it('should display a forest select', () => {
        expect<any>(page.forestSelect().isPresent()).toBeTruthy();
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
      it('should have the forests in the select', () => {
        expect<any>(page.forestSelectOption('Flathead').getText()).toEqual('Flathead National Forest');
        expect<any>(page.forestSelectOption('Mt. Hood').getText()).toEqual('Mt. Hood National Forest');
      });

      it('should show an error if the form is submitted without a selected forest', () => {
        expect<any>(page.reportSubmit().click());
        expect<any>(page.forestSelectError().isDisplayed()).toBeTruthy();
      });

      it('should allow the user to select a forest', () => {
        page.forestSelectOption('Flathead').click();
      });

      it('should clear the error after a forest is selected', () => {
        expect<any>(page.forestSelectError().isPresent()).toBeFalsy();
      });

      it('should display the default start and end date for the forest when a forest is selected', () => {
        expect<any>(page.startMonthInput().getAttribute('value')).toBeTruthy();
        expect<any>(page.endMonthInput().getAttribute('value')).toBeTruthy();
      });

      it('should display error if start date is after end date', () => {
        page.startYearInput().clear();
        page.startYearInput().sendKeys('2040');
        expect<any>(element(by.css('.usa-input-error-message')).getText()).toEqual(
          'Start date and time must be before end date and time.'
        );
        page.startYearInput().clear();
        page.startYearInput().sendKeys('2014');
        expect<any>(element(by.css('.usa-input-error-message')).isPresent()).toBeFalsy();
      });
    });

    describe('report summary', () => {
      beforeAll(() => {
        page.forestSelectOption('Flathead').click();
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
});
