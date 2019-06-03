import { browser, element, by, ExpectedConditions as EC } from 'protractor';

export const login = (email: string, password: string) => {
  browser.waitForAngularEnabled(false);
  browser.wait(EC.urlContains('auth'), 1000);
  element(by.name('email')).sendKeys(email);
  element(by.name('password')).sendKeys(password);
  element(by.tagName('button')).click();
  browser.waitForAngularEnabled(true);
  browser.sleep(1000);
};

export const loginAdmin = () => login('test@test.com', 'password');
export const loginPublic = () => login('public@test.com', 'password');
