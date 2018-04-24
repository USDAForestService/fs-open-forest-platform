import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UtilService {
  currentSection: any;
  currentSubSection: any;
  requests = 0;
  progress = {
    display: false,
    message: 'Loading, please wait.'
  };

  /**
   *  Set current section on page. Typically used on pages with sidebar navigation.
   */
  setCurrentSection(section) {
    this.currentSection = section;
  }

  /**
   * Set message when user is being redirected to login.gov or eauth.
   */
  setLoginRedirectMessage() {
    localStorage.setItem('showLoggedIn', 'logged in');
    this.setProgress(true, 'Redirecting to login page, please wait.');
  }

  /**
   * Set progress message. Used when uploading a files or waiting for assets to load
   */
  setProgress(display = true, message: string = '') {
    this.progress = {
      display: display,
      message: message
    };
  }

  /**
   * Check file upload progress
   */
  checkProgress() {
    if (this.requests > 0) {
      /*
      * Wait to prevent flashing spinner on quick responses.
      * Then check to make sure the request hasn't already been reset to 0
      * before setting the progress indicator to true.
      */
      setTimeout(() => {
        if (this.requests > 0) {
          this.setProgress(true);
        }
      }, 250);
    } else {
      this.setProgress(false);
    }
  }

  /**
   * Set number of file upload requests
   */
  setRequests(num: number) {
    this.requests = num;
    this.checkProgress();
  }

  /**
   * Add file upload requests
   */
  addRequest() {
    this.requests++;
    this.checkProgress();
  }

  /**
   * Remove file upload requests
   */
  removeRequest() {
    if (this.requests > 0) {
      this.requests--;
    }
    this.checkProgress();
  }

  /**
   * Go to requested hashtag
   * @param fragment  element ID
   * @param event event initating function call
   */
  gotoHashtag(fragment: string, event = null) {
    if (event) {
      event.preventDefault();
    }
    if (this.currentSection !== fragment) {
      this.currentSection = fragment;
      const element = document.querySelector('#' + fragment);
      this.currentSubSection = fragment;
      if (element) {
        element.scrollIntoView(true);
        const scrolledY = window.scrollY;
        window.scroll(0, scrolledY - 80);
        document.getElementById(fragment).focus();
        return fragment;
      }
    }
  }

  /**
   * Format string for use as ID (spaces to dashes, lowercase)
   */
  createId(value: string) {
    return value
      .replace(/[^A-Z0-9]+/gi, '-')
      .toLowerCase()
      .substring(0, 20);
  }

  /**
   * Handle error response for HTTP requets
   */
  handleError(error: HttpErrorResponse | any) {
    let errors: any = [];
    if (error instanceof HttpErrorResponse) {
      if (error.status) {
        switch (error.status) {
          case 400:
            errors = error.error.errors || '';
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
      errors = error.error.errors;
      return Observable.throw(errors);
    } catch (err) {
      return Observable.throw([
        { status: 500, message: 'Sorry, we were unable to process your request. Please try again.' }
      ]);
    }
  }
}
