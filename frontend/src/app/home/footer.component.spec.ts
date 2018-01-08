import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppButtonComponent } from './app-button.component';
import { AuthenticationService } from '../_services/authentication.service';
import { PageHeader } from './header.component';
import { PageFooter } from './footer.component';

class MockAuthenticationService {
  user = true;
}

describe('PageFooter Component', () => {
  let component: PageFooter;
  let fixture: ComponentFixture<PageFooter>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [PageFooter],
        providers: [{ provide: AuthenticationService, useClass: MockAuthenticationService }],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFooter);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
