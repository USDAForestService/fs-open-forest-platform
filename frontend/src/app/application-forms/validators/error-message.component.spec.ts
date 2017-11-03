import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, TestBed, getTestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { alphanumericValidator } from '../validators/alphanumeric-validation';
import { applicationTypeValidator } from '../validators/application-type-validation';
import { numberValidator } from '../validators/number-validation';
import { stateValidator } from '../validators/state-validation';
import { ApplicationService } from '../../_services/application.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { AlertService } from '../../_services/alert.service';
import { UtilService } from '../../_services/util.service';
import { ErrorMessageComponent } from './error-message.component';
import { Observable } from 'rxjs/Observable';
import { Pipe, PipeTransform } from '@angular/core';
import { Base64 } from '../../_pipes/base64.pipe';
import { environment } from '../../../environments/environment';
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
      state: ['', [stateValidator()]]
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

    form.get('type').setValue('hi');
    expect(component.parseErrors(form.get('type').errors)).toEqual('Test has an incorrect application type. ');
    form.get('type').setValue('tempOutfitters');
    expect(component.parseErrors(form.get('type').errors)).toBeFalsy();
    form.get('type').setValue('noncommercial');
    expect(component.parseErrors(form.get('type').errors)).toBeFalsy();
  });
});
