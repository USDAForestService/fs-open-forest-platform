import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';

@Injectable()
export class TreesAdminService {

  setStartEndDate(forest, form) {
    if (forest && form.get('dateTimeRange')) {
      form.get('dateTimeRange.startMonth').setValue(moment(forest.startDate).format('MM'));
      form.get('dateTimeRange.startDay').setValue(moment(forest.startDate).format('DD'));
      form.get('dateTimeRange.startYear').setValue(moment(forest.startDate).format('YYYY'));
      form.get('dateTimeRange.endMonth').setValue(moment(forest.endDate).format('MM'));
      form.get('dateTimeRange.endDay').setValue(moment(forest.endDate).format('DD'));
      form.get('dateTimeRange.endYear').setValue(moment(forest.endDate).format('YYYY'));
    }
  }

}