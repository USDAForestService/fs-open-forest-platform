import { browser, element, by } from 'protractor';

export class TreesAdminDistrictDatesPage {
  navigateTo() {
    return browser.get('/admin/christmas-trees/district-dates');
  }

  districtUpdatedAlert() {
    return element(by.id('district-updated-alert'));
  }

  forestSelect() {
    return element(by.id('forest-select'));
  }

  startMonthInput() {
    return element(by.id('start-month'));
  }

  startDayInput() {
    return element(by.id('start-day'));
  }

  startYearInput() {
    return element(by.id('start-year'));
  }

  endMonthInput() {
    return element(by.id('end-month'));
  }

  endDayInput() {
    return element(by.id('end-day'));
  }

  endYearInput() {
    return element(by.id('end-year'));
  }

  startMonthError() {
    return element(by.id('start-month-error'));
  }

  startDayError() {
    return element(by.id('start-day-error'));
  }

  startYearError() {
    return element(by.id('start-year-error'));
  }

  endMonthError() {
    return element(by.id('end-month-error'));
  }

  endDayError() {
    return element(by.id('end-day-error'));
  }

  endYearError() {
    return element(by.id('end-year-error'));
  }

  startDateTimeError() {
    return element(by.id('start-date-time-error'));
  }

  endDateTimeError() {
    return element(by.id('end-date-time-error'));
  }

  forestSelectOption(text) {
    return element(by.cssContainingText('#forest-select option', text));
  }

  updateDatesSubmit() {
    return element(by.id('update-dates'));
  }

  forestSelectError() {
    return element(by.id('forest-error'));
  }

  startDateError() {
    return element(by.id('end-date-error'));
  }

  endDatetError() {
    return element(by.id('start-date-error'));
  }

}
