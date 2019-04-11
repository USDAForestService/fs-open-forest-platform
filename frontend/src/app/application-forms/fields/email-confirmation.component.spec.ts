import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EmailConfirmationComponent } from './email-confirmation.component';
import { alphanumericValidator } from '../validators/alphanumeric-validation';
import { emailConfirmationValidator } from '../validators/email-confirmation-validation';
import { ApplicationFieldsService } from '../_services/application-fields.service';

describe('Email Confirmation Component', () => {
  let component: EmailConfirmationComponent;
  let fixture: ComponentFixture<EmailConfirmationComponent>;
  let formBuilder: FormBuilder;
  let emailField: AbstractControl;
  let confirmationField: AbstractControl;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [EmailConfirmationComponent],
        providers: [FormBuilder, ApplicationFieldsService],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
      formBuilder = new FormBuilder();
      fixture = TestBed.createComponent(EmailConfirmationComponent);
      component = fixture.debugElement.componentInstance;
      component.applicantInfo = formBuilder.group({
        emailAddress: ['', [Validators.required, Validators.email, alphanumericValidator()]],
        emailAddressConfirmation: ['', [Validators.required, Validators.email, alphanumericValidator()]]
      }, { validators: emailConfirmationValidator('emailAddress', 'emailAddressConfirmation') });
      fixture.detectChanges();

      emailField = component.applicantInfo.controls.emailAddress;
      confirmationField = component.applicantInfo.controls.emailAddressConfirmation;

      emailField.markAsTouched();
      confirmationField.markAsTouched();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('is invalid when value is not an email address', () => {
    confirmationField.setValue('test');
    expect(confirmationField.valid).toBeFalsy();
  });

  it('is valid when value is an email address', () => {
    confirmationField.setValue('test@test.com');
    expect(confirmationField.valid).toBeTruthy();
  });

  it('makes the form invalid when value is an email address, but does not match email control', () => {
    emailField.setValue('test@test.com');
    confirmationField.setValue('test2@test.com');

    expect(component.applicantInfo.valid).toBeFalsy();
  });

  it('makes the form valid when value is an email address and matches email control', () => {
    emailField.setValue('test@test.com');
    confirmationField.setValue('test@test.com');

    expect(component.applicantInfo.valid).toBeTruthy();
  });
});
