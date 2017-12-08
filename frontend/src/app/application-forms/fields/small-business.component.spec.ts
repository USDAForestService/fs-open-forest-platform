import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SmallBusinessComponent } from './small-business.component';
import { alphanumericValidator } from '../validators/alphanumeric-validation';
import { TestService } from '../../_services/test.service';

describe('SmallBusinessComponent', () => {
  let component: SmallBusinessComponent;
  let fixture: ComponentFixture<SmallBusinessComponent>;
  let formBuilder: FormBuilder;
  let testService: TestService;

  beforeEach(
    async(() => {
      testService = new TestService();
      testService.configureTestingModule([SmallBusinessComponent], [FormBuilder]);
      formBuilder = new FormBuilder();
      fixture = TestBed.createComponent(SmallBusinessComponent);
      component = fixture.debugElement.componentInstance;
      component.tempOutfitterFields = formBuilder.group({
        smallBusiness: [false]
      });
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be valid', () => {
    const field = component.tempOutfitterFields.controls.smallBusiness;
    expect(field.valid).toBeTruthy();
  });
});
