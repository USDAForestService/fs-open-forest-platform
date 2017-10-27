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

  validateFileUploadField(id, type = 'pdf') {
    const path = require('path');
    const testErrorFile = path.resolve(__dirname, 'test-files/error-file-type.md');
    let testSuccessFile = path.resolve(__dirname, 'test-files/success.pdf');
    if (type === 'xls') {
      testSuccessFile = path.resolve(__dirname, 'test-files/test.xlsx');
    }
    const input = element(by.css('#' + id + ' input[type="file"]'));

    it('should have an input field', () => {
      expect<any>(input.isPresent()).toBe(true);
    });

    it('should not show an error by default', () => {
      expect<any>(element(by.css('#' + id + ' .usa-input-error-message')).isPresent()).toBe(false);
    });

    it('should not show replace buttons by default', () => {
      expect<any>(element(by.css('#' + id + ' .upload-file-btn span')).getText()).toEqual('Choose file');
    });

    it('should display an error message if the file is not a valid type', () => {
      input.sendKeys(testErrorFile);
<<<<<<< HEAD
=======
      browser.sleep(500);
>>>>>>> remotes/origin/sprint-1-development
      expect<any>(element(by.css('#' + id + ' .usa-input-error-message')).isPresent()).toBe(true);
    });

    it('should hide the error message if the file is a valid type', () => {
      input.sendKeys(testSuccessFile);
<<<<<<< HEAD
=======
      browser.sleep(500);
>>>>>>> remotes/origin/sprint-1-development
      expect<any>(element(by.css('#' + id + ' .usa-input-error-message')).isPresent()).toBe(false);
    });

    it('should show replace buttons if file is valid', () => {
      browser.sleep(500);
      expect<any>(element(by.css('#' + id + ' .upload-file-btn span')).getText()).toEqual('Replace');
    });

    it('should display the file name if file is valid', () => {
<<<<<<< HEAD
=======
      browser.sleep(500);
>>>>>>> remotes/origin/sprint-1-development
      expect<any>(element(by.css('#' + id + ' .file-name')).isPresent()).toBe(true);
    });
  }
}
