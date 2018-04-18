import { TestBed } from '@angular/core/testing';
import { UtilService } from './util.service';
import { Observable } from 'rxjs/Observable';
import * as sinon from 'sinon';
import { HttpErrorResponse } from '@angular/common/http';

describe('UtilService', () => {
  let service: UtilService;

  beforeEach(() => {
    service = new UtilService();

    TestBed.configureTestingModule({
      providers: [{ provide: UtilService }]
    });
  });

  it('should set the current section', () => {
    service.setCurrentSection('test');
    expect(service.currentSection).toBe('test');
  });

  it('should format string to ID', () => {
    const value: any = 'Test value';
    expect(service.createId(value)).toEqual('test-value');
  });

  it('should call go to hashtag', () => {
    const spy = sinon.spy(service, 'gotoHashtag');
    service.gotoHashtag('main', new Event('click'));
    service.gotoHashtag(null, new Event('click'));
    expect(spy.calledTwice).toBeTruthy();
  });

  it('should throw an observable if response is not instance of HttpErrorResponse', () => {
    const response = new HttpErrorResponse({});
    expect(service.handleError('string')).toEqual(jasmine.any(Observable));
    expect(service.handleError(new Error('error'))).toEqual(jasmine.any(Observable));
    expect(service.handleError(response)).toEqual(jasmine.any(Observable));
  });

  it('should throw an observable if response has status 400', () => {
    const response = new HttpErrorResponse({ status: 400, error: { errors: ['error'] } });
    expect(service.handleError(response)).toEqual(Observable.throw(['error']));
  });

  it('should throw an observable if response has status 401', () => {
    const response = new HttpErrorResponse({ status: 401, error: { errors: ['error'] } });
    expect(service.handleError(response)).toEqual(Observable);
  });

  it('should throw an observable if response has status 403', () => {
    const response = new HttpErrorResponse({ status: 403, error: { errors: ['error'] } });
    expect(service.handleError(response)).toEqual(Observable.throw([{ status: 403, message: 'Access denied.' }]));
  });

  it('should throw an observable if response has status 404', () => {
    const response = new HttpErrorResponse({ status: 404, error: { errors: ['error'] } });
    expect(service.handleError(response)).toEqual(
      Observable.throw([{ status: 404, message: 'The requested application is not found.' }])
    );
  });

  it('should throw an observable if response has status 405', () => {
    const response = new HttpErrorResponse({ status: 405, error: { errors: ['error'] } });
    expect(service.handleError(response)).toEqual(Observable.throw([{ status: 405 }]));
  });

  it('should set login redirect message', () => {
    service.setLoginRedirectMessage();
    expect(service.progress).toEqual({
      display: true,
      message: 'Redirecting to login page, please wait.'
    });
  });

  it('should add request to requests', () => {
    service.addRequest();
    expect(service.requests).toEqual(1);
    setTimeout(() => {
      expect(service.progress.display).toEqual(true);
    }, 260);
  });

  it('should remove request if requests are greator than 0', () => {
    service.requests = 1;
    service.removeRequest();
    expect(service.requests).toEqual(0);
    expect(service.progress.display).toEqual(false);

    service.removeRequest();
    expect(service.requests).toEqual(0);
  });

  it('should set requests', () => {
    service.setRequests(4);
    expect(service.requests).toEqual(4);
    setTimeout(() => {
      expect(service.progress.display).toEqual(true);
    }, 260);
  });
});
