import { Injectable } from '@angular/core';

@Injectable()
export class WindowRef {
  constructor() {}

  /**
   * Get native window
   */
  getNativeWindow() {
    return window;
  }
}
