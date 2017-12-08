import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuantityComponent } from './quantity.component';
import { alphanumericValidator } from '../validators/alphanumeric-validation';
import { urlValidator } from '../validators/url-validation';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { TestService } from '../../_services/test.service';

describe('QuantityComponent', () => {
  let component: QuantityComponent;
  let fixture: ComponentFixture<QuantityComponent>;
  let formBuilder: FormBuilder;
  let testService: TestService;

  beforeEach(
    async(() => {
      testService = new TestService();
      testService.configureTestingModule([QuantityComponent], [FormBuilder, ApplicationFieldsService]);
      formBuilder = new FormBuilder();
      fixture = TestBed.createComponent(QuantityComponent);
      component = fixture.debugElement.componentInstance;
      component.parentGroup = formBuilder.group({
        numOfTrees: ['']
      });
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
