import { FrontendPage, HelpMePick } from './app.po';
import { browser, element, by, Key} from 'protractor';

describe('frontend App', () => {
  let page: FrontendPage;
  let helpMePick: HelpMePick;
  helpMePick = new HelpMePick();

  beforeEach(() => {
    page = new FrontendPage();
  });

  it('should display page title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('U.S. Forest Service permits');
  });

  it('should show calls to action', () => {
    expect(element(by.id('do-i-need-permit')).isDisplayed()).toBeTruthy();
    expect(element(by.id('apply-for-permit')).isDisplayed()).toBeTruthy();
  });

  it('should go to apply for permit page when button is clicked', () => {
    element(by.id('apply-for-permit')).click();
    expect(element(by.css('app-root h1')).getText()).toEqual('Apply for a permit');
  });

  it('should have ctas to apply for different permtis', () => {
    expect(element(by.id('noncommercial-permit')).isDisplayed()).toBeTruthy();
    expect(element(by.id('temp-outfitters-permit')).isDisplayed()).toBeTruthy();
    expect(element(by.id('help-find-permit')).isDisplayed()).toBeTruthy();
  });

  it('should go to help me pick wizard if do i need a permit button is clicked', () => {
    page.navigateTo();
    element(by.id('do-i-need-permit')).click();
    expect(element(by.css('app-root h1')).getText()).toEqual('Help me pick a permit');
  });

  helpMePick.questionStep('no', 'Are you charging a participation fee for your activity?');
  helpMePick.questionStep('no', 'Is the purpose of your activity selling goods or services?');
  helpMePick.questionStep('no', 'Does your activity involve more than 75 people (spectators and participants)?');
  helpMePick.landingPage('Your activity does not require a permit. Thanks for checking!');

  helpMePick.questionStep('no', 'Are you charging a participation fee for your activity?');
  helpMePick.questionStep('no', 'Is the purpose of your activity selling goods or services?');
  helpMePick.questionStep('yes', 'Does your activity involve more than 75 people (spectators and participants)?');
  helpMePick.landingPage('You can apply for a noncommercial group use application online.');

  helpMePick.questionStep('no', 'Are you charging a participation fee for your activity?');
  helpMePick.questionStep('yes', 'Is the purpose of your activity selling goods or services?');
  helpMePick.questionStep('no', 'Does your activity involve guiding or outfitting?');
  helpMePick.landingPage('Your activity requires a permit, but not one available online. Learn about other permit types (available via a paper application) at Mt. Baker-Snowquaminie.');

  helpMePick.questionStep('yes', 'Are you charging a participation fee for your activity?');
  helpMePick.questionStep('yes', 'Does your activity involve guiding or outfitting?');
  helpMePick.landingPage('You can apply for a temporary outfitter and guide permit online.');


});
