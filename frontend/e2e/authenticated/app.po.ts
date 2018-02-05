import { browser, element, by } from 'protractor';

export class FrontendPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}

export class NoncommercialGroupForm {
  navigateTo() {
    return browser.get('/applications/noncommercial-group-use/new');
  }
}

export class NonCommercialLearnMorePage {
  navigateTo() {
    return browser.get('/applications/noncommercial-group-use/learn-more');
  }
}

export class TempOutfittersLearnMorePage {
  navigateTo() {
    return browser.get('/applications/temp-outfitters/learn-more');
  }
}

export class TempOutfittersForm {
  navigateTo() {
    return browser.get('/applications/temp-outfitters/new');
  }
}

export class AdminApplicationList {
  navigateTo() {
    return browser.get('/admin/applications');
  }
}

export class HelpMePick {
  questionStep(cta, question) {
    it('should have a question', () => {
      expect<any>(element(by.css('app-root h1')).getText()).toEqual(question);
    });

    it('should have yes and no buttons', () => {
      expect<any>(element(by.css('.yes')).isDisplayed()).toBeTruthy();
      expect<any>(element(by.css('.no')).isDisplayed()).toBeTruthy();
    });

    it('should go to next question when ' + cta + ' is clicked', () => {
      element(by.css('.' + cta)).click();
      expect<any>(element(by.css('app-root h1')).isDisplayed()).toBeTruthy();
    });
  }

  landingPage(heading, message) {
    it('should have a heading', () => {
      expect<any>(element(by.css('app-root h1')).getText()).toEqual(heading);
    });
    it('should have a message', () => {
      expect<any>(element(by.css('.message')).getText()).toEqual(message);
    });

    it('should go back to step one', () => {
      browser.get('/');
      element(by.id('help-find-permit')).click();
      expect<any>(element(by.css('app-root h1')).getText()).toEqual(
        'Are you charging a participation fee for your activity?'
      );
    });
  }
}
