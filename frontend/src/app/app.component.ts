import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { ActivatedRoute, Router, UrlSegment, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';
import { UtilService } from './_services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  version = environment.version;
  buildDate = environment.buildDate;
  currentRoute: string;
  apiurl = environment.apiUrl;
  currentUrl = '/';
  user: any;
  status = {
    heading: '',
    message: ''
  };

  constructor(public router: Router, private authentication: AuthenticationService, public util: UtilService) {
    router.events.subscribe(scroll => {
      if (scroll instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          util.gotoHashtag(tree.fragment, new Event('click'));
        } else {
          window.scrollTo(0, 0);
        }
      }
    });
  }

  isAuthenticated() {
    this.authentication.getAuthenticatedUser().subscribe((user: any) => {
      if (user) {
        this.user = user;
      }
    });
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

  updateStatus(status: any) {
    this.status = status;
  }

  ngOnInit() {
    this.currentUrl = this.router.url;
    window.scrollTo(0, 0);
  }
}
