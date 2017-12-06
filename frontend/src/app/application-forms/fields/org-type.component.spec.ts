import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrgTypeComponent } from './org-type.component';
import { alphanumericValidator } from '../validators/alphanumeric-validation';
import { TestService } from '../../_services/test.service';

describe('Org Type Component', () => {
  let component: OrgTypeComponent;
  let fixture: ComponentFixture<OrgTypeComponent>;
  let formBuilder: FormBuilder;
  let testService: TestService;

  beforeEach(
    async(() => {
      testService = new TestService();
      testService.configureTestingModule([OrgTypeComponent], [FormBuilder]);
      formBuilder = new FormBuilder();
      fixture = TestBed.createComponent(OrgTypeComponent);
      component = fixture.debugElement.componentInstance;
      component.type = 'simple';
      component.applicantInfo = formBuilder.group({
        orgType: ['', [Validators.required, alphanumericValidator()]]
      });
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be valid', () => {
    const field = component.applicantInfo.controls.orgType;
    field.markAsTouched();
    expect(field.valid).toBeFalsy();
    field.setValue('person');
    expect(field.valid).toBeTruthy();
  });
});
