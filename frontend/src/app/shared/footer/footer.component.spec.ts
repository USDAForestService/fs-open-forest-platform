import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { PageFooterComponent } from './footer.component';

class MockAuthenticationService {
  user = true;
}

describe('PageFooter Component', () => {
  let component: PageFooterComponent;
  let fixture: ComponentFixture<PageFooterComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [PageFooterComponent],
        providers: [{ provide: AuthenticationService, useClass: MockAuthenticationService }],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFooterComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
