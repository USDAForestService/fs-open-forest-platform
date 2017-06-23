import { TempOutfittersForm } from './app.po';
import { FieldValidation } from './field-validation.po';
import { browser, element, by, Key} from 'protractor';

describe('Apply for a temp outfitters permit', () => {
  let page: TempOutfittersForm;
  let fieldValidation: FieldValidation;
  fieldValidation = new FieldValidation();

  beforeEach(() => {
    page = new TempOutfittersForm();
  });

  it('should display the permit name in the header', () => {
    page.navigateTo();
    expect<any>(element(by.css('app-root h1')).getText()).toEqual('Apply for a temporary outfitters permit.');
  });

  fieldValidation.validateFileUploadField('guide-document-wrapper');
  fieldValidation.validateFileUploadField('acknowledgement-of-risk-form-wrapper');
  fieldValidation.validateFileUploadField('insurance-certificate-wrapper');
  fieldValidation.validateFileUploadField('good-standing-evidence-wrapper');
  fieldValidation.validateFileUploadField('operating-plan-wrapper');

});
