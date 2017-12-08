import { LineBreakFormatterPipe } from './line-break-formatter.pipe';
import { DomSanitizer, SafeValue } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';

class MockSanitizer implements DomSanitizer {
  sanitize(context: SecurityContext, value: SafeValue|string|null) {
    return value.toString();
  }
  bypassSecurityTrustHtml(result: any) {
    return result;
  }
  bypassSecurityTrustStyle(result: any) {
    return result;
  }
  bypassSecurityTrustScript(result: any) {
    return result;
  }
  bypassSecurityTrustUrl(result: any) {
    return result;
  }
  bypassSecurityTrustResourceUrl(result: any) {
    return result;
  }
}
describe('LineBreakFormatter', () => {
  let pipe: LineBreakFormatterPipe;
  beforeEach(() => {
    pipe = new LineBreakFormatterPipe(new MockSanitizer());
  });

  it('should replace all line breaks with "<br />"s', () => {
    expect(pipe.transform('First line.\nSecond line.')).toEqual('First line.<br />Second line.');
  });

});
