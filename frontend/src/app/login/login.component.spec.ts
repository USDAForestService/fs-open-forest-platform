import { AuthenticationService } from './../_services/authentication.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginComponent } from './login.component';
import { MockActivatedRoute, MockRouter } from '../_mocks/routes.mock';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: MockRouter;

  beforeEach(
    async(() => {
      mockRouter = new MockRouter();
      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        providers: [AuthenticationService, FormBuilder, { provide: Router, useValue: mockRouter }],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
