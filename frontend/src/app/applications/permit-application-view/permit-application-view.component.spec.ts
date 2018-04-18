import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApplicationService } from '../../_services/application.service';
import { AlertService } from '../../_services/alert.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { PermitApplicationViewComponent } from './permit-application-view.component';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { MockActivatedRoute, MockRouter } from '../../_mocks/routes.mock';
import * as sinon from 'sinon';

class MockApplicationService {
  get(): Observable<{}> {
    return Observable.of();
  }

  getOne(err, obj): Observable<{}> {
    if (err && err.fail) {
      return Observable.throw('error');
    } else {
      return Observable.of({ test: 'meow' });
    }
  }

  update(obj): Observable<{}> {
    if (obj.fail) {
      return Observable.throw('error');
    } else {
      return Observable.of({ test: 'meow' });
    }
  }

  addSuccessMessage() {
    return true;
  }
  isAdmin() {
    return true;
  }
}

describe('PermitApplicationViewComponent', () => {
  let component: PermitApplicationViewComponent;
  let fixture: ComponentFixture<PermitApplicationViewComponent>;
  let mockActivatedRoute: MockActivatedRoute;
  let mockRouter: MockRouter;

  beforeEach(
    async(() => {
      mockActivatedRoute = new MockActivatedRoute({ id: '1', type: 'noncommercial' });
      mockRouter = new MockRouter();
      TestBed.configureTestingModule({
        declarations: [PermitApplicationViewComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: ApplicationService, useClass: MockApplicationService },
          { provide: AlertService, useClass: MockApplicationService },
          { provide: AuthenticationService, useClass: MockApplicationService },
          { provide: Router, useValue: mockRouter },
          { provide: ActivatedRoute, useValue: mockActivatedRoute }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitApplicationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should get one application', () => {
    const spy = sinon.spy(component.applicationService, 'getOne');
    component.getApplication('type', { fail: false });
    expect(spy.called).toBeTruthy();
  });

  it('Should handle error condition on application get', () => {
    const getSpy = sinon.spy(component.applicationService, 'getOne');
    component.getApplication('type', { fail: true });
    expect(getSpy.called).toBeTruthy();
    expect(component.apiErrors).toBeTruthy();
  });

  it('Should update application status', () => {
    const updateSpy = sinon.spy(component.applicationService, 'update');
    const alertSpy = sinon.spy(component.alertService, 'addSuccessMessage');
    component.updateApplicationStatus({ fail: false }, 'Accepted');
    expect(updateSpy.called).toBeTruthy();
    expect(alertSpy.called).toBeTruthy();
  });

  it('on error should call error condition', () => {
    const updateSpy = sinon.spy(component.applicationService, 'update');
    const alertSpy = sinon.spy(component.alertService, 'addSuccessMessage');
    component.updateApplicationStatus({ fail: true }, 'Accepted');
    expect(updateSpy.called).toBeTruthy();
    expect(alertSpy.called).toBeFalsy();
  });

  it('provideReasonOrCancel should set button text on accepted', () => {
    component.provideReasonOrCancel('Accepted');
    expect(component.reasonOrCancel.buttonClass).toEqual('usa-button-primary-alt');
  });

  it('provideReasonOrCancel should set button text on hold', () => {
    component.provideReasonOrCancel('Hold');
    expect(component.reasonOrCancel.buttonClass).toEqual('usa-button-primary');
  });

  it('provideReasonOrCancel should set button text on Rejected', () => {
    component.provideReasonOrCancel('Rejected');
    expect(component.reasonOrCancel.buttonClass).toEqual('usa-button-red');
  });

  it('provideReasonOrCancel should set button text on Review', () => {
    component.provideReasonOrCancel('Review');
    expect(component.reasonOrCancel.buttonClass).toEqual('usa-button-grey');
  });

  it('should set fixedCtas to false on enter', () => {
    component.enter();
    expect(component.fixedCtas).toBeFalsy();
  });

  it('should set fixedCtas to true on leave', () => {
    component.leave();
    expect(component.fixedCtas).toBeTruthy();
  });

  it(
    'should add messages when status changes',
    inject([AlertService], alert => {
      const alertSpy = sinon.spy(alert, 'addSuccessMessage');
      component.handleUpdateResponse('Accepted');
      component.handleUpdateResponse('Hold');
      component.handleUpdateResponse('Rejected');
      expect(alertSpy.calledThrice).toBeTruthy();
      component.handleUpdateResponse('Cancelled');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['admin/applications']);
    })
  );

  it('should redirect on application cancel', () => {
    component.applicationCancelled(component.application);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['user/applications']);
  });
});
