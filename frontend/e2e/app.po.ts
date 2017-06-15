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
    return browser.get('/#/applications/noncommercial-group-use/new');
  }
}

export class TempOutfittersForm {
  navigateTo() {
    return browser.get('/#/applications/temp-outfitters/new');
  }
}

export class AdminApplicationList {
  navigateTo() {
    return browser.get('/#/admin/applications');
  }
}

export class AdminApplicationView {
  navigateTo() {
    return browser.get('/#/admin/applications/234');
  }
}

export class HelpMePick {
  questionStep(cta, question) {
    it('should have a question', () => {
      expect(element(by.css('.question')).getText()).toEqual(question);
    });

    it('should have yes and no buttons', () => {
      expect(element(by.css('.yes')).isDisplayed()).toBeTruthy();
      expect(element(by.css('.no')).isDisplayed()).toBeTruthy();
    });

    it('should go to next question when ' + cta + ' is clicked', () => {
      element(by.css('.' + cta)).click();
      expect(element(by.css('app-root h1')).getText()).toEqual('Help me pick a permit');
    });
  }

  landingPage(message) {
    it('should have a message', () => {
      expect(element(by.css('.message')).getText()).toEqual(message);
    });

    it('should go back to step one', () => {
      browser.get('/');
      element(by.id('do-i-need-permit')).click();
      expect(element(by.css('app-root h1')).getText()).toEqual('Help me pick a permit');
    });
  }
}
