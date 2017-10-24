import { TestBed, async, inject } from '@angular/core/testing';
import { UtilService } from '../_services/util.service';

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
});
