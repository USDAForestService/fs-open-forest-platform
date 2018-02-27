import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { ChristmasTreesService } from '../../_services/christmas-trees.service';

@Injectable()
export class ForestResolver implements Resolve<any> {
  constructor(private service: ChristmasTreesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.paramMap.get('id');

    return this.service.getForestWithContent(id).catch(err => {
      return Observable.of(null);
    });
  }
}
