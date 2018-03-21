import { browser, element, by, Key } from 'protractor';

import { ChristmasTreeOrderConfirmation } from './christmas-tree-form-confirmation.po';
import { ChristmasTreeForm } from './christmas-tree-form.po';

describe('Apply for a Christmas tree permit', () => {
  let christmasTreeForm: ChristmasTreeForm;
  let confirmPage: ChristmasTreeOrderConfirmation;
  const forestId = 'mthood';

  describe('fill out basic user info', () => {
    beforeEach(() => {
      christmasTreeForm = new ChristmasTreeForm();
    });

    it('should display the permit name in the header', () => {
      christmasTreeForm.navigateTo(forestId);
      expect<any>(element(by.css('app-root h1')).getText()).toEqual('Buy a Christmas tree permit');
    });

    it('should show the breadcrumb', () => {
      expect<any>(element(by.css('nav')).isPresent()).toBeTruthy();
    });

    it('should show all fields as invalid if submitted without input', () => {
      christmasTreeForm.submit().click();
      browser.sleep(500);
    });

    it('should require a first name', () => {
      christmasTreeForm.navigateTo(forestId);
      expect<any>(christmasTreeForm.firstName().isDisplayed()).toBeTruthy();
      christmasTreeForm.submit().click();
      browser.sleep(1000);
      expect<any>(christmasTreeForm.firstName().isDisplayed()).toBeTruthy();
      expect<any>(christmasTreeForm.firstNameError().isDisplayed()).toBeTruthy();
    });

    it('should let the user enter a first name', () => {
      christmasTreeForm.firstName().sendKeys('Melvin');
      christmasTreeForm.submit().click();
      expect<any>(christmasTreeForm.firstNameError().isPresent()).toBeFalsy();
    });

    it('should require a last name', () => {
      expect<any>(christmasTreeForm.lastName().isDisplayed()).toBeTruthy();
      christmasTreeForm.submit().click();
      browser.sleep(1000);
      expect<any>(christmasTreeForm.lastName().isDisplayed()).toBeTruthy();
      expect<any>(christmasTreeForm.lastNameError().isDisplayed()).toBeTruthy();
    });

    it('should let the user enter a last name', () => {
      christmasTreeForm.lastName().sendKeys('Apharce');
      christmasTreeForm.submit().click();
      expect<any>(christmasTreeForm.lastNameError().isPresent()).toBeFalsy();
    });

    it('should display an error for an invalid email address', () => {
      expect<any>(christmasTreeForm.email().isDisplayed()).toBeTruthy();
      christmasTreeForm.email().sendKeys('aaaaaa');
      expect<any>(christmasTreeForm.emailError().isDisplayed()).toBeTruthy();
      christmasTreeForm.email().sendKeys('@aaa');
      expect<any>(christmasTreeForm.emailError().isPresent()).toBeFalsy();
    });

    it('should display an error for an invalid tree amount', () => {
      expect<any>(christmasTreeForm.treeAmount().isDisplayed()).toBeTruthy();
      christmasTreeForm.treeAmount().clear();
      christmasTreeForm.treeAmount().sendKeys('-');
      expect<any>(christmasTreeForm.treeAmountError().isDisplayed()).toBeTruthy();
    });

    it('should display an error for an 0 tree amount', () => {
      expect<any>(christmasTreeForm.treeAmountError().isDisplayed()).toBeTruthy();
      christmasTreeForm.treeAmount().clear();
      christmasTreeForm.treeAmount().sendKeys('0');
      expect<any>(christmasTreeForm.treeAmountError().isDisplayed()).toBeTruthy();
    });

    it('should display an error for a tree amount great than max', () => {
      christmasTreeForm.treeAmount().clear();
      christmasTreeForm.treeAmount().sendKeys('9');
      expect<any>(christmasTreeForm.treeAmountError().isDisplayed()).toBeTruthy();
    });

    it('should let the user enter a valid tree amount', () => {
      christmasTreeForm.treeAmount().clear();
      christmasTreeForm.treeAmount().sendKeys('1');
      expect<any>(christmasTreeForm.treeAmountError().isPresent()).toBeFalsy();
    });

    it('should calculate total cost', () => {
      christmasTreeForm.navigateTo(forestId);
      christmasTreeForm.fillOutForm();
      browser.sleep(500);
      expect<any>(element(by.id('total-cost')).getText()).toEqual('$10');
    });
  });

  describe('application rules', () => {
    beforeAll(() => {
      christmasTreeForm = new ChristmasTreeForm();
      christmasTreeForm.navigateTo(forestId);
      browser.sleep(500);
      christmasTreeForm.fillOutForm();
      browser.sleep(500);
    });

    it('should have a Next button', () => {
      expect(christmasTreeForm.submit().isPresent()).toBeTruthy();
      christmasTreeForm.submit().click();
    });

    it('should show the rules section after next is clicked', () => {
      expect<any>(christmasTreeForm.treeApplicationRulesContainer().getText()).toContain(
        'Christmas trees may be taken from the Mt. Hood National Forest'
      );
    });

    it('should make the user accept the rules before they can submit', () => {
      christmasTreeForm.submitRules().click();
      expect<any>(christmasTreeForm.rulesAcceptedError().isDisplayed()).toBeTruthy();
    });

    it('should redirect to mock pay.gov on application submit', () => {
      christmasTreeForm.navigateTo(forestId);
      christmasTreeForm.fillOutFormAndSubmit();
      browser.sleep(1500);
      expect(browser.getCurrentUrl()).toContain('http://localhost:4200/mock-pay-gov');
    });

    it('should redirect to confirmation page from mock pay.gov on success', () => {
      element(by.id('credit-card-number')).sendKeys('1100000000000123');
      christmasTreeForm.mockPayGovSubmit().click();
      browser.sleep(1500);
      expect(browser.getCurrentUrl()).toContain(
        `http://localhost:4200/christmas-trees/forests/${forestId}/applications/permits`
      );
    });
  });

  describe('confirmation page', () => {
    beforeAll(() => {
      confirmPage = new ChristmasTreeOrderConfirmation();
      christmasTreeForm = new ChristmasTreeForm();
      christmasTreeForm.navigateTo(forestId);
      browser.sleep(1000);
      expect(browser.getCurrentUrl()).toContain(`http://localhost:4200/christmas-trees/forests/${forestId}/applications`);
      christmasTreeForm.fillOutFormAndSubmit();
      browser.sleep(1000);
      expect(browser.getCurrentUrl()).toContain('http://localhost:4200/mock-pay-gov');
      element(by.id('credit-card-number')).sendKeys('1100000000000123');
      christmasTreeForm.mockPayGovSubmit().click();
      browser.sleep(1000);
      expect(browser.getCurrentUrl()).toContain(
        `http://localhost:4200/christmas-trees/forests/${forestId}/applications/permits`
      );
      browser.sleep(1000);
    });

    it('should show confirmation details', () => {
      expect<any>(confirmPage.confirmationDetails().isDisplayed()).toBeTruthy();
    });

    it('should show the breadcrumb', () => {
      expect<any>(element(by.css('nav')).isPresent()).toBeTruthy();
    });

    it('should show the order summary', () => {
      expect<any>(confirmPage.orderSummary().isDisplayed()).toBeTruthy();
    });

    it('should show additional information', () => {
      expect<any>(confirmPage.additionalInfo().isDisplayed()).toBeTruthy();
    });

    it('should show the print permit button', () => {
      expect<any>(confirmPage.printPermitButton().isDisplayed()).toBeTruthy();
    });

    it('should show error page if credit card error', () => {
      christmasTreeForm.navigateTo(forestId);
      christmasTreeForm.fillOutFormAndSubmit();
      browser.sleep(900);
      element(by.id('credit-card-number')).sendKeys('0000000000000123');
      christmasTreeForm.mockPayGovSubmit().click();
      browser.sleep(1900);
      expect<any>(element(by.id('pay-gov-errors')).isDisplayed()).toBeTruthy();
      christmasTreeForm.navigateTo(forestId);
    });
  });

  describe('pay gov token errors', () => {
    beforeEach(() => {
      confirmPage = new ChristmasTreeOrderConfirmation();
      christmasTreeForm = new ChristmasTreeForm();
      christmasTreeForm.navigateTo(forestId);
    });
    it('should show 500 error if first name is 1 and last name is 2', () => {
      christmasTreeForm.fillOutFormAndSubmit('1', '2');
      expect<any>(element(by.css('.usa-alert-heading')).getText()).toEqual(
        'Sorry, we were unable to process your request. Please try again.'
      );
    });

    it('should show 500 error if first name is 1 and last name is 1', () => {
      christmasTreeForm.fillOutFormAndSubmit('1', '1');
      browser.sleep(500);
      expect<any>(element(by.css('.usa-alert-heading')).getText()).toEqual(
        'Sorry, we were unable to process your request. Please try again.'
      );
    });
  });

  describe('repopulating fields after cancel', () => {
    beforeAll(() => {
      confirmPage = new ChristmasTreeOrderConfirmation();
      christmasTreeForm = new ChristmasTreeForm();
      christmasTreeForm.navigateTo(forestId);
      christmasTreeForm.fillOutFormAndSubmit();
      browser.sleep(1500);
    });

    let permitId = '';
    it('should redirect to application on cancel and display a message telling the user what to do', () => {
      element(by.css('.usa-button-grey')).click();
      browser.sleep(1500);
      expect(christmasTreeForm.cancelInfo().isDisplayed()).toBeTruthy();
      browser.getCurrentUrl().then(url => {
        permitId = url.split('/')[8];
      });
    });

    it('should have the first name prefilled', () => {
      expect(christmasTreeForm.firstName().getAttribute('value')).toBe('Sarah');
    });

    it('should have the last name prefilled', () => {
      expect(christmasTreeForm.lastName().getAttribute('value')).toBe('Bell');
    });

    it('should have the email address prefilled', () => {
      expect(christmasTreeForm.email().getAttribute('value')).toBe('msdf@noemail.com');
    });

    it('should have the quantity prefilled', () => {
      expect(christmasTreeForm.treeAmount().getAttribute('value')).toBe('2');
    });

    it('should have the cost calculated', () => {
      expect(christmasTreeForm.permitCost().getText()).not.toEqual('$0');
    });

    it('should be hide message telling the user what to do next if they resubmit with errors', () => {
      christmasTreeForm.submit().click();
      expect(christmasTreeForm.cancelInfo().isPresent()).toBeFalsy();
    });
  });
});
