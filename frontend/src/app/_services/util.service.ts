import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
  convertCamelToHyphenCase(string) {
    return string.replace(/\s+/g, '-').replace(/([a-z])([A-Z])/g, '$1-$2').replace(/s+$/, '').toLowerCase();
  }
}
