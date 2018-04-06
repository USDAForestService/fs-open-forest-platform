import { Injectable } from '@angular/core';
import { McBreadcrumbsResolver } from 'ngx-breadcrumbs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class PermitBreadcrumbsResolver extends McBreadcrumbsResolver {

  constructor() { super(); }

  /**
   * Resolve breadcrumbs for the route.
   * @returns     breadcrumbs
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const forestAbbr = route.params['id'];
    const forestName = route.data.permit.forest ? route.data.permit.forest.forestName : route.data.permit.error.permit.forest.forestName;

    const paths = [
      { title: 'Christmas tree permits', id: 'christmas-trees/forests' },
      { title: forestName, id: `christmas-trees/forests/${forestAbbr}` },
      { title: 'Buy a permit', id: `christmas-trees/forests/${forestAbbr}/applications` },
      { title: 'Permit confirmation', id: `christmas-trees/forests/${forestAbbr}/applications/permits/${route.params['permitId']}` }
    ];

    return paths.map((path) => ({
      text: path.title,
      path: super.getFullPath(route.parent) + '/' + path.id
    }));
  }
}
