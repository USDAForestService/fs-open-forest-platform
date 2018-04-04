import { async, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import { ApplicationService } from '../_services/application.service';
import { UtilService } from './util.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as sinon from 'sinon';

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

describe('Authentication Service', () => {
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

  it('getUser should return the user', () => {
    service.user = { email: 'test@test.com', role: 'admin' };
    const user = service.getUser();
    expect(user.email).toBe('test@test.com');

    service.user = false;
    expect(service.getUser()).toBeFalsy();
  });

  it('set user should set user', () => {
    service.setUser({ email: 'test@test.com', role: 'admin' });
    expect(service.user.email).toEqual('test@test.com');
  });

  it('remove user should removeUser user', () => {
    const stub = sinon.stub(service, 'isAuthenticated');
    stub.returns(Observable.of({ email: 'test@test.com', role: 'admin' }));
    service.removeUser();
    expect(service.user).toBeFalsy();
    stub.restore();
  });

  it('should get authenticated user', () => {
    const stub = sinon.stub(service, 'isAuthenticated');
    stub.returns(Observable.of({ email: 'test@test.com', role: 'admin' }));
    service.getAuthenticatedUser();
    expect(service.user.email).toEqual('test@test.com');
    stub.restore();
  });

  it('should set user if user is authenticated', () => {
    const stub = sinon.stub(service, 'isAuthenticated');
    stub.returns(Observable.of({ email: 'test@test.com', role: 'admin' }));
    service.getAuthenticatedUser(true);
    expect(service.user.email).toEqual('test@test.com');
    stub.restore();
  });

  it('should return null if no authenticated user', () => {
    const stub = sinon.stub(service, 'getUser');
    stub.returns(null);
    service.getAuthenticatedUser();
    expect(service.user).toBeFalsy();
    stub.restore();
  });

  it('removeUser should remove the user', () => {
    async(
      inject([HttpClient, HttpTestingController], (httpClient: HttpClient, backend: HttpTestingController) => {
        httpClient.get('auth/user').subscribe();
        backend.expectOne({
          url: '/auth/user',
          method: 'GET'
        });
        backend.match({
          url: '/auth/user',
          method: 'GET'
        })[0].flush({ email: 'test@test.com', role: 'admin' });

        service.user = { email: 'test@test.com', role: 'admin' };
        const user = service.removeUser();
        expect(user).toBeFalsy();

      })
    );

  });

  it('isAdmin should return if user is admin', () => {
    service.user = { email: 'test@test.com', role: 'admin' };
    expect(service.isAdmin()).toBeTruthy();
  });

});
