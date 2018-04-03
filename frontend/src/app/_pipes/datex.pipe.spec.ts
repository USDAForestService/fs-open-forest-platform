import { DatexPipe } from './datex.pipe';
import * as moment from 'moment-timezone';

describe('DatexPipe', () => {
  let pipe: DatexPipe;

  beforeEach(() => {
    pipe = new DatexPipe();
  });

  it('transforms date using moment', () => {
    const value: any = moment('12-25-2017', 'MM-DD-YYYY');
    const format: any = 'MMM D, YYYY';
    expect(pipe.transform(value, format)).toEqual('Dec 25, 2017');
  });

  it('should return null if null is passed in', () => {
    expect(pipe.transform(null)).toBeFalsy();
  });

});
