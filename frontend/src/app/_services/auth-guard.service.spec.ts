import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { Observable } from 'rxjs/Observable';

describe('AuthGuardService', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    service = new AuthGuardService(null, null);
    service.redirect = () => {
      return false;
    };
    TestBed.configureTestingModule({
      providers: [AuthGuardService],
      imports: [RouterTestingModule]
    });
  });

  it('should allow an admin user to access an admin route', () => {
    const valid = service.validateUser(
      { email: 'test@test.com', role: 'admin' },
      { _routeConfig: { path: 'admin/applications' } }
    );
    expect(valid).toBeTruthy();
  });

  it('should not allow a normal user to access an admin route', () => {
    const valid = service.validateUser(
      { email: 'test@test.com', role: 'user' },
      { _routeConfig: { path: 'admin/applications' } }
    );
    expect(valid).toBeFalsy();
  });

  it('should allow an admin user to access a normal restricted route', () => {
    const valid = service.validateUser(
      { email: 'test@test.com', role: 'admin' },
      { _routeConfig: { path: 'applications/temp-outfitters/new' } }
    );
    expect(valid).toBeTruthy();
  });

  it('should allow a normal user to access a normal restricted route', () => {
    const valid = service.validateUser(
      { email: 'test@test.com', role: 'user' },
      { _routeConfig: { path: 'applications/temp-outfitters/new' } }
    );
    expect(valid).toBeTruthy();
  });

  it('should not allow a non-authenticated user to access a normal restricted route', () => {
    const valid = service.validateUser(null, { _routeConfig: { path: 'applications/temp-outfitters/new' } });
    expect(valid).toBeFalsy();
  });
});
