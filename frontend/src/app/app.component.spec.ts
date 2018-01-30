import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthenticationService } from './_services/authentication.service';
import { UsaBannerComponent } from './usa-banner/usa-banner.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilService } from './_services/util.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class MockAuthenticationService {
  getAuthenticatedUser(): Observable<{}> {
    return Observable.of({ email: 'test@test.com', role: 'admin' });
  }
}

describe('AppComponent', () => {
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
    fixture.detectChanges();
  });

  it(
    'should create the app',
    async(() => {
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    })
  );

  // it(
  //   'should check if user is authenticated',
  //   inject([AuthenticationService], (service, mockBackend) => {
  //     service.getAuthenticatedUser().subscribe(user => {
  //       expect(user.email).toBe('test@test.com');
  //     });
  //
  //     const status = { message: 'test', heading: 'test' };
  //     localStorage.setItem('status', JSON.stringify(status));
  //     component.isAuthenticated();
  //     expect(component.status.message).toBe('test');
  //     expect(component.status.heading).toBe('test');
  //     expect(localStorage.getItem('status')).toBeFalsy();
  //
  //     component.isAuthenticated();
  //     expect(component.status.message).toBe('');
  //     expect(component.status.heading).toBe('');
  //   })
  // );

  // it('should set user if user is authenticated', () => {
  //   component.isAuthenticated();
  //   expect(component.user).toEqual({ email: 'test@test.com', role: 'admin' });
  // });

  // it('should update status', () => {
  //   component.updateStatus({ heading: 'test', message: 'test message' });
  //   expect(component.status.heading).toBe('test');
  //   expect(component.status.message).toBe('test message');
  // });
});
