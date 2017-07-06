import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  version = environment.version;
  buildDate = environment.buildDate;
  currentRoute: string;

  constructor(
    router: Router
  ) {
    router.events.subscribe(scroll => {
      // Scroll to top of page on route change
      window.scrollTo(0, 0);

      const urlWithSegments = router.url.split('#');

      if (urlWithSegments.length) {
        this.currentRoute = urlWithSegments[0];
      } else {
        this.currentRoute = router.url;
      }

      if (scroll instanceof NavigationEnd) {
        const url = router.parseUrl(router.url);
        if (url.fragment) {
          const element = document.querySelector('#' + url.fragment);
          if (element) { element.scrollIntoView(true); }
        }
      }
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
