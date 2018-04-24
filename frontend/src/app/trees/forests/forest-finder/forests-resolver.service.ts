import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { ChristmasTreesInfoService } from '../../_services/christmas-trees-info.service';

@Injectable()
export class ForestsResolver implements Resolve<any> {
  constructor(private service: ChristmasTreesInfoService, private router: Router) {}

  /**
   * @returns all forests
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.service.getAll().catch(err => {
      return Observable.of(null);
    });
  }
}
