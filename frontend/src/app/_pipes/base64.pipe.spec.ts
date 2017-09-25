import { Base64 } from './base64.pipe';

describe('Base64', () => {
  let pipe: Base64;

  beforeEach(() => {
    pipe = new Base64();
  });

  it('should not display date if time is less than threshold passed in', () => {
    const value = 'test';
    expect(pipe.transform(value)).toEqual('dGVzdA==');
  });
});
