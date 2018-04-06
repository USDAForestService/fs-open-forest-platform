import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from '../_services/authentication.service';
import { LoggedInComponent } from './logged-in.component';
import { MockRouter } from '../_mocks/routes.mock';
import { Observable } from 'rxjs/Observable';

import { Router } from '@angular/router';

class MockAuthenticationService {
  getAuthenticatedUser(): Observable<{}> {
    return Observable.of({ role: 'admin' });
  }
  setUser(obj) {
    return '';
  }
}

describe('LoggedInComponent', () => {
  let component: LoggedInComponent;
  let fixture: ComponentFixture<LoggedInComponent>;
  let mockRouter: MockRouter;

  beforeEach(
    async(() => {
      mockRouter = new MockRouter();
      TestBed.configureTestingModule({
        declarations: [LoggedInComponent],
        providers: [
          { provide: Router, useValue: mockRouter },
          { provide: AuthenticationService, useClass: MockAuthenticationService }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('It should redirect if user is admin', () => {
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin/applications']);
  });

  it('should redirect if requestingUrl is set in local storage', () => {
    localStorage.setItem('requestingUrl', '/test');
    component.ngOnInit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/test']);
  });
});
