import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { alphanumericValidator } from '../validators/alphanumeric-validation';
import { applicationTypeValidator } from '../validators/application-type-validation';
import { urlValidator } from '../validators/url-validation';
import { numberValidator } from '../validators/number-validation';
import { stateValidator } from '../validators/state-validation';
import { currencyValidator } from '../validators/currency-validation';
import { lessThanOrEqualValidator } from '../validators/less-than-or-equal-validation';
import { ErrorMessageComponent } from './error-message.component';
import { FormBuilder, Validators } from '@angular/forms';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;
  let formBuilder: FormBuilder;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ErrorMessageComponent],
        providers: [FormBuilder],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(ErrorMessageComponent);
      component = fixture.componentInstance;
      component.name = 'Test';
      fixture.detectChanges();
    })
  );
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse errors correctly', () => {
    formBuilder = new FormBuilder();
    const form = formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.email, alphanumericValidator(), Validators.maxLength(255)]],
      organizationName: ['', [alphanumericValidator(), Validators.maxLength(255)]],
      primaryFirstName: ['', [Validators.required, alphanumericValidator(), Validators.maxLength(255)]],
      lengthField: ['', [Validators.minLength(2), Validators.maxLength(5)]],
      website: ['', [Validators.pattern('https?://.+')]],
      type: ['', [applicationTypeValidator()]],
      number: ['', [numberValidator()]],
      state: ['', [stateValidator()]],
      url: ['', [urlValidator()]],
      cost: ['', [currencyValidator()]],
      maxNumber: ['', [lessThanOrEqualValidator(4)]],
      max: ['', Validators.max(5)],
      min: ['', Validators.min(1)]
    });
    form.get('emailAddress').setValue('test');
    expect(component.parseErrors(form.get('emailAddress').errors)).toEqual('Test requires a valid email address. ');
    form.get('emailAddress').setValue('test@test.com');

    expect(component.parseErrors(form.get('primaryFirstName').errors)).toEqual('Test is required. ');

    form.get('lengthField').setValue('1');
    expect(component.parseErrors(form.get('lengthField').errors)).toEqual('Test requires a minimum of 2 characters. ');
    form.get('lengthField').setValue('aaaaaa');
    expect(component.parseErrors(form.get('lengthField').errors)).toEqual('Test allows a maximum of 5 characters. ');

    form.get('primaryFirstName').setValue(`⌚`);
    expect(component.parseErrors(form.get('primaryFirstName').errors)).toEqual(
      'Test requires at least one alphanumeric character. '
    );
    form.get('primaryFirstName').setValue('test');

    form.get('website').setValue('test');
    expect(component.parseErrors(form.get('website').errors)).toEqual(
      'Test requires a valid URL and must include http://.'
    );
    form.get('website').setValue('http://test.com');

    form.get('number').setValue('n');
    expect(component.parseErrors(form.get('number').errors)).toEqual('Test allows numbers only. ');
    form.get('number').setValue('11');
    expect(component.parseErrors(form.get('number').errors)).toBeFalsy();
    form.get('number').setValue('');
    expect(component.parseErrors(form.get('number').errors)).toBeFalsy();

    form.get('state').setValue('Wisconsin');
    expect(component.parseErrors(form.get('state').errors)).toEqual(
      'Test requires a valid capitalized state abbreviation. '
    );
    form.get('state').setValue('Wi');
    expect(component.parseErrors(form.get('state').errors)).toEqual(
      'Test requires a valid capitalized state abbreviation. '
    );
    form.get('state').setValue('PD');
    expect(component.parseErrors(form.get('state').errors)).toEqual(
      'Test requires a valid capitalized state abbreviation. '
    );
    form.get('state').setValue('WI');
    expect(component.parseErrors(form.get('state').errors)).toBeFalsy();

    form.get('state').setValue('PR');
    expect(component.parseErrors(form.get('state').errors)).toBeFalsy();

    form.get('state').setValue('DC');
    expect(component.parseErrors(form.get('state').errors)).toBeFalsy();

    form.get('url').setValue('test');
    expect(component.parseErrors(form.get('url').errors)).toEqual('Test requires a valid URL. ');

    form.get('url').setValue('test test.com');
    expect(component.parseErrors(form.get('url').errors)).toEqual('Test requires a valid URL. ');

    form.get('url').setValue('...');
    expect(component.parseErrors(form.get('url').errors)).toEqual('Test requires a valid URL. ');

    form.get('url').setValue('www.test.com');
    expect(component.parseErrors(form.get('url').errors)).toBeFalsy();

    form.get('url').setValue('test.com');
    expect(component.parseErrors(form.get('url').errors)).toBeFalsy();

    form.get('url').setValue('te.st.com');
    expect(component.parseErrors(form.get('url').errors)).toBeFalsy();

    form.get('url').setValue('http://te.st.com');
    expect(component.parseErrors(form.get('url').errors)).toBeFalsy();

    form.get('url').setValue('http://www.te.st.com');
    expect(component.parseErrors(form.get('url').errors)).toBeFalsy();

    form.get('type').setValue('hi');
    expect(component.parseErrors(form.get('type').errors)).toEqual('Test has an incorrect application type. ');
    form.get('type').setValue('tempOutfitters');
    expect(component.parseErrors(form.get('type').errors)).toBeFalsy();
    form.get('type').setValue('noncommercial');
    expect(component.parseErrors(form.get('type').errors)).toBeFalsy();

    form.get('cost').setValue('1.222');
    expect(component.parseErrors(form.get('cost').errors)).toEqual('Test requires a format like 0.00. ');
    form.get('cost').setValue('1.0');
    expect(component.parseErrors(form.get('cost').errors)).toEqual('Test requires a format like 0.00. ');
    form.get('cost').setValue('1.');
    expect(component.parseErrors(form.get('cost').errors)).toEqual('Test requires a format like 0.00. ');
    form.get('cost').setValue('asdf');
    expect(component.parseErrors(form.get('cost').errors)).toEqual('Test requires a format like 0.00. ');
    form.get('cost').setValue('1');
    expect(component.parseErrors(form.get('cost').errors)).toBeFalsy();
    form.get('cost').setValue('1.00');
    expect(component.parseErrors(form.get('cost').errors)).toBeFalsy();
    form.get('cost').setValue('100.00');
    expect(component.parseErrors(form.get('cost').errors)).toBeFalsy();

    form.get('maxNumber').setValue('5');
    expect(component.parseErrors(form.get('maxNumber').errors)).toEqual(
      'Test must have a value less than or equal to 4 and greater than or equal to -99999. '
    );
    form.get('maxNumber').setValue('test');
    expect(component.parseErrors(form.get('maxNumber').errors)).toEqual(
      'Test must have a value less than or equal to 4 and greater than or equal to -99999. '
    );
    form.get('maxNumber').setValue('4');
    expect(component.parseErrors(form.get('maxNumber').errors)).toBeFalsy();
    form.get('maxNumber').setValue('3');
    expect(component.parseErrors(form.get('maxNumber').errors)).toBeFalsy();

    // max
    form.get('max').setValue(10);
    expect(component.parseErrors(form.get('max').errors)).toEqual(
      'Test must have a value less than or equal to 5. '
    );

    // min
    form.get('min').setValue(0);
    expect(component.parseErrors(form.get('min').errors)).toEqual(
      'Test must have a value greater than or equal to 1. '
    );
  });
});
