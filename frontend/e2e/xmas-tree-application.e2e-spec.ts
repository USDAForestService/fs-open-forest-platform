import { ChristmasTreeForm, ChristmasTreeOrderConfirmation } from './app.po';
import { browser, element, by, Key } from 'protractor';

fdescribe('Apply for a Christmas tree permit', () => {
  let page: ChristmasTreeForm;
  let confirmPage: ChristmasTreeOrderConfirmation;
  const forestId = 'arp';

  beforeEach(() => {
    page = new ChristmasTreeForm();
    confirmPage = new ChristmasTreeOrderConfirmation();
  });

  it('should display the permit name in the header', () => {
    page.navigateTo(forestId);
    expect<any>(element(by.css('app-root h1')).getText()).toEqual('Buy a Christmas tree permit');
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
    element(by.css('.primary-permit-holder-first-name')).sendKeys('Sarah');
    element(by.css('.primary-permit-holder-last-name')).sendKeys('Bell');
    element(by.id('email')).sendKeys('msdf@noemail.com');
    element(by.id('quantity')).sendKeys('2');
    browser.sleep(500);
    expect<any>(element(by.id('total-cost')).getText()).toEqual('$20');
  });

  it('should make the user accept the rules before they can submit', () => {
    page.submit().click();
    expect<any>(page.rulesAcceptedError().isDisplayed()).toBeTruthy();
  });

  it('should redirect to mock pay.gov on application submit', () => {
    page.navigateTo(forestId);
    element(by.css('.primary-permit-holder-first-name')).sendKeys('Sarah');
    element(by.css('.primary-permit-holder-last-name')).sendKeys('Bell');
    element(by.id('email')).sendKeys('msdf@noemail.com');
    element(by.id('quantity')).sendKeys('2');
    page.submit().click();
    expect<any>(page.rulesAccepted().isPresent()).toBeTruthy();
    page.rulesAccepted().click();
    page.submit().click();
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

    it('should show the order summary', () => {
      expect<any>(confirmPage.orderSummary().isDisplayed()).toBeTruthy();
    });

    it('should show additional information', () => {
      expect<any>(confirmPage.additionalInfo().isDisplayed()).toBeTruthy();
    });

    it('should show the print permit button', () => {
      expect<any>(confirmPage.printPermitButton().isDisplayed()).toBeTruthy();
    });

    it('should redirect to christmas tree application page on refresh', () => {
      page.refreshAndReturnToForm(forestId);
    });

    it('should show error page if credit card error', () => {
      element(by.css('.primary-permit-holder-first-name')).sendKeys('Sarah');
      element(by.css('.primary-permit-holder-last-name')).sendKeys('Bell');
      element(by.id('email')).sendKeys('msdf@noemail.com');
      element(by.id('quantity')).sendKeys('2');
      page.rulesAccepted().click();
      page.submit().click();
      browser.sleep(1500);
      element(by.id('credit-card-number')).sendKeys('0000000000000123');
      page.mockPayGovSubmit().click();
      browser.sleep(1500);
      expect<any>(element(by.id('pay-gov-errors')).isDisplayed()).toBeTruthy();
      page.refreshAndReturnToForm(forestId);
    });
  });
  describe('pay gov token errors', () => {
    it('should show 500 error if first name is 1 and last name is 2', () => {
      element(by.css('.primary-permit-holder-first-name')).sendKeys('1');
      element(by.css('.primary-permit-holder-last-name')).sendKeys('2');
      element(by.id('email')).sendKeys('msdf@noemail.com');
      element(by.id('quantity')).sendKeys('2');
      page.rulesAccepted().click();
      page.submit().click();
      expect<any>(element(by.css('.usa-alert-heading')).getText()).toEqual('We were unable to process your request.');
    });
    it('should show 500 error if first name is 1 and last name is 2', () => {
      element(by.css('.primary-permit-holder-last-name')).clear();
      element(by.css('.primary-permit-holder-last-name')).sendKeys('1');
      page.submit().click();
      expect<any>(element(by.css('.usa-alert-heading')).getText()).toEqual(
        'We were unable to process your permit application.'
      );
    });
  });
});
