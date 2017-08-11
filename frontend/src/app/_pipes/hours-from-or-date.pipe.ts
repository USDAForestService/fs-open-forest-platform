import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment/moment';

@Pipe({ name: 'HoursFromOrDate' })
export class HoursFromOrDate implements PipeTransform {
  transform(value: any, hoursFrom: number): any {
    const today = moment();
    const duration = moment.duration(today.diff(value));
    const hours = Math.ceil(duration.asHours());

    if (hours <= hoursFrom) {
      const hourOrHours = hours > 1 ? 'hours' : 'hour';
      return `${hours} ${hourOrHours} ago.`;
    } else {
      return moment(value, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY');
    }
  }
}
