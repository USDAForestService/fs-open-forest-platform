import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthenticatedComponent } from './authenticated.component';
import { AuthenticationService } from '../_services/authentication.service';
import { environment } from '../../environments/environment';

describe('AuthenticatedComponent', () => {
  let component: AuthenticatedComponent;
  let fixture: ComponentFixture<AuthenticatedComponent>;
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AuthenticatedComponent],
        providers: [{ provide: AuthenticationService, useClass: MockAuthenticationService }],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatedComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should logout',
    inject([AuthenticationService], service => {
      component.logout(new Event('click'));
      expect(service.user).toEqual(null);
    })
  );
});

class MockAuthenticationService {
  user = true;

  removeUser() {
    this.user = null;
  }
}
