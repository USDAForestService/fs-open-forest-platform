import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as sinon from 'sinon';
import { ChristmasTreesApplicationService } from './christmas-trees-application.service';
import { UtilService } from '../../_services/util.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { MockRouter } from '../../_mocks/routes.mock';

describe('Christmas Trees Application Service', () => {
  let mockRouter: MockRouter;

  beforeEach(() => {
    mockRouter = new MockRouter();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UtilService, ChristmasTreesApplicationService, { provide: Router, useValue: mockRouter }]
    });
  });

  it(
    'should call create',
    inject([ChristmasTreesApplicationService], service => {
      const spy = sinon.spy(service, 'create');
      service.create({}, 'body', true);
      expect(spy.called).toBeTruthy();
    })
  );

  it(
    'should call getPermit',
    inject([ChristmasTreesApplicationService], service => {
      const spy = sinon.spy(service, 'getPermit');
      service.getPermit('id');
      expect(spy.called).toBeTruthy();
      service.getPermit('id', 'test');
      expect(spy.called).toBeTruthy();
    })
  );

  it(
    'resolve resolver error',
    inject([ChristmasTreesApplicationService], service => {
      expect(service.resolverError([{ status: 400 }])).toEqual(Observable.of({ error: { status: 400 } }));
      expect(service.resolverError([])).toEqual(Observable.of([]));
      service.resolverError([{ status: 404 }], '/test');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/test']);
    })
  );

  it(
    'should update permit for cancel',
    inject([ChristmasTreesApplicationService], service => {
      const spy = sinon.spy(service, 'updatePermit');
      service.updatePermit(1, 'Cancelled', '123');
      expect(spy.called).toBeTruthy();
    })
  );

  it(
    'should get all by date range',
    inject([ChristmasTreesApplicationService], service => {
      const spy = sinon.spy(service, 'getAllByDateRange');
      service.getAllByDateRange(1, '10/10/2018', '10/10/2019');
      expect(spy.called).toBeTruthy();
    })
  );

  it('should updateSeasonDates',
    inject([ChristmasTreesApplicationService], service => {
      const spy = sinon.spy(service, 'updateSeasonDates');
      service.updateSeasonDates(1, '10/10/2018', '10/10/2019');
      expect(spy.called).toBeTruthy();
    })
  );

  it('should updateDistrictDates',
    inject([ChristmasTreesApplicationService], service => {
      const spy = sinon.spy(service, 'updateDistrictDates');
      const forest = {
        id: 1,
        forestName: 'Arapaho and Roosevelt National Forests',
        description: 'Arapaho & Roosevelt | Colorado | Fort Collins, CO',
        forestAbbr: 'arp',
        startDate: '10/30/2018',
        endDate: '9/30/2019',
        cuttingAreas: {
          'ELKCREEK': {'startDate': '2017-12-02 15:30:00Z', 'endDate': '2017-12-09 21:30:00Z'},
          'REDFEATHERLAKES': {'startDate': '2017-12-02 15:30:00Z', 'endDate': '2017-12-10 21:30:00Z'},
          'SULPHUR': {'startDate': '2017-11-01 12:00:00Z', 'endDate': '2018-01-06 21:30:00Z'},
          'CANYONLAKES': {'startDate': '2017-11-27 15:30:00Z', 'endDate': '2017-12-10 21:30:00Z'}
        },
        timezone: 'America/Denver'
      };
      service.updateDistrictDates(forest, 'ELKCREEK', '2017-11-01T09:00:00Z', '2018-01-06T15:30:00Z');
      expect(spy.called).toBeTruthy();
    })
  );
});
