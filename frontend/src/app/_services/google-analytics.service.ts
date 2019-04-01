import { Injectable } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
declare var gas: Function;

@Injectable()
export class GoogleAnalyticsService {

  constructor(router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gas('send', 'pageview', event.url, document.title);
      }
    });
  }
}
