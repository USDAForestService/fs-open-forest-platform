import { TreesAdminDistrictDatesPage } from './xmas-tree-admin-district-dates.po';
import { browser, element, by, Key, protractor } from 'protractor';

describe('Xmas tree - Update District Dates', () => {
  let page: TreesAdminDistrictDatesPage;

  describe('District Dates admin page', () => {
    beforeAll(() => {
      page = new TreesAdminDistrictDatesPage();
      browser.driver
        .manage()
        .window()
        .setSize(1400, 900);
      page.navigateTo();
      browser.sleep(800);
      expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/admin/christmas-trees/district-dates');
    });

    describe('basic elements', () => {
      it('should display a start date', () => {
        expect<any>(page.startMonthInput().isPresent()).toBeTruthy();
        expect<any>(page.startDayInput().isPresent()).toBeTruthy();
        expect<any>(page.startYearInput().isPresent()).toBeTruthy();
      });

      it('should display an end date', () => {
        expect<any>(page.endMonthInput().isPresent()).toBeTruthy();
        expect<any>(page.endDayInput().isPresent()).toBeTruthy();
        expect<any>(page.endYearInput().isPresent()).toBeTruthy();
      });
    });

    describe('forest select', () => {
      it('should allow the user to select a forest', () => {
        element(by.id('3-button-label')).click();
        element(by.id('1-button-label')).click();

      });

      it('should allow the user to select a district', () => {
        element(by.id('REDFEATHERLAKES-button-label')).click();
        element(by.id('SULPHUR-button-label')).click();
        element(by.id('ELKCREEK-button-label')).click();
      });

      it('should show date invalid errors if dates are invalid', () => {
        page.startMonthInput().clear();
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
        expect<any>(page.startDateTimeError().isPresent()).toBeFalsy();
      });

      it('should clear the errors after a forest is selected', () => {
        element(by.id('3-button-label')).click();
        element(by.id('1-button-label')).click();
        expect<any>(page.startMonthError().isPresent()).toBeFalsy();
        expect<any>(page.startDayError().isPresent()).toBeFalsy();
        expect<any>(page.startYearError().isPresent()).toBeFalsy();
        expect<any>(page.endMonthError().isPresent()).toBeFalsy();
        expect<any>(page.endDayError().isPresent()).toBeFalsy();
        expect<any>(page.endYearError().isPresent()).toBeFalsy();
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

      it('should let the user update the district dates', () => {
        element(by.id('3-button-label')).click();
        element(by.id('1-button-label')).click();
        page.updateDatesSubmit().click();
        expect(page.districtUpdatedAlert().isDisplayed()).toBeTruthy();
      });
    });
   });
});
