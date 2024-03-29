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
  getAdminNavItems(user) {
    const navItems = [{id: 'forest-admin-permits', routerLink: '/christmas-trees/forests', title: 'Christmas tree permits'}];
    if (user && (user.poc1_forests.length > 0 || user.poc2_forests.length > 0)) {
      navItems.push({id: 'forest-admin-reports', routerLink: '/christmas-trees/admin/reports', title: 'Generate reports'});
    }
    if (user && user.poc1_forests.length > 0) {
      navItems.push({id: 'forest-admin-seasons', routerLink: '/christmas-trees/admin/season-dates', title: 'Change season dates'});
      // TODO check if forests have district dates
      navItems.push({id: 'forest-admin-areas', routerLink: '/christmas-trees/admin/district-dates', title: 'Change cutting area dates'});
    }
    if (user && (user.poc1_forests.length > 0 || user.poc2_forests.length > 0)) {
      navItems.push({id: 'forest-admin-feedback', routerLink: '/christmas-trees/admin/feedback-review', title: 'Feedback'});
    }
    return navItems;
  }
}
