import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ChristmasTreesApplicationService } from '../../trees/_services/christmas-trees-application.service';

@Injectable()
export class ChristmasTreePermitResolver implements Resolve<any> {
  constructor(private service: ChristmasTreesApplicationService, private router: Router) {}

  /**
   * Resolve data required for christmas tree permit ahead of page load.
   * @returns  Christmas tree permit
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const permitId = route.paramMap.get('permitId');
    const forest = route.paramMap.get('id');
    const token = route.queryParams['t'];
    return this.service.getPermit(permitId, token).catch(err => {
      return this.service.resolverError(err, `christmas-trees/forests/${forest}/applications`);
    });
  }
}
