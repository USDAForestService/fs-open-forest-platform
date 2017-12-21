import { ColumnizeArrayPipe } from './columnize-array.pipe';

describe('ColumnizeArrayPipe', () => {
  let pipe: ColumnizeArrayPipe;

  beforeEach(() => {
    pipe = new ColumnizeArrayPipe();
  });

  it('should', () => {
    const input =
      [
        {
          first: 1
        },
        {
          second: 2
        },
        {
          third: 3
        },
        {
          fourth: 4
        },
        {
          fifth: 5
        },
        {
          sixth: 6
        }
      ];
    const result = pipe.transform(input, 2);
    expect(result[0].length).toEqual(3);
    expect(result[1].length).toEqual(3);
  });
});

