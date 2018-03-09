import { LineBreakFormatterPipe } from './line-break-formatter.pipe';
import { MockSanitizer } from '../_mocks/domSanitizer.mock';

describe('LineBreakFormatter', () => {
  let pipe: LineBreakFormatterPipe;
  beforeEach(() => {
    pipe = new LineBreakFormatterPipe(new MockSanitizer());
  });

  it('should replace all line breaks with "<br />"s', () => {
    expect(pipe.transform('First line.\nSecond line.')).toEqual('First line.<br />Second line.');
  });

});
