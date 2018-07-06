import { UserApplicationList, NoncommercialGroupForm } from './app.po';
import { NoncommercialApplicationForm } from './noncommercial-application-form.po';
import { FieldValidation } from './field-validation.po';
import { browser, element, by, Key } from 'protractor';

describe('Viewing applications as an applicant', () => {
    let list: UserApplicationList;
    let noncommercial: NoncommercialGroupForm;
    let applicationForm: NoncommercialApplicationForm;

    beforeAll(() => {
        browser.executeScript('localStorage.removeItem("user");');
        browser.executeScript('localStorage.setItem("user",{"adminUsername": "TEST_USER", "email": "test@test.com","role": "user","forests": []});');
        noncommercial = new NoncommercialGroupForm;
        applicationForm = new NoncommercialApplicationForm;
        noncommercial.navigateTo();
        browser.sleep(500);
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/applications/noncommercial-group-use/new');
        applicationForm.createApplication();
    });

    beforeEach(() => {
        list = new UserApplicationList();
    });

  it('should cancel an application when the cancellation button is clicked', () => {
    const cancelButtons = element.all(by.css('.cancel-button-user'));
    cancelButtons.first().click();
    browser.sleep(100);
    expect<any>(element(by.css('app-root usa-alert-text')).getText()).toEqual('Permit application was successfully cancelled.');
  });

  afterAll(() => {
      browser.executeScript('localStorage.removeItem("user");');
      browser.executeScript('localStorage.setItem("user",{"adminUsername": "TEST_USER", "email": "test@test.com","role": "admin","forests": ["all"]});');
  });

});
