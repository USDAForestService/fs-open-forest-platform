import { MockRouter } from '../../../_mocks/routes.mock';
import { async, TestBed } from '@angular/core/testing';
import { UtilService } from '../../../_services/util.service';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { ForestsAdminResolver } from './forests-admin-resolver.service';
import { ChristmasTreesInfoService } from '../../_services/christmas-trees-info.service';
import { AuthenticationService } from '../../../_services/authentication.service';
import { Observable } from 'rxjs/Rx';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as sinon from 'sinon';


class MockAuthenticationService {
  user = { email: 'test@test.com', role: 'admin' };
  getAuthenticatedUser(): Observable<{}> {
    return Observable.create(obs => {
      obs.next({ email: 'test@test.com', role: 'admin', forests: [] });
      obs.complete();
    });
  }
}

class MockChristmasTreesInfoService {
  getAll(): Observable<{}> {
    return Observable.create(obs => {
      obs.next([ {abbr: 'arp'}, { forestAbbr: 'mthood' }, { forestAbbr: 'shoshone' } ]);
      obs.complete();
    });
  }
}

describe('Forest Admin Resolver Service', () => {

  describe('get admin forests',  () => {
    const mockNoForestsActivatedRoute = {
      data: Observable.of({})
    };

    let mockRouter;
    const mockAuthenticationService = new MockAuthenticationService();
    const mockChristmasTreesInfoService = new MockChristmasTreesInfoService();

    beforeEach(async(() => {
      mockRouter = new MockRouter();
      TestBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          ForestsAdminResolver,
          { provide: ChristmasTreesInfoService, useValue: mockChristmasTreesInfoService },
          UtilService,
          { provide: AuthenticationService, useValue: mockAuthenticationService },
          { provide: Router, useValue: mockRouter },
          { provide: ActivatedRoute, useValue: mockNoForestsActivatedRoute }
        ]
      });
    }));


    it('should send a user with no forests to access denied', () => {
      const resolver = TestBed.get(ForestsAdminResolver);
      const mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>( 'RouterStateSnapshot', ['toString']);

      resolver.resolve(mockNoForestsActivatedRoute, mockSnapshot).subscribe(forests => {
        expect(mockRouter.navigate).toHaveBeenCalledWith(['access-denied']);
      });
    });

    it('should return all forests a user with all', () => {
      const authObservable = Observable.create(obs => {
        obs.next({ email: 'test@test.com', role: 'admin', forests: ['all'] });
        obs.complete();
      });

      const stub = sinon.stub(mockAuthenticationService, 'getAuthenticatedUser').returns(authObservable);

      const resolver = TestBed.get(ForestsAdminResolver);
      const mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

      resolver.resolve(mockNoForestsActivatedRoute, mockSnapshot).subscribe(forests => {
        expect(forests.length).toEqual(3);
        stub.restore();
      });
    });

    it('should return a filtered list of forests a user with at least one', () => {
      const authObservable = Observable.create(obs => {
        obs.next({ email: 'test@test.com', role: 'admin', forests: ['arp', 'mthood']});
        obs.complete();
      });

      const stub = sinon.stub(mockAuthenticationService, 'getAuthenticatedUser').returns(authObservable);

      const resolver = TestBed.get(ForestsAdminResolver);
      const mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

      resolver.resolve(mockNoForestsActivatedRoute, mockSnapshot).subscribe(forests => {
        expect(forests.length).toEqual(1);
        stub.restore();
      });
    });
  });

});
