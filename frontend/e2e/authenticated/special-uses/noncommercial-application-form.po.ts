import { browser, element, by } from 'protractor';

export class NoncommercialApplicationForm {
  createApplication() {
    element(by.css('#person-primary-name .primary-permit-holder-first-name')).sendKeys('Micky');
    element(by.css('#person-primary-name .primary-permit-holder-last-name')).sendKeys('Watson');
    element(by.css('#person-primary-address .primary-permit-holder-address')).sendKeys('933 Easy St');
    element(by.css('#person-primary-address .primary-permit-holder-city')).sendKeys('Madison');
    element(by.css('#person-primary-address .primary-permit-holder-state')).sendKeys('WI');
    element(by.css('#person-primary-address .primary-permit-holder-zip')).sendKeys('55555');
    element(by.id('email')).sendKeys('msdf@noemail.com');
    element(by.id('day-phone')).sendKeys('3333333333');
    element(by.id('name')).sendKeys('Walk in the park');
    element(by.id('location')).sendKeys('Forest');
    element(by.id('participants')).sendKeys('3');
    element(by.id('spectators')).sendKeys('4');
    element(by.id('activity-description')).sendKeys('Walking around');
    element(by.id('start-month')).sendKeys('10');
    element(by.id('start-day')).sendKeys('10');
    element(by.id('start-year')).sendKeys('2020');
    element(by.id('start-hour')).sendKeys('10');
    element(by.id('start-minutes')).sendKeys('10');
    element(by.id('start-period')).sendKeys('AM');
    element(by.id('end-hour')).sendKeys('10');
    element(by.id('end-minutes')).sendKeys('10');
    element(by.id('end-period')).sendKeys('PM');
    element(by.id('signature')).sendKeys('SA');
    element(by.id('submit-application')).click();
  }
}
