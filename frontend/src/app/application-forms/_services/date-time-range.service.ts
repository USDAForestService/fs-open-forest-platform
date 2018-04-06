import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment/moment';

@Injectable()
export class DateTimeRangeService {


  /**
   * Combine individual date fields to one moment date/time object
   * @returns      moment object
   */
  parseDateTime(year, month, day, hour, minutes, period) {
    return moment(`${year}-${month}-${day} ${hour}:${minutes} ${period}`, 'YYYY-MM-DD HH:mm a');
  }

  /**
   *  Return true if has start dates but no end dates
   */
  checkHasStartAndNoEnd(values) {
    return (
      values.startMonth &&
      values.startDay &&
      (values.startYear && values.startYear.toString().length === 4) &&
      !values.endMonth &&
      !values.endDay &&
      !values.endYear
    );
  }

  /**
   *  Return true if all date time fields are filled in
   */
  checkHasAllDateValues(values) {
    return (
      values.startMonth &&
      values.startDay &&
      values.startYear &&
      values.startYear.toString().length === 4 &&
      values.startHour &&
      values.startMinutes &&
      values.startPeriod &&
      values.endMonth &&
      values.endDay &&
      values.endYear &&
      values.endYear.toString().length === 4 &&
      values.endHour &&
      values.endMinutes &&
      values.endPeriod
    );
  }
}
