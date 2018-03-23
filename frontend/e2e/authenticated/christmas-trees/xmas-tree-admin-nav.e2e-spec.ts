import { browser, element, by, Key, protractor } from 'protractor';
import { TreesReportPage } from './xmas-tree-admin.po';

describe('Xmas admin navbar', () => {
  let page: TreesReportPage;

  beforeAll(() => {
    page = new TreesReportPage();
    browser.driver
      .manage()
      .window()
      .setSize(1400, 900);
    page.navigateTo();
    browser.sleep(900);
  });

  it('should have a admin nav menu', () => {
    expect<any>(page.forestAdminNav().isDisplayed()).toBeTruthy();
  });

  it('should have a forest home link', () => {
    expect<any>(page.adminPermits().getText()).toEqual('Christmas tree permits');
  });

  it('should have a reports link', () => {
    expect<any>(page.adminReports().getText()).toEqual('Generate reports');
  });

  it('should have a seasons link', () => {
    expect<any>(page.adminSeasons().getText()).toEqual('Change season dates');
  });

  it('should have a areas link', () => {
    expect<any>(page.adminAreas().getText()).toEqual('Change cutting area dates');
  });

  it('should have a form link', () => {
    expect<any>(page.adminForm().getText()).toEqual('Request a content change');
  });

  it('should navigate to the season-dates page when season-dates clicked', () => {
    page.adminSeasons().click();
    browser.sleep(500);
    expect(browser.getCurrentUrl()).toContain(
      `season-dates`
    );
  });

  it('should navigate to the areas page when areas clicked', () => {
    page.adminAreas().click();
    browser.sleep(500);
    expect(browser.getCurrentUrl()).toContain(
      `district-dates`
    );
  });

  it('should navigate to the reports page when reports clicked', () => {
    page.adminReports().click();
    browser.sleep(500);
    expect(browser.getCurrentUrl()).toContain(
      `reports`
    );
  });


  it('should have a menu button and hide sidebar nav when resized to mobile', () => {
    browser.driver
      .manage()
      .window()
      .setSize(800, 1280);
    browser.sleep(900);
    expect<any>(page.forestAdminMobileMenuButton().isDisplayed()).toBeTruthy();
    expect<any>(page.forestAdminNav().isDisplayed()).toBeFalsy();
  });

  it('should open menu if menu button is clicked', () => {
    expect<any>(page.forestAdminMobileMenuButton().isDisplayed()).toBeTruthy();
    page.forestAdminMobileMenuButton().click();
    browser.sleep(500);
    expect<any>(page.forestAdminMobileNav().isDisplayed()).toBeTruthy();
  });

  it('should have a mobile forest home link', () => {
    expect<any>(page.adminPermitsMobile().getText()).toEqual('Christmas tree permits');
  });

  it('should have a mobile reports link', () => {
    expect<any>(page.adminReportsMobile().getText()).toEqual('Generate reports');
  });

  it('should have a mobile seasons link', () => {
    expect<any>(page.adminSeasonsMobile().getText()).toEqual('Change season dates');
  });

  it('should have a mobile areas link', () => {
    expect<any>(page.adminAreasMobile().getText()).toEqual('Change cutting area dates');
  });

  it('should have a mobile form link', () => {
    expect<any>(page.adminFormMobile().getText()).toEqual('Request a content change');
  });


});
