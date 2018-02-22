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
