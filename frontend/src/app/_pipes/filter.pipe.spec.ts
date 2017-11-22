import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('should', () => {
    const items = [
      {
      field2: '1'
    },
    {
      field2: '2'
    }
  ]
    expect(pipe.transform(items, 'field2', '2')).toEqual([{field2: '2'}]);
  });

});
