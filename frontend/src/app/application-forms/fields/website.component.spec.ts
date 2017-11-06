import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebsiteComponent } from './website.component';
import { alphanumericValidator } from '../validators/alphanumeric-validation';

describe('WebsiteComponent', () => {
  let component: WebsiteComponent;
  let fixture: ComponentFixture<WebsiteComponent>;
  let formBuilder: FormBuilder;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [WebsiteComponent],
        providers: [FormBuilder],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    formBuilder = new FormBuilder();
    fixture = TestBed.createComponent(WebsiteComponent);
    component = fixture.debugElement.componentInstance;
    component.applicantInfo = formBuilder.group({
      website: ['', [Validators.pattern('https?://.+')]]
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be valid', () => {
    const field = component.applicantInfo.controls.website;
    expect(field.valid).toBeTruthy();
    field.setValue('test');
    expect(field.valid).toBeFalsy();
    field.setValue('http://www.test.com');
    expect(field.valid).toBeTruthy();
  });
});
