import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthenticationService } from './_services/authentication.service';
import { UsaBannerComponent } from './usa-banner/usa-banner.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilService } from './_services/util.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { NavigationEnd, Router, Routes } from '@angular/router';

export class MockAuthenticationService {
  user = { email: 'test@test.com', role: 'admin' };
  getAuthenticatedUser(): Observable<{}> {
    return Observable.of({ email: 'test@test.com', role: 'admin' });
  }
}

class MockServices {
  // Router
  public events = Observable.of( new NavigationEnd(0, 'http://localhost:4200/', 'http://localhost:4200/'));
  parseUrl(): String { return ''; }
}

const testRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AppComponent
      },
      {
        path: '#tree',
        component: AppComponent
      }
    ]
  }
];

describe('AppComponent', () => {
  describe('init', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(
      async(() => {
        TestBed.configureTestingModule({
          imports: [RouterTestingModule.withRoutes(testRoutes), HttpClientTestingModule],
          declarations: [AppComponent, UsaBannerComponent],
          providers: [
            { provide: AuthenticationService, useClass: MockAuthenticationService },
            UtilService,
            { provide: Router, useClass: MockServices }
          ],
          schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(
      'should create the app',
      async(() => {
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
      })
    );
    it('should show the status alert if present', () => {
      expect(localStorage.getItem('status')).toBe(null);
    });
    it('should set logged in message', () => {
      component.setLoggedInMessage({email: 'test@test.com'});
      expect(component.status).toEqual({
        heading: '',
        message: 'You have successfully logged in as test@test.com.'
      });
    });
  });

  describe('set status alert', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(
      async(() => {
        TestBed.configureTestingModule({
          imports: [RouterTestingModule, HttpClientTestingModule],
          declarations: [AppComponent, UsaBannerComponent],
          providers: [{ provide: AuthenticationService, useClass: MockAuthenticationService }, UtilService],
          schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      localStorage.setItem('status', JSON.stringify({ message: 'test', heading: 'test' }));
      fixture.detectChanges();
    });

    it ('should set the status message', () => {
      component.setStatus();
      expect(component.status.message).toEqual('test');

    });

    it ('should set the status heading', () => {
      component.setStatus();
      expect(component.status.heading).toEqual('test');
    });

    it ('should clear status from local storage', () => {
      component.setStatus();
      expect(localStorage.getItem('status')).toBeNull();
    });
  });

  describe('set loggedIn message', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(
      async(() => {
        TestBed.configureTestingModule({
          imports: [RouterTestingModule, HttpClientTestingModule],
          declarations: [AppComponent, UsaBannerComponent],
          providers: [{ provide: AuthenticationService, useClass: MockAuthenticationService }, UtilService],
          schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      localStorage.setItem('showLoggedIn', 'true');
      fixture.detectChanges();
    });

    it ('should set the logged in message', () => {
      component.setLoggedInMessage({ email: 'test@test.com'});
      expect(component.status.message).toEqual(`You have successfully logged in as test@test.com.`);

    });

    it ('should clear the showLoggedIn from local storage', () => {
      component.setLoggedInMessage({ email: 'test@test.com'});
      expect(localStorage.getItem('showLoggedIn')).toBeNull();
    });

    it ('should not set the logged in message if no user', () => {
      component.setLoggedInMessage(null);
      expect(component.status.message).toEqual('');

    });

    it ('should clear the local storage if no user', () => {
      component.setLoggedInMessage(null);
      expect(localStorage.getItem('showLoggedIn')).toBeNull();
    });

    it ('should clear the local storage if no user', () => {
      component.setLoggedInMessage(null);
      expect(localStorage.getItem('showLoggedIn')).toBeNull();
    });

    it ('should clear the local storage and remove showLoggedIn if no email on the user', () => {
      component.setLoggedInMessage({});
      expect(localStorage.getItem('showLoggedIn')).toBeNull();
      expect(component.status.message).toEqual('');
    });

  });
});
