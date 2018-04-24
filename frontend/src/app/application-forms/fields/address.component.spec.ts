import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { FormBuilder } from '@angular/forms';
import { AddressComponent } from './address.component';

describe('AddressComponent', () => {
  let component: AddressComponent;
  let fixture: ComponentFixture<AddressComponent>;
  let formBuilder: FormBuilder;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AddressComponent],
        providers: [FormBuilder, ApplicationFieldsService],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    formBuilder = new FormBuilder();
    fixture = TestBed.createComponent(AddressComponent);
    component = fixture.debugElement.componentInstance;
    component.parentForm = formBuilder.group({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a primary address', () => {
    expect(component.parentForm.get('primaryAddress')).toBeFalsy();
    component.formName = 'primaryAddress';
    component.ngOnInit();
    expect(component.parentForm.get('primaryAddress')).toBeTruthy();
  });
});
