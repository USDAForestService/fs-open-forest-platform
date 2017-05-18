import { browser, element, by, Key } from 'protractor';

export class FieldValidation {

  validateSimpleTextField(id, errorId, error, group = false) {
    it('should require ' + id + ' field to have text', () => {
      element(by.id(id)).sendKeys(Key.TAB);
      expect(element(by.id(errorId)).getText()).toEqual(error);
    });
    if (! group) {
      it('should hide error if ' + id + ' field has text', () => {
        element(by.id(id)).sendKeys('text');
        expect(element(by.id(errorId)).isDisplayed()).toBe(false);
      });
    }
  };

  validateMinMax(id, errorId, minChars, maxChars, group = false) {
    const queryInput = element(by.id(id));
    it('should not allow less than ' + minChars + 'characters', () => {
      queryInput.clear().then(function() {
        queryInput.sendKeys('5'.repeat(minChars - 1));
        expect(element(by.id(errorId)).isDisplayed()).toBe(true);
      });
    });
    if (!group) {
      it('should not allow more than ' + maxChars + 'characters', () => {
        queryInput.clear().then(function() {
          queryInput.sendKeys('5'.repeat(maxChars + 1));
          expect(element(by.id(errorId)).isDisplayed()).toBe(false);
        });
      });
    }
  }

  validateNumberField(id, errorId, error) {
    const queryInput = element(by.id(id));
    it('should require ' + id + ' field to have data', () => {
      queryInput.sendKeys(Key.TAB);
      expect(element(by.id(errorId)).getText()).toEqual(error);
    });
    it('should require ' + id + ' field to be a number', () => {
      queryInput.sendKeys('hi');
      expect(element(by.id(errorId)).getText()).toEqual(error);
      queryInput.clear().then(function() {
        queryInput.sendKeys('111');
      });
    });
  };

  validateEmailField(id, errorId, error) {
    const queryInput = element(by.id(id));
    it('should require ' + id + ' field to have data', () => {
      queryInput.sendKeys(Key.TAB);
      expect(element(by.id(errorId)).getText()).toEqual(error);
    });
    it('should require ' + id + ' field to have data and be a valid email address', () => {
      queryInput.sendKeys('text');
      expect(element(by.id(errorId)).getText()).toEqual(error);
    });
    it('should hide error if ' + id + ' field is a valid email address', () => {
      queryInput.clear().then(function() {
        queryInput.sendKeys('test@test.com');
        expect(element(by.id(errorId)).isDisplayed()).toBe(false);
      });
    });
  };
}
