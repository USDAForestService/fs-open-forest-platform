import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {
  private successMessage;
  private warningMessage;
  private errorMessage;

  constructor() {}

  getSuccessMessage() {
    return this.successMessage;
  }

  getWarningMessage() {
    return this.warningMessage;
  }

  getErrorMessage() {
    return this.errorMessage;
  }

  addSuccessMessage(message) {
    this.successMessage = message;
  }

  addWarningMessage(message) {
    this.warningMessage = message;
  }

  addErrorMessage(message) {
    this.errorMessage = message;
  }

  clear() {
    this.successMessage = undefined;
    this.warningMessage = undefined;
    this.errorMessage = undefined;
  }
}
