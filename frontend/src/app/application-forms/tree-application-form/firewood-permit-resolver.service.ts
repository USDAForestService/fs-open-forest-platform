import {catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { FirewoodApplicationService } from '../../firewood/_services/firewood-application.service';

@Injectable()
export class FirewoodPermitResolver implements Resolve<any> {

  constructor(private service: FirewoodApplicationService, private router: Router) {}

  /**
   * Resolve data required for firewood permit ahead of page load.
   * @returns  Firewood permit
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const permitId = route.paramMap.get('permitId');
    const forest = route.paramMap.get('id');
    const token = route.queryParams['t'];
    return this.service.getPermit(permitId, token).pipe(catchError(err => {
      return this.service.resolverError(err, `firewood/forests/${forest}`);
    }));
  }

}
