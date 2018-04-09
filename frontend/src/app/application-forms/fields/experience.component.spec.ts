import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ExperienceComponent } from './experience.component';
import { ApplicationFieldsService } from '../_services/application-fields.service';

describe('Experience Component', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;
  let formBuilder: FormBuilder;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ExperienceComponent],
        providers: [FormBuilder, ApplicationFieldsService],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
      formBuilder = new FormBuilder();
      fixture = TestBed.createComponent(ExperienceComponent);
      component = fixture.debugElement.componentInstance;
      component.parentForm = formBuilder.group({});
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be valid', () => {
    const checkbox1 = component.parentForm.get('experienceFields.haveNationalForestPermits');
    checkbox1.setValue(true);
    const field1 = component.parentForm.get('experienceFields.listAllNationalForestPermits');
    field1.markAsTouched();
    field1.updateValueAndValidity();
    expect(field1.valid).toBeFalsy();
    field1.setValue('test');
    expect(field1.valid).toBeTruthy();

    const checkbox2 = component.parentForm.get('experienceFields.haveOtherPermits');
    checkbox2.setValue(true);
    const field2 = component.parentForm.get('experienceFields.listAllOtherPermits');
    field2.markAsTouched();
    field2.updateValueAndValidity();
    expect(field2.valid).toBeFalsy();
    field2.setValue('test');
    expect(field2.valid).toBeTruthy();

    const checkbox3 = component.parentForm.get('experienceFields.haveCitations');
    checkbox3.setValue(true);
    const field3 = component.parentForm.get('experienceFields.listAllCitations');
    field3.markAsTouched();
    field3.updateValueAndValidity();
    expect(field3.valid).toBeFalsy();
    field3.setValue('test');
    expect(field3.valid).toBeTruthy();
  });
});
