import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { ChristmasTreesInfoService } from '../../_services/christmas-trees-info.service';

@Injectable()
export class ForestResolver implements Resolve<any> {
  constructor(private service: ChristmasTreesInfoService) {}

  /**
   *  @returns forest with markdown content
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.paramMap.get('id');

    return this.service.getForestWithContent(id).catch(err => {
      return Observable.of(null);
    });
  }
}
