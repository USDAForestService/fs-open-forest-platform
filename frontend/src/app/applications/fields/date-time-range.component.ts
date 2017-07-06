import { Component, Input, OnInit, EventEmitter, Output  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { Hours, Minutes } from '../../_models/constants';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-date-time-range',
  templateUrl: './date-time-range.component.html',
})

export class DateTimeRangeComponent implements OnInit {
  @Input() parentForm: FormGroup;
  formName: string;
  dateStatus = {
    startDateTimeValid: true,
    endDateTimeValid: true,
    startBeforeEnd: true,
    startAfterToday: true,
    hasErrors: false
  };

  dateTimeRange: any;

  hours = Hours;
  minutes = Minutes;

  @Output() updateDateStatus: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) { }


  ngOnInit() {

    this.formName = 'dateTimeRange';
    this[this.formName] = this.formBuilder.group({
      endDateTime: ['', [Validators.required]],
      endDay: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      endMonth: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      endYear: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      endHour: ['', [Validators.required]],
      endMinutes: ['00', [Validators.required]],
      endPeriod: ['', [Validators.required]],
      startDateTime: ['', [Validators.required]],
      startDay: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      startMonth: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      startYear: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      startHour: ['', [Validators.required]],
      startMinutes: ['00', [Validators.required]],
      startPeriod: ['', [Validators.required]]
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

    const dateFieldsToWatch = ['startMonth', 'startDay', 'startYear', 'startHour', 'startMinutes', 'startPeriod', 'endMonth', 'endDay', 'endYear', 'endHour', 'endMinutes', 'endPeriod'];
    for (const field of dateFieldsToWatch) {
      this.parentForm.get('dateTimeRange.' + field).valueChanges.subscribe(value => {
        const values = this.parentForm.get('dateTimeRange').value;
        values[field] = value;
        this.dateTimeRangeValidator(values);
      });
    }
  }


  startDateChangeHandler(values) {
    if (
      values.startMonth &&
      values.startDay &&
      values.startYear.length === 4 &&
      !values.endMonth &&
      !values.endDay &&
      !values.endYear
    ) {
      this.parentForm.patchValue({ dateTimeRange: { endMonth: values.startMonth }});
      this.parentForm.patchValue({ dateTimeRange: { endDay: values.startDay }});
      this.parentForm.patchValue({ dateTimeRange: { endYear: values.startYear }});
    }
  }

  parseDateTime(year, month, day, hour, minutes, period) {
    return moment(`${year}-${month}-${day} ${hour}:${minutes} ${period}`, 'YYYY-MM-DD HH:mm A');
  }

  dateTimeRangeValidator(values) {
    if (
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
    ) {

      const outputFormat = 'YYYY-MM-DDTHH:mm:ss';
      const today = moment();

      const startDateTime = this.parseDateTime(values.startYear, values.startMonth, values.startDay, values.startHour, values.startMinutes, values.startPeriod);
      const endDateTime = this.parseDateTime(values.endYear, values.endMonth, values.endDay, values.endHour, values.endMinutes, values.endPeriod);
      this.parentForm.patchValue({ dateTimeRange: { startDateTime: startDateTime.format(outputFormat) + 'Z' }});
      this.parentForm.patchValue({ dateTimeRange: { endDateTime: endDateTime.format(outputFormat) + 'Z' }});
      this.dateStatus.startDateTimeValid = startDateTime.isValid();
      this.dateStatus.endDateTimeValid = endDateTime.isValid();
      this.dateStatus.startBeforeEnd =  startDateTime.isBefore(endDateTime);
      this.dateStatus.startAfterToday = today.isBefore(startDateTime);
      this.dateStatus.hasErrors = !this.dateStatus.startDateTimeValid ||
        !this.dateStatus.endDateTimeValid ||
        !this.dateStatus.startBeforeEnd ||
        !this.dateStatus.startAfterToday;
      this.updateDateStatus.emit(this.dateStatus);
    }
   }
}
