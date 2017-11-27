import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NumberOfTreesComponent } from './number-of-trees.component';
import { alphanumericValidator } from '../validators/alphanumeric-validation';
import { urlValidator } from '../validators/url-validation';
import { ApplicationFieldsService } from '../_services/application-fields.service';

describe('NumberOfTreesComponent', () => {
  let component: NumberOfTreesComponent;
  let fixture: ComponentFixture<NumberOfTreesComponent>;
  let formBuilder: FormBuilder;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [NumberOfTreesComponent],
        providers: [FormBuilder, ApplicationFieldsService],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    formBuilder = new FormBuilder();
    fixture = TestBed.createComponent(NumberOfTreesComponent);
    component = fixture.debugElement.componentInstance;
    component.parentGroup = formBuilder.group({
      numOfTrees: ['']
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
