import { HoursFromOrDate } from './hours-from-or-date.pipe';
import * as moment from 'moment/moment';

describe('HoursFromOrDate', () => {
  let pipe: HoursFromOrDate;

  beforeEach(() => {
    pipe = new HoursFromOrDate();
  });

  it('should not display date if time is less than threshold passed in', () => {
    const oneHourAgo = moment().subtract({ hours: 1, minutes: 50 });
    const theshold = 24;
    expect(pipe.transform(oneHourAgo, theshold)).toEqual('2 hours ago');
  });

  it('should display date if time is greator than threshold passed in', () => {
    const hoursAgo = moment().subtract({ hours: 25, minutes: 50 });
    const theshold = 24;
    expect(pipe.transform(hoursAgo, theshold)).toEqual(moment(hoursAgo, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY'));
  });
});
