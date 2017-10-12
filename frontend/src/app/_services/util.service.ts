import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
  convertCamelToHyphenCase(string) {
    return string.replace(/\s+/g, '-').replace(/([a-z])([A-Z])/g, '$1-$2').replace(/s+$/, '').toLowerCase();
  }

  gotoHashtag(fragment: string, event, currentSection) {
    event.preventDefault();
    const element = document.querySelector('#' + fragment);
    if (element) {
      element.scrollIntoView();
      currentSection = fragment;
      document.getElementById(fragment).focus();
    }
  }
}
