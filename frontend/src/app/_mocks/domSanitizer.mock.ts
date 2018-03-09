import { DomSanitizer, SafeValue } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';

export class MockSanitizer implements DomSanitizer {
  sanitize(context: SecurityContext, value: SafeValue|string|null) {
    if (value) {
      return value.toString();
    } else {
      return '';
    }
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
