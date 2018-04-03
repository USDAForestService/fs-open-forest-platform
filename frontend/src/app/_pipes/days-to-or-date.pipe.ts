import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment/moment';

@Pipe({ name: 'DaysToOrDate' })
export class DaysToOrDate implements PipeTransform {

  transform(value: any, daysTo: number): any {
    const today = moment();
    const futureDate = moment(value, 'YYYY-MM-DDTHH:mm:ss');
    const duration = moment.duration(futureDate.diff(today));
    const days = Math.ceil(duration.asDays());

    if (days <= daysTo && days > 0) {
      const dayOrDays = days > 1 ? 'days' : 'day';
      return `In ${days} ${dayOrDays} ${moment(value, 'YYYY-MM-DDTHH:mm:ss').format(' hh:mm a')}`;
    } else {
      return moment(value, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY hh:mm a');
    }
  }
}
