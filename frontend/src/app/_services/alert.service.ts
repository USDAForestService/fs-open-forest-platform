import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {

  private successMessage;
  private warningMessage;
  private errorMessage;

  constructor () {
    console.log('AlertService');
  }

  getSuccessMessage() {
    return this.successMessage;
  }

  addSuccessMessage(message) {
    this.successMessage = message;
  }

  clear() {
    this.successMessage = undefined;
  }

}
