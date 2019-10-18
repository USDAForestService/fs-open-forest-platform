import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as moment from 'moment/moment';

@Injectable()
export class ChristmasTreesAdminService {
  /**
   * Set start and end date on supplied form, if form has dateTimeRange
   */
  setStartEndDate(forest, form) {
    if (forest && form.get('dateTimeRange')) {
      const startDate = moment(forest.startDate);
      const endDate = moment(forest.endDate);
      form.get('dateTimeRange.startMonth').setValue(startDate.format('MM'));
      form.get('dateTimeRange.startDay').setValue(startDate.format('DD'));
      form.get('dateTimeRange.startYear').setValue(startDate.format('YYYY'));
      form.get('dateTimeRange.endMonth').setValue(endDate.format('MM'));
      form.get('dateTimeRange.endDay').setValue(endDate.format('DD'));
      form.get('dateTimeRange.endYear').setValue(endDate.format('YYYY'));
    }
  }

  /**
   * Set start and end times on supplied form, if form has dateTimeRange
   */
  setStartEndTimes(formGroup, form) {
    if (formGroup && form.get('dateTimeRange')) {
      console.log(form.get('dateTimeRange.endPeriod'));
      console.log(form.get('dateTimeRange.startHour'));
      form.get('dateTimeRange.startHour').setValue(moment(formGroup.startDate).format('hh'));
      form.get('dateTimeRange.startMinutes').setValue(moment(formGroup.startDate).format('mm'));
      form.get('dateTimeRange.startPeriod').setValue(moment(formGroup.startDate).format('A'));
      form.get('dateTimeRange.endHour').setValue(moment(formGroup.endDate).format('hh'));
      form.get('dateTimeRange.endMinutes').setValue(moment(formGroup.endDate).format('mm'));
      form.get('dateTimeRange.endPeriod').setValue(moment(formGroup.endDate).format('A'));
    }
  }

  /**
   * @returns admin navigation links
   */
  getAdminNavItems() {
    return [
      { id: 'forest-admin-permits', routerLink: '/christmas-trees/forests', title: 'Christmas tree permits'},
      { id: 'forest-admin-reports', routerLink: '/admin/christmas-trees/reports', title: 'Generate reports'},
      { id: 'forest-admin-seasons', routerLink: '/admin/christmas-trees/season-dates', title: 'Change season dates'},
      { id: 'forest-admin-areas', routerLink: '/admin/christmas-trees/district-dates', title: 'Change cutting area dates'}
    ];
  }
}
