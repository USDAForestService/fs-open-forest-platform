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
