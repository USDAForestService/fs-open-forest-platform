import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';

@Injectable()
export class TreesAdminService {
  setStartEndDate(formGroup, form) {
    if (formGroup && form.get('dateTimeRange')) {
      form.get('dateTimeRange.startMonth').setValue(moment(formGroup.startDate).format('MM'));
      form.get('dateTimeRange.startDay').setValue(moment(formGroup.startDate).format('DD'));
      form.get('dateTimeRange.startYear').setValue(moment(formGroup.startDate).format('YYYY'));
      form.get('dateTimeRange.endMonth').setValue(moment(formGroup.endDate).format('MM'));
      form.get('dateTimeRange.endDay').setValue(moment(formGroup.endDate).format('DD'));
      form.get('dateTimeRange.endYear').setValue(moment(formGroup.endDate).format('YYYY'));
    }
  }

  setStartEndTimes(formGroup, form) {
    if (formGroup && form.get('dateTimeRange')) {
      form.get('dateTimeRange.startHour').setValue(moment(formGroup.startDate).format('hh'));
      form.get('dateTimeRange.startMinutes').setValue(moment(formGroup.startDate).format('mm'));
      form.get('dateTimeRange.startPeriod').setValue(moment(formGroup.startDate).format('A'));
      form.get('dateTimeRange.endHour').setValue(moment(formGroup.endDate).format('hh'));
      form.get('dateTimeRange.endMinutes').setValue(moment(formGroup.endDate).format('mm'));
      form.get('dateTimeRange.endPeriod').setValue(moment(formGroup.endDate).format('A'));
    }
  }
}
