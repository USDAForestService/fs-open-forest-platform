import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
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
      service.create({}, 'noncommercial', true);
      expect(spy.called).toBeTruthy();
    })
  );

  it(
    'should call handleStatusCode',
    inject([ChristmasTreesApplicationService], service => {
      const spy = sinon.spy(service, 'handleStatusCode');
      service.handleStatusCode(403);
      service.handleStatusCode(402);
      expect(spy.calledTwice).toBeTruthy();
    })
  );

  it(
    'should call getOne',
    inject([ChristmasTreesApplicationService], service => {
      const spy = sinon.spy(service, 'getOne');
      service.getOne('id');
      expect(spy.called).toBeTruthy();
      service.getOne('id', 'test');
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
    'should cancel old app',
    inject([ChristmasTreesApplicationService], service => {
      const spy = sinon.spy(service, 'cancelOldApp');
      service.cancelOldApp(1);
      expect(spy.called).toBeTruthy();
    })
  );

  it(
    'should get details',
    inject([ChristmasTreesApplicationService], service => {
      const spy = sinon.spy(service, 'getDetails');
      service.getDetails(1);
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

  it(
    'should updateSeasonDates',
    inject([ChristmasTreesApplicationService], service => {
      const spy = sinon.spy(service, 'updateSeasonDates');
      service.updateSeasonDates(1, '10/10/2018', '10/10/2019');
      expect(spy.called).toBeTruthy();
    })
  );
});
