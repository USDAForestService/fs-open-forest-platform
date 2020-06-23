
import {of as observableOf,  Observable } from 'rxjs';

import {catchError} from 'rxjs/operators';


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { FirewoodInfoService } from '../../_services/firewood-info.service';

@Injectable()
export class FirewoodForestsResolver implements Resolve<any> {
  constructor(private service: FirewoodInfoService, private router: Router) {}

  /**
   * @returns all forests
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.service.getAll().pipe(catchError(err => {
      return observableOf(null);
    }));
  }
}
