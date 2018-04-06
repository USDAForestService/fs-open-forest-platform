import { inject, TestBed } from '@angular/core/testing';
import { ApplicationService } from '../_services/application.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as sinon from 'sinon';
import { UtilService } from './util.service';
import { HttpClientModule } from '@angular/common/http';

describe('Application Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule],
      providers: [UtilService, ApplicationService]
    });
  });

  it(
    'should call create',
    inject([ApplicationService], service => {
      const spy = sinon.spy(service, 'create');
      service.create({}, 'noncommercial', true);
      expect(spy.called).toBeTruthy();
    })
  );

  it(
    'should call get',
    inject([ApplicationService], service => {
      const spy = sinon.spy(service, 'get');
      service.get();
      expect(spy.called).toBeTruthy();
      service.get('test');
      expect(spy.called).toBeTruthy();
    })
  );

  it(
    'should call getOne',
    inject([ApplicationService], service => {
      const spy = sinon.spy(service, 'getOne');
      service.getOne('id');
      expect(spy.called).toBeTruthy();
      service.getOne('id', 'test');
      expect(spy.called).toBeTruthy();
    })
  );

  it(
    'should call update',
    inject([ApplicationService], service => {
      const spy = sinon.spy(service, 'update');
      service.update({}, 'noncommercial');
      expect(spy.called).toBeTruthy();
    })
  );

  it(
    'should call handleStatusCode',
    inject([ApplicationService], service => {
      const spy = sinon.spy(service, 'handleStatusCode');
      service.handleStatusCode(403);
      service.handleStatusCode(402);
      expect(spy.calledTwice).toBeTruthy();
    })
  );
});
