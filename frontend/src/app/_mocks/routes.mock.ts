import { ActivatedRoute, Params } from '@angular/router';
import { Observable, of } from 'rxjs';
import 'rxjs/add/observable/of';

export class MockActivatedRoute extends ActivatedRoute {
  params: Observable<Params>;

  constructor(parameters?: { [key: string]: any }) {
    super();
    this.params = of(parameters);
  }
}

export class MockRouter {
  private rootComponentType: Array<any>;
  navigate = jasmine.createSpy('navigate');
}
