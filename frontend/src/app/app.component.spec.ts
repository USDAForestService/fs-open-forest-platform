import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthenticationService } from './_services/authentication.service';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { UsaBannerComponent } from './usa-banner/usa-banner.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { MockBackend } from '@angular/http/testing';
import { MockService } from './_services/mock.service';
import { UtilService } from './_services/util.service';

import * as sinon from 'sinon';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockService: MockService;
  const mockResponse = { email: 'test@test.com', role: 'admin' };

  beforeEach(
    async(() => {
      mockService = new MockService();
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, HttpModule],
        declarations: [AppComponent, UsaBannerComponent],
        providers: [
          { provide: AuthenticationService, useClass: AuthenticationService },
          { provide: XHRBackend, useClass: MockBackend },
          { provide: MockService, use: mockService },
          UtilService
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    inject([AuthenticationService, XHRBackend], (service, mockBackend) => {
      mockService.mockResponse(mockBackend, mockResponse);
    });
    fixture.detectChanges();
  });

  it(
    'should create the app',
    async(() => {
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    })
  );

  it(
    'should check if user is authenticated',
    inject([AuthenticationService, XHRBackend], (service, mockBackend) => {
      mockService.mockResponse(mockBackend, mockResponse);

      service.getAuthenticatedUser().subscribe(user => {
        expect(user.email).toBe('test@test.com');
      });

      const status = { message: 'test', heading: 'test' };
      localStorage.setItem('status', JSON.stringify(status));
      component.isAuthenticated();
      expect(component.status.message).toBe('test');
      expect(component.status.heading).toBe('test');
      expect(localStorage.getItem('status')).toBeFalsy();

      component.isAuthenticated();
      expect(component.status.message).toBe('');
      expect(component.status.heading).toBe('');
    })
  );

  it(
    'should throw error if error',
    inject([AuthenticationService, XHRBackend], (service, mockBackend) => {
      mockBackend.connections.subscribe(connection => {
        connection.mockError(
          new Response(
            new ResponseOptions({
              body: JSON.stringify({ errors: ['error'] })
            })
          )
        );
      });

      service.getAuthenticatedUser().subscribe(
        success => {},
        (e: any) => {
          expect(e).toEqual(['error']);
        }
      );
    })
  );

  it('should update status', () => {
    component.updateStatus({ heading: 'test', message: 'test message' });
    expect(component.status.heading).toBe('test');
    expect(component.status.message).toBe('test message');
  });
});
