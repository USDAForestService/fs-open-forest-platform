import { RemovePuncPipe } from './remove-punc.pipe';

describe('RemovePuncPipe', () => {
  it('create an instance', () => {
    const pipe = new RemovePuncPipe();
    expect(pipe).toBeTruthy();
  });

  it('remove the periods', () => {
    const pipe = new RemovePuncPipe();
    expect(pipe.transform('he.llo', ['.'])).toEqual('hello');
  });
});
