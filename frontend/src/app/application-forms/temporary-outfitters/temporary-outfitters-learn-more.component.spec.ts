import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TemporaryOutfittersLearnMoreComponent } from './temporary-outfitters-learn-more.component';
import { alphanumericValidator } from '../validators/alphanumeric-validation';
import { UtilService } from '../../_services/util.service';

describe('TemporaryOutfittersLearnMoreComponent', () => {
  let component: TemporaryOutfittersLearnMoreComponent;
  let fixture: ComponentFixture<TemporaryOutfittersLearnMoreComponent>;
  let formBuilder: FormBuilder;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TemporaryOutfittersLearnMoreComponent],
        providers: [UtilService],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporaryOutfittersLearnMoreComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
