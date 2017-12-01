import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
  currentSection: any;
  currentSubSection: any;

  setCurrentSection(section) {
    this.currentSection = section;
  }

  convertCamelToHyphenCase(string) {
    return string.replace(/\s+/g, '-').replace(/([a-z])([A-Z])/g, '$1-$2').replace(/s+$/, '').toLowerCase();
  }

  gotoHashtag(fragment: string, event, subSection = '') {
    event.preventDefault();
    const element = document.querySelector('#' + fragment);
    this.currentSubSection = fragment;
    if (element) {
      element.scrollIntoView();
      document.getElementById(fragment).focus();
      return fragment;
    }
  }

  createId(value: string) {
    const id = value.replace(/[^A-Z0-9]+/gi, '-').toLowerCase().substring(0, 20);
    return id;
  }
}
