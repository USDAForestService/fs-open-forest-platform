import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientChargesComponent } from './client-charges.component';
import { alphanumericValidator } from '../validators/alphanumeric-validation';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { TestService } from '../../_services/test.service';

describe('Client Charges Component', () => {
  let component: ClientChargesComponent;
  let fixture: ComponentFixture<ClientChargesComponent>;
  let formBuilder: FormBuilder;
  let testService: TestService;

  beforeEach(
    async(() => {
      testService = new TestService();
      testService.configureTestingModule([ClientChargesComponent], [FormBuilder, ApplicationFieldsService]);
      formBuilder = new FormBuilder();
      fixture = TestBed.createComponent(ClientChargesComponent);
      component = fixture.debugElement.componentInstance;
      component.tempOutfitterFields = formBuilder.group({
        clientCharges: ['', [Validators.required, alphanumericValidator()]]
      });
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be valid', () => {
    const field = component.tempOutfitterFields.controls.clientCharges;
    field.markAsTouched();
    expect(field.valid).toBeFalsy();
    field.setValue('test');
    expect(field.valid).toBeTruthy();
  });
});
