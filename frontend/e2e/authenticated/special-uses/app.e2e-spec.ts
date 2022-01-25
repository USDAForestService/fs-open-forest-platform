import { SpecialUseHomepage, HelpMePick } from './app.po';
import { browser, element, by, Key } from 'protractor';

describe('frontend App', () => {
  let page: SpecialUseHomepage;
  let helpMePick: HelpMePick;
  helpMePick = new HelpMePick();

  describe('error handling', () => {
    it('should have a 404 page', () => {
      browser.get('/404');
      expect<any>(element(by.css('app-root h1')).getText()).toEqual('Digital Permits - 404 Page not found');
    });
    it('should redirect to 404 page for unknown urls', () => {
      browser.get('/smokeybear');
      expect<any>(element(by.css('app-root h1')).getText()).toEqual('Digital Permits - 404 Page not found');
    });
  });

  describe('permit application', () => {
    beforeEach(() => {
      page = new SpecialUseHomepage();
    });

    it('should display page title', () => {
      page.navigateTo();
      expect<any>(page.getParagraphText()).toEqual('Mt. Baker-Snoqualmie National Forest');
    });

    it('should show correct page title when navigating by link', () => {
      page.navigateTo();
      element(by.id('help-find-permit')).click();
      element(by.id('us-forest-service-logo')).click();
      // expect<any>(browser.getTitle()).toEqual('Christmas tree permits | U.S. Forest Service Digital Permits');
    });

    it('should have ctas to apply for different permits', () => {
      page.navigateTo();
      expect<any>(element(by.id('noncommercial-background')).isDisplayed()).toBeTruthy();
      expect<any>(element(by.id('tempoutfitter-background')).isDisplayed()).toBeTruthy();
      expect<any>(element(by.id('notsure-background')).isDisplayed()).toBeTruthy();
    });

    it('should go to help me pick wizard if help me find permit button is clicked', () => {
      page.navigateTo();
      element(by.id('help-find-permit')).click();
      expect<any>(element(by.css('app-root h2')).getText()).toEqual(
        'Are you charging a participation fee for your activity?'
      );
    });

    helpMePick.questionStep('no', 'Are you charging a participation fee for your activity?');
    helpMePick.questionStep('no', 'Is the purpose of your activity selling goods or services?');
    helpMePick.questionStep('no', 'Does your activity involve more than 75 people (spectators and participants)?');
    helpMePick.landingPage(
      `Your activity does not require a permit. However, if you are planning a large group activity, it may be helpful to contact your local office to find out about any special restrictions, or get helpful information.`, 'Thanks for checking!'
      );
    helpMePick.questionStep('no', 'Are you charging a participation fee for your activity?');
    helpMePick.questionStep('no', 'Is the purpose of your activity selling goods or services?');
    helpMePick.questionStep('yes', 'Does your activity involve more than 75 people (spectators and participants)?');
    helpMePick.landingPage(
      'The correct permit for you is the "Non-Commercial Group Use application."',
      'You can apply online.'
    );

    helpMePick.questionStep('no', 'Are you charging a participation fee for your activity?');
    helpMePick.questionStep('yes', 'Is the purpose of your activity selling goods or services?');
    helpMePick.questionStep('no', 'Does your activity involve guiding or outfitting?');
    helpMePick.landingPage(
      'Your activity requires a permit, but not one available online.',
      'Learn about other permit types (available via a paper application) at Mt. Baker-Snoqualmie.'
    );

    helpMePick.questionStep('yes', 'Are you charging a participation fee for your activity?');
    helpMePick.questionStep('yes', 'Does your activity involve guiding or outfitting?');
    helpMePick.landingPage(
      'The correct permit for you is the "Temporary Outfitting and Guiding permit."',
      'You can apply online.'
    );
  });
});
