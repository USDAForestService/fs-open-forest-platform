import { TempOutfittersLearnMorePage } from './app.po';
import { browser, element, by, Key, protractor } from 'protractor';

describe('Temp Outfitters Learn More', () => {
  let page: TempOutfittersLearnMorePage;

  describe('sidebar nav', () => {
    beforeEach(() => {
      page = new TempOutfittersLearnMorePage();
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

    it( 'should have a applicant section link', () => {
      expect<any>(element(by.partialLinkText('Applicant')).getText()).toEqual('Applicant requirements');
    });

  });
});
