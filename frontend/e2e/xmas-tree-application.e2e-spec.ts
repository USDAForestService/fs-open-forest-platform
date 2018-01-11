import {
  ChristmasTreeForm,
  ChristmasTreeOrderConfirmation,
  ChristmasTreeFormAfterCancel
} from './xmas-tree-application.po';
import { browser, element, by, Key } from 'protractor';

describe('Apply for a Christmas tree permit', () => {
  let page: ChristmasTreeForm;
  let confirmPage: ChristmasTreeOrderConfirmation;
  let prefilledPage: ChristmasTreeFormAfterCancel;
  const forestId = 'arp';

  beforeEach(() => {
    page = new ChristmasTreeForm();
    confirmPage = new ChristmasTreeOrderConfirmation();
    prefilledPage = new ChristmasTreeFormAfterCancel();
  });

  it('should display the permit name in the header', () => {
    page.navigateTo(forestId);
    expect<any>(element(by.css('app-root h1')).getText()).toEqual('Buy a Christmas tree permit');
  });

  it ('should show the breadcrumb', () => {
    expect<any>(element(by.css('nav')).isPresent()).toBeTruthy();
  });

  it ('should show the rules to know section',  () => {
    expect<any>(element(by.id('rules')).getText()).toEqual('Rules to know');
  });

  it ('should show the permit rules section',  () => {
    expect<any>(element(by.id('permit-rules')).getText()).toEqual('Rules for your permit:');
  });

  it('should show all fields as invalid if submitted without input', () => {
    page.submit().click();
    browser.sleep(500);
  });

  it('should require a first name', () => {
    page.navigateTo(forestId);
    expect<any>(page.firstName().isDisplayed()).toBeTruthy();
    page.submit().click();
    browser.sleep(1000);
    expect<any>(page.firstName().isDisplayed()).toBeTruthy();
    expect<any>(page.firstNameError().isDisplayed()).toBeTruthy();
  });

  it('should let the user enter a first name', () => {
    page.firstName().sendKeys('Melvin');
    page.submit().click();
    expect<any>(page.firstNameError().isPresent()).toBeFalsy();
  });

  it('should require a last name', () => {
    expect<any>(page.lastName().isDisplayed()).toBeTruthy();
    page.submit().click();
    browser.sleep(1000);
    expect<any>(page.lastName().isDisplayed()).toBeTruthy();
    expect<any>(page.lastNameError().isDisplayed()).toBeTruthy();
  });

  it('should let the user enter a last name', () => {
    page.lastName().sendKeys('Apharce');
    page.submit().click();
    expect<any>(page.lastNameError().isPresent()).toBeFalsy();
  });

  it('should display an error for an invalid email address', () => {
    expect<any>(page.email().isDisplayed()).toBeTruthy();
    page.email().sendKeys('aaaaaa');
    expect<any>(page.emailError().isDisplayed()).toBeTruthy();
    page.email().sendKeys('@aaa');
    expect<any>(page.emailError().isPresent()).toBeFalsy();
  });

  it('should display an error for an invalid tree amount', () => {
    expect<any>(page.treeAmount().isDisplayed()).toBeTruthy();
    page.treeAmount().clear();
    page.treeAmount().sendKeys('-');
    expect<any>(page.treeAmountError().isDisplayed()).toBeTruthy();
  });

  it('should display an error for an 0 tree amount', () => {
    expect<any>(page.treeAmountError().isDisplayed()).toBeTruthy();
    page.treeAmount().clear();
    page.treeAmount().sendKeys('0');
    expect<any>(page.treeAmountError().isDisplayed()).toBeTruthy();
  });

  it('should display an error for a tree amount great than max', () => {
    page.treeAmount().clear();
    page.treeAmount().sendKeys('9');
    expect<any>(page.treeAmountError().isDisplayed()).toBeTruthy();
  });

  it('should let the user enter a valid tree amount', () => {
    page.treeAmount().clear();
    page.treeAmount().sendKeys('1');
    expect<any>(page.treeAmountError().isPresent()).toBeFalsy();
  });

  it('should calculate total cost', () => {
    page.navigateTo(forestId);
    page.fillOutForm();
    browser.sleep(500);
    expect<any>(element(by.id('total-cost')).getText()).toEqual('$20');
  });

  it('should make the user accept the rules before they can submit', () => {
    page.submit().click();
    expect<any>(page.rulesAcceptedError().isDisplayed()).toBeTruthy();
  });

  it('should redirect to mock pay.gov on application submit', () => {
    page.navigateTo(forestId);
    page.fillOutFormAndSubmit();
    browser.sleep(1500);
    expect(browser.getCurrentUrl()).toContain('http://localhost:4200/mock-pay-gov');
  });

  it('should redirect back confirmation page from mock pay.gov', () => {
    element(by.id('credit-card-number')).sendKeys('1100000000000123');
    page.mockPayGovSubmit().click();
    browser.sleep(1500);
    expect(browser.getCurrentUrl()).toContain(
      `http://localhost:4200/applications/christmas-trees/forests/${forestId}/permits/`
    );
  });

  describe('confirmation page', () => {
    it('should show confirmation details', () => {
      expect<any>(confirmPage.confirmationDetails().isDisplayed()).toBeTruthy();
    });

    it ('should show the breadcrumb', () => {
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
      page.navigateTo(forestId);
      page.fillOutFormAndSubmit();
      browser.sleep(1500);
      element(by.id('credit-card-number')).sendKeys('0000000000000123');
      page.mockPayGovSubmit().click();
      browser.sleep(1500);
      expect<any>(element(by.id('pay-gov-errors')).isDisplayed()).toBeTruthy();
      page.navigateTo(forestId);
    });
  });

  describe('pay gov token errors', () => {
    it('should show 500 error if first name is 1 and last name is 2', () => {
      page.fillOutFormAndSubmit('1', '2');
      expect<any>(element(by.css('.usa-alert-heading')).getText()).toEqual(
        'Sorry, we were unable to process your request. Please try again.'
      );
    });

    it('should show 500 error if first name is 1 and last name is 1', () => {
      element(by.css('.primary-permit-holder-last-name')).clear();
      element(by.css('.primary-permit-holder-last-name')).sendKeys('1');
      page.rulesAccepted().click(); // unclicked on previous submit with error
      page.submit().click();
      expect<any>(element(by.css('.usa-alert-heading')).getText()).toEqual(
        'Sorry, we were unable to process your request. Please try again.'
      );
    });
  });

  describe('repopulating fields after cancel', () => {
    let permitId = '';
    it('should redirect to application on cancel and display a message telling the user what to do', () => {
      page.navigateTo(forestId);
      page.fillOutFormAndSubmit();
      browser.sleep(1500);
      element(by.css('.usa-button-grey')).click();
      browser.sleep(1500);
      expect(prefilledPage.cancelInfo().isDisplayed()).toBeTruthy();
      browser.getCurrentUrl().then(url => {
        permitId = url.split('/')[8];
      });
    });

    it('should have the first name prefilled', () => {
      expect(prefilledPage.firstName().getAttribute('value')).toBe('Sarah');
    });

    it('should have the last name prefilled', () => {
      expect(prefilledPage.lastName().getAttribute('value')).toBe('Bell');
    });

    it('should have the email address prefilled', () => {
      expect(prefilledPage.email().getAttribute('value')).toBe('msdf@noemail.com');
    });

    it('should have the quantity prefilled', () => {
      expect(prefilledPage.treeAmount().getAttribute('value')).toBe('2');
    });

    it('should have the cost calculated', () => {
      expect(prefilledPage.permitCost().getText()).not.toEqual('$0');
    });

    it('should be hide message telling the user what to do next if they resubmit with errors', () => {
      prefilledPage.submit().click();
      expect(prefilledPage.cancelInfo().isPresent()).toBeFalsy();
    });
  });
});
