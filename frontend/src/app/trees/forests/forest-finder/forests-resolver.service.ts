
import {of as observableOf,  Observable } from 'rxjs';

import {catchError} from 'rxjs/operators';


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { ChristmasTreesInfoService } from '../../_services/christmas-trees-info.service';

@Injectable()
export class ForestsResolver implements Resolve<any> {
  constructor(private service: ChristmasTreesInfoService, private router: Router) {}

  /**
   * @returns all forests
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.service.getAll().pipe(catchError(err => {
      return observableOf(null);
    }));
  }
}
