import { browser, element, by } from 'protractor';

export class ChristmasTreeOrderConfirmation {
  confirmationDetails() {
    return element(by.id('tree-confirmation-details-container'));
  }

  orderSummary() {
    return element(by.id('tree-order-summary-container'));
  }

  printPermitButton() {
    return element(by.id('tree-print-permit'));
  }

  additionalInfo() {
    return element(by.id('tree-additional-info-container'));
  }
}

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

  fillOutFormAndSubmit(first = 'Sarah', last = 'Bell') {
    element(by.css('.primary-permit-holder-first-name')).sendKeys(first);
    element(by.css('.primary-permit-holder-last-name')).sendKeys(last);
    element(by.id('email')).sendKeys('msdf@noemail.com');
    element(by.id('quantity')).sendKeys('2');
    this.rulesAccepted().click();
    this.submit().click();
  }
}

export class ChristmasTreeFormAfterCancel {
  navigateTo(forestId, permitId) {
    return browser.get(`christmas-trees/forests/${forestId}/applications/${permitId}`);
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

  permitCost() {
    return element(by.css('span[id$="total-cost"]'));
  }

  rulesAccepted() {
    return element(by.id('accept-rules-label'));
  }
  rulesAcceptedError() {
    return element(by.css('span[id$="accept-rules-error"]'));
  }

  cancelInfo() {
    return element(by.css('.usa-alert-info'));
  }

  submit() {
    return element(by.id('submit-application'));
  }

  mockPayGovSubmit() {
    return element(by.id('mock-pay-gov-submit'));
  }
}
