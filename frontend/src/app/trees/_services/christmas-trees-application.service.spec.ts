import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as sinon from 'sinon';
import { ChristmasTreesApplicationService } from './christmas-trees-application.service';
import { UtilService } from '../../_services/util.service';
import { Observable } from 'rxjs/Observable';

describe('Christmas Trees Application Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, HttpClientTestingModule, RouterTestingModule],
      providers: [UtilService, ChristmasTreesApplicationService, { provide: XHRBackend, useClass: MockBackend }]
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
    })
  );
});
