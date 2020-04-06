import { NonCommercialLearnMorePage } from './app.po';
import { browser, element, by, Key, protractor } from 'protractor';

describe('NonCommercial Learn More', () => {
  let page: NonCommercialLearnMorePage;

  describe('sidebar nav', () => {
    beforeEach(() => {
      page = new NonCommercialLearnMorePage();
      browser.driver
        .manage()
        .window()
        .setSize(1400, 900);
      page.navigateTo();
      browser.sleep(800);

    });

    it('should have a sidebar', () => {
      expect<any>(element(by.id('sidebar-nav')).isDisplayed()).toBeTruthy();
    });

    it( 'should have a who section', () => {
      expect<any>(element(by.partialLinkText('Who has to get a permit')).getText()).toEqual('Who has to get a permit under the regulation?');
    });

    it( 'should have a applicant section link', () => {
      expect<any>(element(by.partialLinkText('Applicant')).getText()).toEqual('Applicant requirements');
    });

    it( 'should have a evaluation section link', () => {
      expect<any>(element(by.partialLinkText('Evaluation')).getText()).toEqual('Evaluation process');
    });

  });
});
