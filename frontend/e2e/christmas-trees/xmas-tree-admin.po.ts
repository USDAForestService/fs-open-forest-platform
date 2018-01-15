import { browser, element, by } from 'protractor';

export class TreesReportPage {
  navigateTo() {
    return browser.get('/admin/christmas-trees/reports');
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

  forestSelectOption(text) {
    return element(by.cssContainingText('#forest-select option', text));
  }

  reportSubmit() {
    return element(by.id('get-report'));
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

  reportTitle() {
    return element(by.id('report-title'));
  }

  reportTreeTotal() {
    return element(by.id('report-tree-total'));
  }

  reportPermitTotal() {
    return element(by.id('report-permit-total'));
  }

  reportTotal() {
    return element(by.id('report-total'));
  }

  reportDownloadButton() {
    return element(by.id('download-report'));
  }

  reportDetailsTable() {
    return element(by.id('report-table'));
  }
}
