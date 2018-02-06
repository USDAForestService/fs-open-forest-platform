import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Hours, Minutes } from '../../_models/constants';
import { numberValidator } from '../validators/number-validation';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-date-time-range',
  templateUrl: './date-time-range.component.html'
})
export class DateTimeRangeComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() dateOnly: boolean;
  @Input() includePastDates: boolean;
  formName: string;
  dateStatus = {
    startDateTimeValid: true,
    endDateTimeValid: true,
    startBeforeEnd: true,
    startAfterToday: true,
    hasErrors: false,
    dateTimeSpan: 0
  };

  dateTimeRange: any;

  hours = Hours;
  minutes = Minutes;

  defaultStartHour = '';
  defaultEndHour = '';
  defaultPeriod = '';

  @Output() updateDateStatus: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    if (this.dateOnly) {
      this.defaultStartHour = '01';
      this.defaultEndHour = '02';
      this.defaultPeriod = 'AM';
    }
    this.formName = 'dateTimeRange';
    this[this.formName] = this.formBuilder.group({
      endDateTime: ['', [Validators.required, Validators.maxLength(255)]],
      endDay: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(2),
          Validators.pattern('(0?[1-9]|1[0-9]|2[0-9]|3[01])'),
          numberValidator()
        ]
      ],
      endMonth: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(2),
          Validators.pattern('(0?[1-9]|1[012])'),
          numberValidator()
        ]
      ],
      endYear: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.pattern('([0-9]{4})'),
          numberValidator()
        ]
      ],
      endHour: [this.defaultEndHour, [Validators.required, Validators.maxLength(2), numberValidator()]],
      endMinutes: ['00', [Validators.required, Validators.maxLength(2), numberValidator()]],
      endPeriod: [this.defaultPeriod, [Validators.required, Validators.maxLength(2)]],
      startDateTime: ['', [Validators.required, Validators.maxLength(255)]],
      startDay: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(2),
          Validators.pattern('(0?[1-9]|1[0-9]|2[0-9]|3[01])'),
          numberValidator()
        ]
      ],
      startMonth: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(2),
          Validators.pattern('(0?[1-9]|1[012])'),
          numberValidator()
        ]
      ],
      startYear: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.pattern('([0-9]{4})'),
          numberValidator()
        ]
      ],
      startHour: [this.defaultStartHour, [Validators.required, Validators.maxLength(2), numberValidator()]],
      startMinutes: ['00', [Validators.required, Validators.maxLength(2), numberValidator()]],
      startPeriod: [this.defaultPeriod, [Validators.required, Validators.maxLength(2)]]
    });
    this.parentForm.addControl(this.formName, this[this.formName]);
    this.dateTimeRange = this.parentForm.get('dateTimeRange');

    const startDateFieldsToWatch = ['startMonth', 'startDay', 'startYear'];
    for (const field of startDateFieldsToWatch) {
      this.parentForm.get('dateTimeRange.' + field).valueChanges.subscribe(value => {
        const values = this.parentForm.get('dateTimeRange').value;
        values[field] = value;
        this.startDateChangeHandler(values);
      });
    }

    const dateFieldsToWatch = [
      'startMonth',
      'startDay',
      'startYear',
      'startHour',
      'startMinutes',
      'startPeriod',
      'endMonth',
      'endDay',
      'endYear',
      'endHour',
      'endMinutes',
      'endPeriod'
    ];
    for (const field of dateFieldsToWatch) {
      this.parentForm.get('dateTimeRange.' + field).valueChanges.subscribe(value => {
        // this.getFieldErrors(this.parentForm.get('dateTimeRange.' + field));
        const values = this.parentForm.get('dateTimeRange').value;
        values[field] = value;
        this.dateTimeRangeValidator(values);
      });
    }
  }

  private checkHasStartAndNoEnd(values) {
    return (
      values.startMonth &&
      values.startDay &&
      (values.startYear && values.startYear.toString().length === 4) &&
      !values.endMonth &&
      !values.endDay &&
      !values.endYear
    );
  }

  startDateChangeHandler(values) {
    if (this.checkHasStartAndNoEnd(values)) {
      const today = moment();
      const startDateTime = this.parseDateTime(values.startYear, values.startMonth, values.startDay, 0, 0, 'AM');
      this.dateStatus.startAfterToday = today.isBefore(startDateTime);
      if (this.dateStatus.startAfterToday) {
        this.parentForm.patchValue({ dateTimeRange: { endMonth: values.startMonth } });
        this.parentForm.patchValue({ dateTimeRange: { endDay: values.startDay } });
        this.parentForm.patchValue({ dateTimeRange: { endYear: values.startYear } });
      }
    }
  }

  parseDateTime(year, month, day, hour, minutes, period) {
    return moment(`${year}-${month}-${day} ${hour}:${minutes} ${period}`, 'YYYY-MM-DD HH:mm A');
  }

  private checkHasAllDateValues(values) {
    return (
      values.startMonth &&
      values.startDay &&
      values.startYear &&
      values.startHour &&
      values.startMinutes &&
      values.startPeriod &&
      values.endMonth &&
      values.endDay &&
      values.endYear &&
      values.endHour &&
      values.endMinutes &&
      values.endPeriod
    );
  }

  dateTimeRangeValidator(values) {
    if (this.checkHasAllDateValues(values)) {
      const startDateTime = this.parseDateTime(
        values.startYear,
        values.startMonth,
        values.startDay,
        values.startHour,
        values.startMinutes,
        values.startPeriod
      );
      const endDateTime = this.parseDateTime(
        values.endYear,
        values.endMonth,
        values.endDay,
        values.endHour,
        values.endMinutes,
        values.endPeriod
      );

      this.processDateStatus(startDateTime, endDateTime);
    }
  }

  private processDateStatus(startDateTime, endDateTime) {
    const outputFormat = 'YYYY-MM-DDTHH:mm:ss';
    this.parentForm.patchValue({ dateTimeRange: { startDateTime: startDateTime.format(outputFormat) + 'Z' } });
    this.parentForm.patchValue({ dateTimeRange: { endDateTime: endDateTime.format(outputFormat) + 'Z' } });

    this.setValidity(startDateTime, endDateTime);

    this.dateStatus.dateTimeSpan = startDateTime.diff(endDateTime, 'days') + 1;

    this.dateStatus.hasErrors =
      !this.dateStatus.startDateTimeValid ||
      !this.dateStatus.endDateTimeValid ||
      !this.dateStatus.startBeforeEnd ||
      (!this.includePastDates && !this.dateStatus.startAfterToday);
    this.updateDateStatus.emit(this.dateStatus);
  }

  private setValidity(startDateTime, endDateTime) {
    const today = moment();
    this.dateStatus.startDateTimeValid = this.setError(startDateTime.isValid(), 'startDateTime', {
      invalidDate: true
    });

    this.dateStatus.endDateTimeValid = this.setError(endDateTime.isValid(), 'endDateTime', {
      invalidDate: true
    });

    if (this.dateStatus.endDateTimeValid && this.dateStatus.startDateTimeValid) {
      this.dateStatus.startAfterToday = this.setError(
        today.isBefore(startDateTime),
        'startDateTime',
        {
          startDateInFuture: true
        },
        this.includePastDates
      );

      this.dateStatus.startBeforeEnd = this.setError(startDateTime.isBefore(endDateTime), 'startDateTime', {
        startDateAfterEndDate: true
      });
    }
  }

  private setError(requiredCondition, control, errors, exclude = false) {
    if (!requiredCondition && !exclude) {
      this.dateTimeRange.controls[control].markAsTouched();
      this.dateTimeRange.controls[control].setErrors(errors);
      return false;
    } else {
      return true;
    }
  }
}
