import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, TestBed, getTestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateTimeRangeComponent } from './date-time-range.component';
import { DateTimeRangeService } from '../_services/date-time-range.service';
import { ApplicationFieldsService } from '../_services/application-fields.service';

@Component({
  selector: 'app-test-component-wrapper',
  template: '<app-date-time-range [parentForm]="applicationForm"></app-date-time-range>'
})
class TestComponentWrapperComponent {
  applicationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.applicationForm = this.formBuilder.group({});
  }
}

describe('DateTimeRange', () => {
  let component: DateTimeRangeComponent;
  let fixture: ComponentFixture<TestComponentWrapperComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [DateTimeRangeComponent, TestComponentWrapperComponent],
        providers: [FormBuilder, ApplicationFieldsService, DateTimeRangeService],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponentWrapperComponent);
      component = fixture.debugElement.children[0].componentInstance;
      fixture.detectChanges();
    })
  );

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
    setValues('10', '10', '2024', '06', '10', 'AM', '10', '10', '2024', '02', '45', 'PM');
    expect(component.dateTimeRange.valid).toBeTruthy();
  });

  it('should be invalid if start month field is not a valid month', () => {
    setValues('13', '10', '2024', '06', '10', 'AM', '10', '10', '2024', '02', '45', 'PM');
    expect(component.dateTimeRange.valid).toBeFalsy();
  });

  it('should be invalid if start day field is not a valid day', () => {
    setValues('11', '31', '2024', '06', '10', 'AM', '10', '10', '2024', '02', '45', 'PM');
    expect(component.dateTimeRange.valid).toBeFalsy();
  });

  it('should be invalid if end month field is not a valid month', () => {
    setValues('13', '10', '2024', '13', '10', 'AM', '10', '10', '2024', '02', '45', 'PM');
    expect(component.dateTimeRange.valid).toBeFalsy();
  });

  it('should be invalid if end day field is not a valid day', () => {
    setValues('11', '31', '2024', '10', '32', 'AM', '10', '10', '2024', '02', '45', 'PM');
    expect(component.dateTimeRange.valid).toBeFalsy();
  });

  it('should be invalid if start day field is not completed', () => {
    setValues('10', '', '2024', '06', '10', 'AM', '10', '10', '2024', '02', '45', 'PM');
    expect(component.dateTimeRange.valid).toBeFalsy();
  });

  it('should be invalid if end fields are not completed', () => {
    setValues('10', '', '2024', '06', '10', 'AM', '', '', '', '', '', '');
    expect(component.dateTimeRange.valid).toBeFalsy();
  });

  it('should be invalid if start date is before today', () => {
    setValues('10', '10', '2015', '06', '10', 'AM', '10', '10', '2015', '02', '45', 'PM');
    component.dateTimeRangeValidator(component.dateTimeRange.value);
    expect(component.dateStatus.startAfterToday).toBeFalsy();
  });

  it('should be invalid if end date is before start date', () => {
    setValues('10', '10', '2024', '06', '10', 'AM', '10', '09', '2024', '02', '45', 'PM');
    component.dateTimeRangeValidator(component.dateTimeRange.value);
    expect(component.dateStatus.startBeforeEnd).toBeFalsy();
  });

  it('start month should be invalid if entered incorrectly', () => {
    component.dateTimeRange.controls['startMonth'].setValue('123');
    expect(component.dateTimeRange.controls['startMonth'].valid).toBeFalsy();
    component.dateTimeRange.controls['startMonth'].setValue('');
    expect(component.dateTimeRange.controls['startMonth'].valid).toBeFalsy();
    component.dateTimeRange.controls['startMonth'].setValue('aa');
    expect(component.dateTimeRange.controls['startMonth'].valid).toBeFalsy();
    component.dateTimeRange.controls['startMonth'].setValue('a1');
    expect(component.dateTimeRange.controls['startMonth'].valid).toBeFalsy();
    component.dateTimeRange.controls['startMonth'].setValue('01');
    expect(component.dateTimeRange.controls['startMonth'].valid).toBeTruthy();
    component.dateTimeRange.controls['startMonth'].setValue('14');
    expect(component.dateTimeRange.controls['startMonth'].valid).toBeFalsy();
  });

  it('start day should be invalid if entered incorrectly', () => {
    component.dateTimeRange.controls['startDay'].setValue('123');
    expect(component.dateTimeRange.controls['startDay'].valid).toBeFalsy();
    component.dateTimeRange.controls['startDay'].setValue('0');
    expect(component.dateTimeRange.controls['startDay'].valid).toBeFalsy();
    component.dateTimeRange.controls['startDay'].setValue('a1');
    expect(component.dateTimeRange.controls['startDay'].valid).toBeFalsy();
    component.dateTimeRange.controls['startDay'].setValue('aa');
    expect(component.dateTimeRange.controls['startDay'].valid).toBeFalsy();
    component.dateTimeRange.controls['startDay'].setValue('1');
    expect(component.dateTimeRange.controls['startDay'].valid).toBeTruthy();
    component.dateTimeRange.controls['startDay'].setValue('21');
    expect(component.dateTimeRange.controls['startDay'].valid).toBeTruthy();
  });

  it('start year should be invalid if entered incorrectly', () => {
    component.dateTimeRange.controls['startYear'].setValue('19000');
    expect(component.dateTimeRange.controls['startYear'].valid).toBeFalsy();
    component.dateTimeRange.controls['startYear'].setValue('0');
    expect(component.dateTimeRange.controls['startYear'].valid).toBeFalsy();
    component.dateTimeRange.controls['startYear'].setValue('22');
    expect(component.dateTimeRange.controls['startYear'].valid).toBeFalsy();
    component.dateTimeRange.controls['startYear'].setValue('222');
    expect(component.dateTimeRange.controls['startYear'].valid).toBeFalsy();
    component.dateTimeRange.controls['startYear'].setValue('aaaa');
    expect(component.dateTimeRange.controls['startYear'].valid).toBeFalsy();
    component.dateTimeRange.controls['startYear'].setValue('2000');
    expect(component.dateTimeRange.controls['startYear'].valid).toBeTruthy();
  });

  it('end month should be invalid if entered incorrectly', () => {
    component.dateTimeRange.controls['endMonth'].setValue('123');
    expect(component.dateTimeRange.controls['endMonth'].valid).toBeFalsy();
    component.dateTimeRange.controls['endMonth'].setValue('');
    expect(component.dateTimeRange.controls['endMonth'].valid).toBeFalsy();
    component.dateTimeRange.controls['endMonth'].setValue('a1');
    expect(component.dateTimeRange.controls['endMonth'].valid).toBeFalsy();
    component.dateTimeRange.controls['endMonth'].setValue('aa');
    expect(component.dateTimeRange.controls['endMonth'].valid).toBeFalsy();
    component.dateTimeRange.controls['endMonth'].setValue('01');
    expect(component.dateTimeRange.controls['endMonth'].valid).toBeTruthy();
    component.dateTimeRange.controls['endMonth'].setValue('14');
    expect(component.dateTimeRange.controls['endMonth'].valid).toBeFalsy();
  });

  it('end day should be invalid if entered incorrectly', () => {
    component.dateTimeRange.controls['endDay'].setValue('123');
    expect(component.dateTimeRange.controls['endDay'].valid).toBeFalsy();
    component.dateTimeRange.controls['endDay'].setValue('0');
    expect(component.dateTimeRange.controls['endDay'].valid).toBeFalsy();
    component.dateTimeRange.controls['endDay'].setValue('a1');
    expect(component.dateTimeRange.controls['endDay'].valid).toBeFalsy();
    component.dateTimeRange.controls['endDay'].setValue('aa');
    expect(component.dateTimeRange.controls['endDay'].valid).toBeFalsy();
    component.dateTimeRange.controls['endDay'].setValue('1');
    expect(component.dateTimeRange.controls['endDay'].valid).toBeTruthy();
    component.dateTimeRange.controls['endDay'].setValue('21');
    expect(component.dateTimeRange.controls['endDay'].valid).toBeTruthy();
  });

  it('end year should be invalid if entered incorrectly', () => {
    component.dateTimeRange.controls['endYear'].setValue('19000');
    expect(component.dateTimeRange.controls['endYear'].valid).toBeFalsy();
    component.dateTimeRange.controls['endYear'].setValue('0');
    expect(component.dateTimeRange.controls['endYear'].valid).toBeFalsy();
    component.dateTimeRange.controls['endYear'].setValue('22');
    expect(component.dateTimeRange.controls['endYear'].valid).toBeFalsy();
    component.dateTimeRange.controls['endYear'].setValue('222');
    expect(component.dateTimeRange.controls['endYear'].valid).toBeFalsy();
    component.dateTimeRange.controls['endYear'].setValue('aaaa');
    expect(component.dateTimeRange.controls['endYear'].valid).toBeFalsy();
    component.dateTimeRange.controls['endYear'].setValue('2000');
    expect(component.dateTimeRange.controls['endYear'].valid).toBeTruthy();
  });

  it('should set default time on date only', () => {
    component.dateOnly = true;
    component.ngOnInit();
    expect(component.defaultStartHour).toBe('01');
    expect(component.defaultEndHour).toBe('02');
    expect(component.defaultPeriod).toBe('a.m.');
  });
});
