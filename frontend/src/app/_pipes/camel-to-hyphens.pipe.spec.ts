import { CamelToHyphensPipe } from './camel-to-hyphens.pipe';

describe('CamelToHyphensPipe', () => {
  let pipe: CamelToHyphensPipe;

  beforeEach(() => {
    pipe = new CamelToHyphensPipe();
  });

  it('transforms camel case to hyphens', () => {
    const value: any = 'testValue';
    expect(pipe.transform(value)).toEqual('test-value');
  });

  it('should return null if null is passed in', () => {
    expect(pipe.transform(null)).toBeFalsy();
  });

});
