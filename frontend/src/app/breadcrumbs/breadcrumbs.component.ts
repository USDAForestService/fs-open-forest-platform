import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { IBreadcrumb, McBreadcrumbsService } from 'ngx-breadcrumbs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  crumbs: IBreadcrumb[];
  subscriptions = new Array<Subscription>();

  constructor(public service: McBreadcrumbsService) {}

  public ngOnInit(): void {
    this.subscriptions.push(this.service.crumbs$.subscribe((x) => {
      this.crumbs = x;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

}
