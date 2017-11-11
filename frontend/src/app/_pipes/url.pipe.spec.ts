import { UrlPipe } from './url.pipe';

describe('UrlPipe', () => {
  let pipe: UrlPipe;

  beforeEach(() => {
    pipe = new UrlPipe();
  });

  it('should add http if value does not already have it', () => {
    let value = 'test.com';
    expect(pipe.transform(value)).toEqual('http://test.com');

    value = 'http://test.com';
    expect(pipe.transform(value)).toEqual('http://test.com');

    value = 'https://test.com';
    expect(pipe.transform(value)).toEqual('https://test.com');
  });
});
