import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';
import { UtilService } from './_services/util.service';
import * as moment from 'moment-timezone';

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

  constructor(public router: Router, public authentication: AuthenticationService, public util: UtilService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          setTimeout(() => {
            util.gotoHashtag(tree.fragment);
          }, 0);
        } else {
          window.scrollTo(0, 0);
        }

        if (this.authentication.user && localStorage.getItem('showLoggedIn')) {
          this.setLoggedInMessage(this.authentication.user);
        } else {
          localStorage.removeItem('showLoggedIn');
          this.setStatus();
        }
      }
    });
  }

  /**
   *  Set status message
   */
  setStatus() {
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

  /**
   *  Set logged in message
   */
  setLoggedInMessage(user) {
    if (user && user.email) {
      this.status = {
        heading: '',
        message: `You have successfully logged in as ${user.email}.`
      };
    }
    localStorage.removeItem('showLoggedIn');
  }

  /**
   *  Set this.currentUrl, and scroll to top of page
   */
  ngOnInit() {
    this.currentUrl = this.router.url;
    window.scrollTo(0, 0);
    moment.updateLocale('en', {
      meridiem(hour, minute, isLowerCase) {
        return hour < 12 ? 'a.m.' : 'p.m.';
      }
    });
  }
}
