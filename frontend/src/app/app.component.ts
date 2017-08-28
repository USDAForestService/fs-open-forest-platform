import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  version = environment.version;
  buildDate = environment.buildDate;
  currentRoute: string;
  apiurl = environment.apiUrl;

  constructor(private router: Router) {
    router.events.subscribe(scroll => {
      // Scroll to top of page on route change
      window.scrollTo(0, 0);
    });
  }

  gotoHashtag(fragment: string, event) {
    event.preventDefault();
    const element = document.querySelector('#' + fragment);
    if (element) {
      element.scrollIntoView();
      document.getElementById(fragment).focus();
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
