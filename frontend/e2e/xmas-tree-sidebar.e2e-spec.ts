import { TreesSidebarPage } from './app.po';
import { browser, element, by, Key, protractor } from 'protractor';

describe('Xmas sidebar wizard page', () => {
  let page: TreesSidebarPage;

  beforeEach(() => {
    page = new TreesSidebarPage();
    browser.driver.manage().window().setSize(1400, 900);
    page.navigateTo();
  });

  it('should have a title with forest name', () => {
    expect<any>(element(by.css('app-root h1')).getText()).toEqual(
      'Mt. Hood National Forest Christmas tree permit\nNov 1, 2017 - Dec 24, 2017'
    );
  });
});
