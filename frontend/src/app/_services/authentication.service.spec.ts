import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import { ApplicationService } from '../_services/application.service';
import { MockBackend } from '@angular/http/testing';

describe('AuthGuardService', () => {
  let service: AuthenticationService;
  let http: Http;
  let router: Router;
  let user: any;

  beforeEach(() => {
    service = new AuthenticationService(http, router);
    http = new Http(null, null);
    user = { email: 'test@test.com', role: 'admin' };

    TestBed.configureTestingModule({
      providers: [
        { provide: ApplicationService, useClass: MockApplicationService },
        { provide: XHRBackend, useClass: MockBackend }
      ],
      imports: [RouterTestingModule, HttpModule]
    });
  });

  it('should return the user', () => {
    service.user = { email: 'test@test.com', role: 'admin' };
    const user = service.getUser();
    expect(user.email).toBe('test@test.com');
  });

  it('should remove the user', () => {
    service.user = { email: 'test@test.com', role: 'admin' };
    const user = service.removeUser();
    expect(user).toBeFalsy();
  });

  it('should return if user is admin', () => {
    service.user = { email: 'test@test.com', role: 'admin' };
    expect(service.isAdmin()).toBeTruthy();
  });
});

class MockApplicationService {
  get(): Observable<{}> {
    return Observable.of();
  }

  scrollToFirstError() {
    return false;
  }

  touchAllFields() {
    return false;
  }

  create(): Observable<{}> {
    return Observable.of();
  }
}
