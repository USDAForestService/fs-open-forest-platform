import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthenticatedComponent } from './authenticated.component';
import { AuthenticationService } from '../_services/authentication.service';
import { environment } from '../../environments/environment';
import * as sinon from 'sinon';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';
import { WindowRef } from '../_services/native-window.service';
import { UtilService } from '../_services/util.service';

export class MockAuthenticationService {
  user = { email: 'test@test.com', role: 'admin' };

  getAuthenticatedUser(): Observable<{}> {
    return Observable.of(this.user);
  }

  removeUser() {
    this.user = null;
  }
}

describe('AuthenticatedComponent', () => {
  let component: AuthenticatedComponent;
  let fixture: ComponentFixture<AuthenticatedComponent>;
  let mockWindow: WindowRef;
  mockWindow = <any>{ location: <any>{ hash: 'WAOW-MOCK-HASH' } };
  const routeStub = {
    data: null
  };
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AuthenticatedComponent],
        imports: [RouterTestingModule],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: Observable.of({
                user: { role: 'admin', email: 'test@test.com' },
                displayLogin: true
              })
            }
          },
          { provide: AuthenticationService, useClass: MockAuthenticationService },
          { provide: WindowRef, useValue: mockWindow },
          UtilService
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatedComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(
    'should let a user logout',
    async(() => {
      component.user = { email: 'test@test.com', role: 'admin' };
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('#log-out'));
      element.triggerEventHandler('click', new Event('Click'));
      expect(component.user).toBeNull();
    })
  );
});
