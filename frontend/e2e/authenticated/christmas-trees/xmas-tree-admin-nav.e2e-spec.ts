import { browser } from 'protractor';
import { loginAdmin } from '../../support/auth-helper';
import { TreesReportPage } from './xmas-tree-admin.po';

const page = new TreesReportPage();

xdescribe('Xmas admin navbar', () => {
  beforeAll(() => {
    browser.driver.manage().deleteAllCookies();
    browser.driver.manage().window().setSize(1400, 900);

    page.navigateTo();

    loginAdmin();
  });
});
