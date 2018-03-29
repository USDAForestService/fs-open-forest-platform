import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { ChristmasTreesInfoService } from '../../_services/christmas-trees-info.service';

@Injectable()
export class ForestsResolver implements Resolve<any> {
  constructor(private service: ChristmasTreesInfoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const trees = this.service.getAll().catch(err => {
      return Observable.of(null);
    });
    return trees;
  }
}
