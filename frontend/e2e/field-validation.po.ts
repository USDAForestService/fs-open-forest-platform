import { browser, element, by, Key, protractor } from 'protractor';

export class FieldValidation {
  ec = protractor.ExpectedConditions;

  validateSimpleTextField(id, errorId, error, group = false) {
    const queryInput = element(by.id(id));
    it('should require ' + id + ' field to have text', () => {
      queryInput.sendKeys('text');
      queryInput.clear().then(function() {
        expect<any>(element(by.id(errorId)).getText()).toEqual(error);
      });
    });
    if (!group) {
      it('should hide error if ' + id + ' field has text', () => {
        queryInput.sendKeys('text');
        expect<any>(element(by.id(errorId)).isPresent()).toBe(false);
      });
    }
  }

  validateMinMax(id, errorId, minChars, maxChars, group = false) {
    const queryInput = element(by.id(id));
    it('should not allow less than ' + minChars + 'characters', () => {
      queryInput.clear().then(function() {
        queryInput.sendKeys('5'.repeat(minChars - 1));
        expect<any>(element(by.id(errorId)).isPresent()).toBe(true);
      });
    });
    if (!group) {
      it('should not allow more than ' + maxChars + 'characters', () => {
        queryInput.clear().then(function() {
          queryInput.sendKeys('5'.repeat(maxChars + 1));
          expect<any>(element(by.id(errorId)).isPresent()).toBe(false);
        });
      });
    }
  }

  validateNumberField(id, errorId, error) {
    const queryInput = element(by.id(id));
    it('should require ' + id + ' field to have data', () => {
      queryInput.sendKeys(Key.TAB);
      expect<any>(element(by.id(errorId)).getText()).toEqual(error);
    });
    it('should require ' + id + ' field to be a number', () => {
      queryInput.sendKeys('hi');
      expect<any>(element(by.id(errorId)).getText()).toEqual(error);
      queryInput.clear().then(function() {
        queryInput.sendKeys('111');
      });
    });
  }

  validateEmailField(id, errorId, error) {
    const queryInput = element(by.id(id));
    it('should require ' + id + ' field to have data', () => {
      queryInput.sendKeys(Key.TAB);
      expect<any>(element(by.id(errorId)).getText()).toEqual(error);
    });
    it('should require ' + id + ' field to have data and be a valid email address', () => {
      queryInput.sendKeys('text');
      expect<any>(element(by.id(errorId)).getText()).toEqual(error);
    });
    it('should hide error if ' + id + ' field is a valid email address', () => {
      queryInput.clear().then(function() {
        queryInput.sendKeys('test@test.com');
        expect<any>(element(by.id(errorId)).isPresent()).toBe(false);
      });
    });
  }

  validateFileUploadField(id, type = 'pdf', fullTest = false) {
    const path = require('path');
    const testErrorFile = path.resolve(__dirname, 'test-files/error-file-type.md');
    let testSuccessFile = path.resolve(__dirname, 'test-files/success.pdf');
    if (type === 'xls') {
      testSuccessFile = path.resolve(__dirname, 'test-files/test.xlsx');
    }
    const input = element(by.css('#' + id));

    if (fullTest) {
      it('should have an input field', () => {
        expect<any>(input.isPresent()).toBe(true);
      });

      it('should not show an error by default', () => {
        expect<any>(element(by.css('#' + id + '-error')).isPresent()).toBe(false);
      });

      it('should not show replace buttons by default', () => {
        expect<any>(element(by.css('#' + id + '-choose-file')).isPresent()).toBe(true);
      });

      it('should display an error message if the file is not a valid type', () => {
        input.sendKeys(testErrorFile);
        expect<any>(element(by.css('#' + id + '-error')).isPresent()).toBe(true);
      });

      it('should hide the error message if the file is a valid type', () => {
        input.sendKeys(testSuccessFile);
        expect<any>(element(by.css('#' + id + '-error')).isPresent()).toBe(false);
      });

      it('should show replace buttons if file is valid', () => {
        expect<any>(element(by.css('#' + id + '-replace-file')).getText()).toEqual('Replace');
      });

      it('should display the file name if file is valid', () => {
        expect<any>(element(by.css('#' + id + '-file-name')).isPresent()).toBe(true);
      });
    } else {
      it('should display the file name if file is valid', () => {
        input.sendKeys(testSuccessFile);
        expect<any>(element(by.css('#' + id + '-file-name')).isPresent()).toBe(true);
      });
    }
  }
}
