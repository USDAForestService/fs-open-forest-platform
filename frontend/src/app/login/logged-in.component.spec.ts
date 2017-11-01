import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from '../_services/authentication.service';
import { LoggedInComponent } from './logged-in.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockRouter } from '../_mocks/routes.mock';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ActivatedRoute, Router } from '@angular/router';
import { Type } from '@angular/core';

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

class MockAuthenticationService {
  getAuthenticatedUser(): Observable<{}> {
    return Observable.of({ role: 'admin' });
  }
}
