import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import { ApplicationService } from '../_services/application.service';
import { MockBackend } from '@angular/http/testing';
import { UtilService } from './util.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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

describe('AuthGuardService', () => {
  let service: AuthenticationService;
  let http: HttpClient;

  beforeEach(() => {
    service = new AuthenticationService(http, null);
    http = new HttpClient(null);

    TestBed.configureTestingModule({
      providers: [
        { provide: ApplicationService, useClass: MockApplicationService },
        UtilService
      ],
      imports: [RouterTestingModule, HttpClientTestingModule]
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
