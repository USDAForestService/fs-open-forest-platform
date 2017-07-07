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
    expect<any>(page.getParagraphText()).toEqual('Apply for a permit');
  });

  it('should have ctas to apply for different permits', () => {
    expect<any>(element(by.id('noncommercial-permit')).isDisplayed()).toBeTruthy();
    expect<any>(element(by.id('temp-outfitters-permit')).isDisplayed()).toBeTruthy();
    expect<any>(element(by.id('help-find-permit')).isDisplayed()).toBeTruthy();
  });

  it('should go to help me pick wizard if help me find permit button is clicked', () => {
    page.navigateTo();
    element(by.id('help-find-permit')).click();
    expect<any>(element(by.css('app-root h1')).getText()).toEqual('Are you charging a participation fee for your activity?');
  });

  helpMePick.questionStep('no', 'Are you charging a participation fee for your activity?');
  helpMePick.questionStep('no', 'Is the purpose of your activity selling goods or services?');
  helpMePick.questionStep('no', 'Does your activity involve more than 75 people (spectators and participants)?');
  helpMePick.landingPage('Your activity does not require a permit.', 'Thanks for checking!');

  helpMePick.questionStep('no', 'Are you charging a participation fee for your activity?');
  helpMePick.questionStep('no', 'Is the purpose of your activity selling goods or services?');
  helpMePick.questionStep('yes', 'Does your activity involve more than 75 people (spectators and participants)?');
  helpMePick.landingPage('The correct permit for you is the "noncommercial group use application."', 'You can apply online.');

  helpMePick.questionStep('no', 'Are you charging a participation fee for your activity?');
  helpMePick.questionStep('yes', 'Is the purpose of your activity selling goods or services?');
  helpMePick.questionStep('no', 'Does your activity involve guiding or outfitting?');
  helpMePick.landingPage('Your activity requires a permit, but not one available online.', 'Learn about other permit types (available via a paper application) at Mt. Baker-Snowquaminie.');

  helpMePick.questionStep('yes', 'Are you charging a participation fee for your activity?');
  helpMePick.questionStep('yes', 'Does your activity involve guiding or outfitting?');
  helpMePick.landingPage('The correct permit for you is the "temporary outfitter and guide permit."', 'You can apply online.');

});
