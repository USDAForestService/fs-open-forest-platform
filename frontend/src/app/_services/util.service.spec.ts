import { TestBed, async, inject } from '@angular/core/testing';
import { UtilService } from '../_services/util.service';
import { Observable } from 'rxjs/Observable';
import { Response, ResponseOptions } from '@angular/http';
import * as sinon from 'sinon';

describe('UtilService', () => {
  let service: UtilService;

  beforeEach(() => {
    service = new UtilService();

    TestBed.configureTestingModule({
      providers: [{ provide: UtilService }]
    });
  });

  it('should convert camel case to hyphen case', () => {
    expect(service.convertCamelToHyphenCase('testString')).toEqual('test-string');
    expect(service.convertCamelToHyphenCase('testStrings')).toEqual('test-string');
    expect(service.convertCamelToHyphenCase('stestStrings')).toEqual('stest-string');
    expect(service.convertCamelToHyphenCase('test String')).toEqual('test-string');
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

  it('should throw an observable if response does not contain errors', () => {
    const response = new Response(new ResponseOptions());
    expect(service.handleError(response)).toEqual(jasmine.any(Observable));
  });

  it('should throw an observable if response does not contain errors', () => {
    expect(service.handleError('string')).toEqual(jasmine.any(Observable));
  });

  it('should throw an observable if response does not contain errors', () => {
    expect(service.handleError(new Error('error'))).toEqual(jasmine.any(Observable));
  });
});
