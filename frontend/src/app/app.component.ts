import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';
import { UtilService } from './_services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  version = environment.version;
  buildDate = environment.buildDate;
  apiurl = environment.apiUrl;
  currentUrl = '/';
  user: any;
  status = {
    heading: '',
    message: ''
  };

  constructor(public router: Router, private authentication: AuthenticationService, public util: UtilService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          util.gotoHashtag(tree.fragment, new Event('click'));
        } else {
          window.scrollTo(0, 0);
        }
      }
    });
  }

  ngOnInit() {
    this.currentUrl = this.router.url;
    window.scrollTo(0, 0);
    if (localStorage.getItem('status')) {
      this.status = JSON.parse(localStorage.getItem('status'));
      localStorage.removeItem('status');
    } else {
      this.status = {
        heading: '',
        message: ''
      };
    }
  }
}
