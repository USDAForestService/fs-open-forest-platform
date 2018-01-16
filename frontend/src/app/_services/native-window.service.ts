import { Injectable } from '@angular/core';

@Injectable()
export class WindowRef {
  constructor() {}

  getNativeWindow() {
    return window;
  }
}
