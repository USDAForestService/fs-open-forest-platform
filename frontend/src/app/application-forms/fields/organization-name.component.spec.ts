import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationNameComponent } from './organization-name.component';
import { alphanumericValidator } from '../validators/alphanumeric-validation';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { TestService } from '../../_services/test.service';

describe('Organization Name Component', () => {
  let component: OrganizationNameComponent;
  let fixture: ComponentFixture<OrganizationNameComponent>;
  let formBuilder: FormBuilder;
  let testService: TestService;

  beforeEach(
    async(() => {
      testService = new TestService();
      testService.configureTestingModule([OrganizationNameComponent], [FormBuilder, ApplicationFieldsService]);
      formBuilder = new FormBuilder();
      fixture = TestBed.createComponent(OrganizationNameComponent);
      component = fixture.debugElement.componentInstance;
      component.name = 'Organization';
      component.required = true;
      component.applicantInfo = formBuilder.group({
        organizationName: ['', [Validators.required, alphanumericValidator()]]
      });
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be valid', () => {
    const field = component.applicantInfo.controls.organizationName;
    field.markAsTouched();
    expect(field.valid).toBeFalsy();
    field.setValue('test');
    expect(field.valid).toBeTruthy();
  });
});
