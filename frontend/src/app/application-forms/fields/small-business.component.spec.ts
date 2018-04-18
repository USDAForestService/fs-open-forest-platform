import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SmallBusinessComponent } from './small-business.component';

describe('SmallBusinessComponent', () => {
  let component: SmallBusinessComponent;
  let fixture: ComponentFixture<SmallBusinessComponent>;
  let formBuilder: FormBuilder;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SmallBusinessComponent],
        providers: [FormBuilder],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
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
