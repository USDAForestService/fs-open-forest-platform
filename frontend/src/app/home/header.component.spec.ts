import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppButtonComponent } from './app-button.component';
import { AuthenticationService } from '../_services/authentication.service';
import { PageHeader } from './header.component';

class MockAuthenticationService {
  user = true;
}

describe('PageHeader Component', () => {
  let component: PageHeader;
  let fixture: ComponentFixture<PageHeader>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [PageHeader],
        providers: [{ provide: AuthenticationService, useClass: MockAuthenticationService }],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeader);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
