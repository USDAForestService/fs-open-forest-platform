
import {of as observableOf,  Observable ,  forkJoin } from 'rxjs';

import {catchError, first, map} from 'rxjs/operators';


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { FirewoodInfoService } from '../../_services/firewood-info.service';
import { AuthenticationService } from '../../../_services/authentication.service';

@Injectable()
export class ForestsAdminResolver implements Resolve<any> {
  constructor(
    private service: FirewoodInfoService,
    private authenticationService: AuthenticationService,
    private router: Router) {}

  /**
   * @returns Forests associated with user
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    let result;
    const forests = this.service.getAll();
    const users = this.authenticationService.getAuthenticatedUser();

    return forkJoin([forests, users]).pipe(map(results => {
      const user = results[1];
      const allForests = results[0];

      if (user && user.forests && user.forests.length) {
        result = allForests;
        if (Array.isArray(allForests) && user.forests.find(forest => forest !== 'all')) {
          result = allForests.filter(forest =>
            user.forests.find(forestAbbr => forestAbbr === forest.forestAbbr)
          );
        }
        return result;
      } else if (user && user.role === 'admin') {
        result = [];
        return result;
      } else {
        this.router.navigate(['access-denied']);
        return false;
      }

    }),
    first(),
      catchError(err => {
      return observableOf(null);
    })
    );
  }
}
