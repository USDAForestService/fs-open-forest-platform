import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { AuthenticatedComponent } from './authenticated.component';
import { AuthenticationService } from '../_services/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Data,
  NavigationEnd,
  Params,
  Route,
  Router,
  UrlSegment
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';
import { WindowRef } from '../_services/native-window.service';
import { UtilService } from '../_services/util.service';
import { AdminUserFormatterPipe } from '../_pipes/admin-user-formatter.pipe';

export class MockAuthenticationService {
  user = { email: 'test@test.com', role: 'admin' };

  getAuthenticatedUser(): Observable<{}> {
    return Observable.of(this.user);
  }

  removeUser() {
    this.user = null;
  }
}

class MockServices {
  // Router
  public events = Observable.of( new NavigationEnd(0, 'http://localhost:4200/', 'http://localhost:4200/'));
  parseUrl(): String { return ''; }
}

class MockActivatedRoute implements ActivatedRoute {
  snapshot: ActivatedRouteSnapshot;
  url: Observable<UrlSegment[]>;
  params: Observable<Params>;
  queryParams: Observable<Params>;
  fragment: Observable<string>;
  data: Observable<Data>;
  outlet: string;
  component: Type<any>|string;
  routeConfig: Route;
  root: ActivatedRoute;
  parent: ActivatedRoute;
  firstChild: ActivatedRoute;
  children: ActivatedRoute[];
  pathFromRoot: ActivatedRoute[];
  paramMap: any;
  queryParamMap: any;
  toString(): string {
    return '';
  }
}


describe('AuthenticatedComponent', () => {
  let component: AuthenticatedComponent;
  let fixture: ComponentFixture<AuthenticatedComponent>;
  let mockWindow: WindowRef;
  mockWindow = <any>{ location: <any>{ hash: 'WAOW-MOCK-HASH' } };
  const mockRoute = new MockActivatedRoute();
  mockRoute.parent = new MockActivatedRoute();
  mockRoute.firstChild = new MockActivatedRoute();
  mockRoute.firstChild.data = Observable.of({
    user: { role: 'admin', email: 'test@test.com' },
    displayLogin: true
  });

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AuthenticatedComponent, AdminUserFormatterPipe],
        imports: [RouterTestingModule],
        providers: [
          { provide: ActivatedRoute, useValue: mockRoute },
          { provide: AuthenticationService, useClass: MockAuthenticationService },
          { provide: WindowRef, useValue: mockWindow },
          UtilService,
          { provide: Router, useClass: MockServices }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
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

  it ('should set showAdminNav to false if the user has no forests but is an admin', () => {
    async(() => {
      component.user = { email: 'test@test.com', role: 'admin' };
      fixture.detectChanges();
      expect(component.showAdminNav).toBeFalsy();
    });
  });

  it ('should set showAdminNav to true if the user has forests and is an admin', () => {
    async(() => {
      component.user = { email: 'test@test.com', role: 'admin', forests: ['arp'] };
      fixture.detectChanges();
      expect(component.showAdminNav).toBeTruthy();
    });
  });

  it ('should set showSUDS to true if the user has no forests but is an admin', () => {
    async(() => {
      component.user = { email: 'test@test.com', role: 'admin' };
      fixture.detectChanges();
      expect(component.showSUDS).toBeTruthy();
    });
  });

  it ('should set showSUDS to true if the user has empty forests but is an admin', () => {
    async(() => {
      component.user = { email: 'test@test.com', role: 'admin', forests: [] };
      fixture.detectChanges();
      expect(component.showSUDS).toBeTruthy();
    });
  });

  it ('should set showSUDS to false if the user has forests and is an admin', () => {
    async(() => {
      component.user = { email: 'test@test.com', role: 'admin', forests: ['arp'] };
      fixture.detectChanges();
      expect(component.showSUDS).toBeFalsy();
    });
  });

  it ('should set showSUDS to false and showAdminNav to false if the user is not an admin', () => {
    async(() => {
      component.user = { email: 'test@test.com', role: 'notanadmin', forests: ['arp'] };
      fixture.detectChanges();
      expect(component.showSUDS).toBeFalsy();
      expect(component.showAdminNav).toBeFalsy();
    });
  });

  afterEach(() => {
    localStorage.clear();
  });
});
