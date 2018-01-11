import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UtilService {
  currentSection: any;
  currentSubSection: any;

  setCurrentSection(section) {
    this.currentSection = section;
  }

  convertCamelToHyphenCase(string) {
    return string
      .replace(/\s+/g, '-')
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/s+$/, '')
      .toLowerCase();
  }

  gotoHashtag(fragment: string, event) {
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
    const id = value
      .replace(/[^A-Z0-9]+/gi, '-')
      .toLowerCase()
      .substring(0, 20);
    return id;
  }

  handleError(error: Response | any) {
    let body;
    let errors: any = [];
    if (error instanceof Response) {
      if (error.status) {
        switch (error.status) {
          case 400:
            body = error.json() || '';
            errors = body.errors;
            break;
          case 401:
            errors = [{ status: error.status, message: 'Please log in.' }];
            return Observable;
          case 403:
            errors = [{ status: error.status, message: 'Access denied.' }];
            break;
          case 404:
            errors = [{ status: error.status, message: 'The requested application is not found.' }];
            break;
          case 500:
            errors = [
              { status: error.status, message: 'Sorry, we were unable to process your request. Please try again.' }
            ];
            break;
          default:
            errors = [{ status: error.status }];
        }
        return Observable.throw(errors);
      }
    }
    try {
      body = error.json() || '';
      errors = body.errors;
      return Observable.throw(errors);
    } catch (err) {
      return Observable.throw([
        { status: 500, message: 'Sorry, we were unable to process your request. Please try again.' }
      ]);
    }
  }
}
