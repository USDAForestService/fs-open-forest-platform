
import {of as observableOf,  Observable } from 'rxjs';

import {catchError} from 'rxjs/operators';


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { FirewoodInfoService } from '../../_services/firewood-info.service';

@Injectable()
export class FirewoodForestResolver implements Resolve<any> {
  constructor(private service: FirewoodInfoService) {}

  /**
   *  @returns forest with markdown content
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.paramMap.get('id');

    return this.service.getForestWithContent(id).pipe(catchError(err => {
      return observableOf(null);
    }));
  }
}
