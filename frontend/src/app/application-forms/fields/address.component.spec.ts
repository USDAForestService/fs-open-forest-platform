import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, TestBed, getTestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AddressComponent } from './address.component';
import { TestService } from '../../_services/test.service';

describe('AddressComponent', () => {
  let component: AddressComponent;
  let fixture: ComponentFixture<AddressComponent>;
  let formBuilder: FormBuilder;
  let testService: TestService;

  beforeEach(
    async(() => {
      testService = new TestService();
      testService.configureTestingModule([AddressComponent], [FormBuilder, ApplicationFieldsService]);
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
