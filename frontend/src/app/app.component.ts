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

  constructor(router: Router) {
    router.events.subscribe(scroll => {
      // Scroll to top of page on route change
      window.scrollTo(0, 0);
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
