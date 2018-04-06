import { TestBed } from '@angular/core/testing';
import { AlertService } from '../_services/alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    service = new AlertService();

    TestBed.configureTestingModule({
      providers: [{ provide: AlertService, useClass: AlertService }]
    });
  });

  it('set and get warning message', () => {
    service.addWarningMessage('test');
    expect(service.getWarningMessage()).toBe('test');
  });

  it('set and get error message', () => {
    service.addErrorMessage('test');
    expect(service.getErrorMessage()).toBe('test');
  });

  it('set and get success message', () => {
    service.addSuccessMessage('test');
    expect(service.getSuccessMessage()).toBe('test');
  });
});
