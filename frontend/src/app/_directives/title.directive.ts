import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Directive, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Directive({
  selector: '[appPageTitle]'
})
export class TitleDirective implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {}
  ngOnInit() {
    // Look at the current route to see if a title is set,
    // if so, set the page title via titleService
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
      .subscribe(event => this.titleService.setTitle(event['title']));
  }
}
