import { SortArray } from './sort-array.pipe';

describe('SortArray', () => {
  let pipe: SortArray;

  beforeEach(() => {
    pipe = new SortArray();
  });

  it('should order the array', () => {
    const array: any = [{ CreatedAt: '2017-08-20 11:55:31-05' }, { CreatedAt: '2017-08-14 11:52:52-05' }];
    const result = pipe.transform(array, 'CreatedAt');
    expect(result[0]['CreatedAt']).toEqual('2017-08-14 11:52:52-05');
  });
});
