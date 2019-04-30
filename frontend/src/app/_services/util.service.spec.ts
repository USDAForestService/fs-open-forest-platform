import { TestBed } from '@angular/core/testing';
import * as sinon from 'sinon';
import { UtilService } from './util.service';
import { WindowRef } from './native-window.service';

describe('UtilService', () => {
  let service: UtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UtilService,
        { provide: WindowRef }
      ]
    });
    service = TestBed.get(UtilService);

    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  })

  it('should set the current section', () => {
    service.setCurrentSection('test');
    expect(service.currentSection).toBe('test');
  });

  it('should format string to ID', () => {
    const value = 'Test value';
    expect(service.createId(value)).toEqual('test-value');
  });

  it('should call go to hashtag', () => {
    const spy = sinon.spy(service, 'gotoHashtag');
    service.gotoHashtag('main', new Event('click'));
    service.gotoHashtag(null, new Event('click'));
    expect(spy.calledTwice).toBeTruthy();
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
    jasmine.clock().tick(250);
    expect(service.requests).toEqual(1);
    expect(service.progress.display).toEqual(true);
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
    jasmine.clock().tick(250);
    expect(service.requests).toEqual(4);
    expect(service.progress.display).toEqual(true);
  });
});
