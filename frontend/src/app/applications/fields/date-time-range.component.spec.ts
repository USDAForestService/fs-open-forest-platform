import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  inject,
  TestBed,
  getTestBed,
  async,
  fakeAsync,
  ComponentFixture
} from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateTimeRangeComponent } from './date-time-range.component';

describe('DateTimeRange', () => {
  let component: DateTimeRangeComponent;
  let fixture: ComponentFixture<TestComponentWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DateTimeRangeComponent,
        TestComponentWrapperComponent
      ],
      providers: [
        FormBuilder
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestComponentWrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();

  }));

  function setValues(sm, sd, sy, sh, smin, sp, em, ed, ey, eh, emin, ep) {
    component.dateTimeRange.controls['startDay'].setValue(sd);
    component.dateTimeRange.controls['startMonth'].setValue(sm);
    component.dateTimeRange.controls['startYear'].setValue(sy);
    component.dateTimeRange.controls['startHour'].setValue(sh);
    component.dateTimeRange.controls['startMinutes'].setValue(smin);
    component.dateTimeRange.controls['startPeriod'].setValue(sp);

    component.dateTimeRange.controls['endDay'].setValue(ed);
    component.dateTimeRange.controls['endMonth'].setValue(em);
    component.dateTimeRange.controls['endYear'].setValue(ey);
    component.dateTimeRange.controls['endHour'].setValue(eh);
    component.dateTimeRange.controls['endMinutes'].setValue(emin);
    component.dateTimeRange.controls['endPeriod'].setValue(ep);
  }

  it('should be valid if all date and time fields are entered correctly', () => {
    setValues('10', '10', '2024', '06', '10', 'AM', '10', '10', '2024', '02', '45', 'PM')
    expect(component.dateTimeRange.valid).toBeTruthy();
  });

  it('should be invalid if start day field is not completed', () => {
    setValues('10', '', '2024', '06', '10', 'AM', '10', '10', '2024', '02', '45', 'PM')
    expect(component.dateTimeRange.valid).toBeFalsy();
  });

  it('should be invalid if end fields are not completed', () => {
    setValues('10', '', '2024', '06', '10', 'AM', '', '', '', '', '', '')
    expect(component.dateTimeRange.valid).toBeFalsy();
  });

  it('should be invalid if start date is before today', () => {
    setValues('10', '10', '2015', '06', '10', 'AM', '10', '10', '2015', '02', '45', 'PM')
    component.dateTimeRangeValidator(component.dateTimeRange.value);
    expect(component.dateStatus.startAfterToday).toBeFalsy();
  });

  it('should be invalid if end date is before start date', () => {
    setValues('10', '10', '2024', '06', '10', 'AM', '10', '09', '2024', '02', '45', 'PM')
    component.dateTimeRangeValidator(component.dateTimeRange.value);
    expect(component.dateStatus.startBeforeEnd).toBeFalsy();
  });

});

@Component({
  selector: 'app-test-component-wrapper',
  template: '<app-date-time-range [parentForm]="applicationForm"></app-date-time-range>'
})

class TestComponentWrapperComponent {
  applicationForm: FormGroup;

  constructor( private formBuilder: FormBuilder ) {
    this.applicationForm = this.formBuilder.group({});
  }
}
