import { browser, element, by } from 'protractor';

export class TreesReportPage {
  navigateTo() {
    return browser.get('/admin/christmas-trees/reports');
  }

  forestAdminNav() {
    return element(by.id('forest-admin-nav'));
  }

  forestAdminMobileNav() {
    return element(by.id('forest-admin-mobile-nav'));
  }

  forestAdminMobileMenuButton() {
    return element(by.id('mobile-forest-admin-menu-btn'));
  }

  adminPermits() {
    return element(by.id('forest-admin-permits'));
  }

  adminReports() {
    return element(by.id('forest-admin-reports'));
  }

  adminSeasons() {
    return element(by.id('forest-admin-seasons'));
  }

  adminAreas() {
    return element(by.id('forest-admin-areas'));
  }

  adminForm() {
    return element(by.id('forest-admin-form-link'));
  }

  adminPermitsMobile() {
    return element(by.id('forest-admin-permits-mobile'));
  }

  adminReportsMobile() {
    return element(by.id('forest-admin-reports-mobile'));
  }

  adminSeasonsMobile() {
    return element(by.id('forest-admin-seasons-mobile'));
  }

  adminAreasMobile() {
    return element(by.id('forest-admin-areas-mobile'));
  }

  adminFormMobile() {
    return element(by.id('forest-admin-form-mobile-link'));
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

  dateReportRadio() {
    return element(by.id('date-search-button-label'));
  }

  permitNumberReportRadio() {
    return element(by.id('permit-id-search-button-label'));
  }

  permitNumberRequiredError() {
    return element(by.id('permit-number-error'));
  }

  permitNumber() {
    return element(by.id('permit-number-input'));
  }

  permitNumberSubmit() {
    return element(by.id('get-report-permitnumber'));
  }

  permitNotFoundError() {
    return element(by.id('permit-not-found-error'));
  }
}
