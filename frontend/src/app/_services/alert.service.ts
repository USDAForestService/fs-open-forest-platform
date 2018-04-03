import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {
  private successMessage;
  private warningMessage;
  private errorMessage;

  /**
   * @returns  success message string
   */
  getSuccessMessage() {
    return this.successMessage;
  }

  /**
   * @returns  warning message string
   */
  getWarningMessage() {
    return this.warningMessage;
  }

  /**
   * @returns  error message string
   */
  getErrorMessage() {
    return this.errorMessage;
  }

  /**
   * @param message success message string.
   */
  addSuccessMessage(message) {
    this.successMessage = message;
  }

  /**
   * @param message warning message string.
   */
  addWarningMessage(message) {
    this.warningMessage = message;
  }

  /**
   * @param message error message string.
   */
  addErrorMessage(message) {
    this.errorMessage = message;
  }

  /**
   * Clear all messages
   */
  clear() {
    this.successMessage = undefined;
    this.warningMessage = undefined;
    this.errorMessage = undefined;
  }
}
