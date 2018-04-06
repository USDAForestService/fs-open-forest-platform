import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { PhoneNumberComponent } from './phone-number.component';
import { ApplicationFieldsService } from '../_services/application-fields.service';

describe('phone number component', () => {
  let component: PhoneNumberComponent;
  let fixture: ComponentFixture<PhoneNumberComponent>;
  let formBuilder: FormBuilder;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [PhoneNumberComponent],
        providers: [FormBuilder, ApplicationFieldsService],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
      formBuilder = new FormBuilder();
      fixture = TestBed.createComponent(PhoneNumberComponent);
      component = fixture.componentInstance;
      component.parentForm = formBuilder.group({
        addAdditionalPhone: ['']
      });
      fixture.detectChanges();
    })
  );

  it('should add phone types', () => {
    const form = component.parentForm;
    expect(form.get('dayPhone')).toBeTruthy();
    expect(form.get('eveningPhone')).toBeTruthy();

    form.get('dayPhone.tenDigit').setValue('1111111111');
    expect(form.get('dayPhone.areaCode').value).toEqual('111');
    expect(form.get('dayPhone.prefix').value).toEqual('111');
    expect(form.get('dayPhone.number').value).toEqual('1111');

    form.get('eveningPhone.tenDigit').setValue('1111111111');
    expect(form.get('eveningPhone.areaCode').value).toEqual('111');
    expect(form.get('eveningPhone.prefix').value).toEqual('111');
    expect(form.get('eveningPhone.number').value).toEqual('1111');

    form.get('eveningPhone.tenDigit').setValue('');

    form.get('addAdditionalPhone').setValue(true);
    form.get('eveningPhone.tenDigit').updateValueAndValidity();
    form.get('eveningPhone.tenDigit').markAsTouched();
    expect(form.get('eveningPhone.tenDigit').valid).toBeFalsy();
    form.get('addAdditionalPhone').setValue(false);
    form.get('eveningPhone.tenDigit').updateValueAndValidity();
    expect(form.get('eveningPhone.tenDigit').valid).toBeTruthy();
  });
});
