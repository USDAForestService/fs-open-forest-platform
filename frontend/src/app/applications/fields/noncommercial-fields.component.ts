import { Component, Input, OnInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-noncommercial-fields',
  templateUrl: './noncommercial-fields.component.html',
})

export class NoncommercialFieldsComponent implements OnInit {
  @Input() parentForm: FormGroup;
  formName: string;
  dateStatus = {
    startDateTimeValid: true,
    endDateTimeValid: true,
    startBeforeEnd: true,
    startAfterToday: true,
    hasErrors: false
  };

  hours = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  minutes = ['00', '15', '30', '45'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formName = 'noncommercialFields';
    this[this.formName] = this.formBuilder.group({
      activityDescription: ['', [Validators.required]],
      endDateTime: [''],
      endDay: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      endMonth: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      endYear: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      endHour: ['', [Validators.required]],
      endMinutes: ['00', [Validators.required]],
      endPeriod: ['', [Validators.required]],
      locationDescription: ['', [Validators.required]],
      numberParticipants: ['', [Validators.required]],
      spectators: ['', [Validators.required]],
      startDateTime: [''],
  //    startDateTime: ['', [Validators.required]],
      startDay: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      startMonth: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      startYear: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      startHour: ['', [Validators.required]],
      startMinutes: ['00', [Validators.required]],
      startPeriod: ['', [Validators.required]]
    });
    this.parentForm.addControl(this.formName, this[this.formName]);

    this.parentForm.get('noncommercialFields.endPeriod').valueChanges.subscribe(values => {
      console.log(values);
      this.startDateChangeHandler(values);
      this.dateTimeRangeValidator(values);
    });
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
      this.parentForm.patchValue({ noncommercialFields: { endMonth: values.startMonth }});
      this.parentForm.patchValue({ noncommercialFields: { endDay: values.startDay }});
      this.parentForm.patchValue({ noncommercialFields: { endYear: values.startYear }});
    }
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
      const format = 'YYYY-MM-DD HH:mm A';
      const today = moment();
      // TODO: put this function in a util / constants file
      const startDateTime = moment(
        values.startYear +
        '-' +
        values.startMonth +
        '-' +
        values.startDay +
        ' ' +
        values.startHour +
        ':' +
        values.startMinutes +
        ' ' +
        values.startPeriod
      , format);
      const endDateTime = moment(
        values.endYear +
        '-' +
        values.endMonth +
        '-' +
        values.endDay +
        ' ' +
        values.endHour +
        ':' +
        values.endMinutes +
        ' ' +
        values.endPeriod
      , format);
      this.parentForm.patchValue({ noncommercialFields: { startDateTime: startDateTime }});
      this.parentForm.patchValue({ noncommercialFields: { endDateTime: endDateTime }});
      this.dateStatus.startDateTimeValid = startDateTime.isValid();
      this.dateStatus.endDateTimeValid = endDateTime.isValid();
      this.dateStatus.startBeforeEnd =  startDateTime.isBefore(endDateTime);
      this.dateStatus.startAfterToday = today.isBefore(startDateTime);
      this.dateStatus.hasErrors = !this.dateStatus.startDateTimeValid ||
        !this.dateStatus.endDateTimeValid ||
        !this.dateStatus.startBeforeEnd ||
        !this.dateStatus.startAfterToday;
    }
  }
}
