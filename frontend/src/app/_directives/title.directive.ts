import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Directive, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Directive({
  selector: '[appPageTitle]'
})
export class TitleDirective implements OnInit {
  id: string;
  type: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {}

  /**
   * Look at the current route to see if a title is set, if so, set the page title via titleService
   */
  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
          return route;
        }
      })
      .filter(route => route.outlet === 'primary')
      .filter(route => route['data']['value']['title'] !== '')
      .mergeMap(route => route.data)
      .subscribe(routeData => {
        if (routeData.title) {
          this.titleService.setTitle(`${routeData['title']}`);
        }
      });
  }
}
