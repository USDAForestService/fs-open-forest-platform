import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PermitHolderNameComponent } from './permit-holder-name.component';
import { alphanumericValidator } from '../validators/alphanumeric-validation';
import { ApplicationFieldsService } from '../_services/application-fields.service';

describe('PermitHolderNameComponent', () => {
  let component: PermitHolderNameComponent;
  let fixture: ComponentFixture<PermitHolderNameComponent>;
  let formBuilder: FormBuilder;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [PermitHolderNameComponent],
        providers: [FormBuilder, ApplicationFieldsService],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
      formBuilder = new FormBuilder();
      fixture = TestBed.createComponent(PermitHolderNameComponent);
      component = fixture.debugElement.componentInstance;
      component.name = 'Primary';
      component.type = 'primary';
      component.applicantInfo = formBuilder.group({
        primaryFirstName: ['', [Validators.required, alphanumericValidator()]],
        primaryLastName: ['', [Validators.required, alphanumericValidator()]]
      });
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be valid', () => {
    const field = component.applicantInfo.controls.primaryFirstName;
    field.markAsTouched();
    expect(field.valid).toBeFalsy();
    field.setValue('test');
    expect(field.valid).toBeTruthy();

    const field2 = component.applicantInfo.controls.primaryLastName;
    field2.markAsTouched();
    expect(field2.valid).toBeFalsy();
    field2.setValue('test');
    expect(field2.valid).toBeTruthy();
  });
});
