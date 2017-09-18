import { DaysToOrDate } from './days-to-or-date.pipe';
import * as moment from 'moment/moment';

describe('DaysToOrDate', () => {
  let pipe: DaysToOrDate;

  beforeEach(() => {
    pipe = new DaysToOrDate();
  });

  it('should not display date if time is less than threshold passed in', () => {
    const daysAgo = moment().add({ days: 2 });
    const theshold: number = 24;
    expect(pipe.transform(daysAgo, theshold)).toEqual(
      `In 2 days ${moment(daysAgo, 'YYYY-MM-DDTHH:mm:ss').format(' hh:mm a')}`
    );
  });

  it('should display singular day if only 1 day until', () => {
    const daysAgo = moment().add({ days: 1 });
    const theshold: number = 24;
    expect(pipe.transform(daysAgo, theshold)).toEqual(
      `In 1 day ${moment(daysAgo, 'YYYY-MM-DDTHH:mm:ss').format(' hh:mm a')}`
    );
  });

  it('should display date if time is greator than threshold passed in', () => {
    const daysAgo = moment().add({ days: 25 });
    const theshold: number = 24;
    expect(pipe.transform(daysAgo, theshold)).toEqual(
      moment(daysAgo, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY hh:mm a')
    );
  });
});
