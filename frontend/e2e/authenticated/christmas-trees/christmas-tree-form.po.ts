import { browser, element, by } from 'protractor';

export class ChristmasTreeForm {
  navigateTo(forestId) {
    return browser.get('christmas-trees/forests/' + forestId + '/applications');
  }
  firstName() {
    return element(by.css('input[id$="primary-permit-holder-first-name"]'));
  }
  firstNameError() {
    return element(by.css('span[id$="primary-permit-holder-first-name-error"]'));
  }
  lastName() {
    return element(by.css('input[id$="primary-permit-holder-last-name"]'));
  }
  lastNameError() {
    return element(by.css('span[id$="primary-permit-holder-last-name-error"]'));
  }

  email() {
    return element(by.css('input[id$="email"]'));
  }
  emailError() {
    return element(by.css('span[id$="email-error"]'));
  }

  treeAmount() {
    return element(by.css('input[id$="quantity"]'));
  }
  treeAmountError() {
    return element(by.css('span[id$="quantity-error"]'));
  }

  permitRules() {
    return element(by.id('permit-rules'));
  }

  rulesToKnow() {
    return element(by.id('rules'));
  }

  rulesAccepted() {
    return element(by.id('accept-rules-label'));
  }
  rulesAcceptedError() {
    return element(by.css('span[id$="accept-rules-error"]'));
  }

  submit() {
    return element(by.id('application-next'));
  }

  submitRules() {
    return element(by.id('submit-application'));
  }

  mockPayGovSubmit() {
    return element(by.id('mock-pay-gov-submit'));
  }

  fillOutForm() {
    element(by.css('.primary-permit-holder-first-name')).sendKeys('Sarah');
    element(by.css('.primary-permit-holder-last-name')).sendKeys('Bell');
    element(by.id('email')).sendKeys('msdf@noemail.com');
    element(by.id('quantity')).sendKeys('2');
  }

  permitCost() {
    return element(by.css('span[id$="total-cost"]'));
  }

  treeApplicationRulesContainer() {
    return element(by.id('tree-application-rules-container'));
  }

  fillOutFormAndSubmit(first = 'Sarah', last = 'Bell') {
    element(by.css('.primary-permit-holder-first-name')).sendKeys(first);
    element(by.css('.primary-permit-holder-last-name')).sendKeys(last);
    element(by.id('email')).sendKeys('msdf@noemail.com');
    element(by.id('quantity')).sendKeys('2');
    this.submit().click();
    this.rulesAccepted().click();
    this.submitRules().click();
  }

  cancelInfo() {
    return element(by.css('.usa-alert-info'));
  }
}
