import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApplicationService } from '../../_services/application.service';
import { AlertService } from '../../_services/alert.service';
import { PermitApplicationViewComponent } from './permit-application-view.component';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import * as sinon from 'sinon';

describe('PermitApplicationViewComponent', () => {
  let component: PermitApplicationViewComponent;
  let fixture: ComponentFixture<PermitApplicationViewComponent>;
  let alertService: AlertService;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [PermitApplicationViewComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: ApplicationService, useClass: MockApplicationService },
          { provide: AlertService, useClass: MockApplicationService }
        ],
        imports: [RouterTestingModule]
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
    const errorSpy = sinon.spy(component.applicationService, 'handleStatusCode');
    component.getApplication('type', { fail: true });
    expect(getSpy.called).toBeTruthy();
    expect(component.errorMessage).toEqual('The application could not be found.');
    expect(errorSpy.called).toBeTruthy();
  });

  it('Should update application status', () => {
    const updateSpy = sinon.spy(component.applicationService, 'update');
    const alertSpy = sinon.spy(component.alertService, 'addSuccessMessage');
    const errorSpy = sinon.spy(component.applicationService, 'handleStatusCode');
    component.updateApplicationStatus({ fail: false }, 'Accepted');
    expect(updateSpy.called).toBeTruthy();
    expect(alertSpy.called).toBeTruthy();
    expect(errorSpy.called).toBeFalsy();
  });

  it('on error should call error condition', () => {
    const updateSpy = sinon.spy(component.applicationService, 'update');
    const errorSpy = sinon.spy(component.applicationService, 'handleStatusCode');
    const alertSpy = sinon.spy(component.alertService, 'addSuccessMessage');
    component.updateApplicationStatus({ fail: true }, 'Accepted');
    expect(updateSpy.called).toBeTruthy();
    expect(alertSpy.called).toBeFalsy();
    expect(errorSpy.called).toBeTruthy();
  });

  it('provideReasonOrCancel should set button text on accepted', () => {
    component.provideReasonOrCancel('Accepted');
    expect(component.reasonOrCancel.buttonClass).toEqual('usa-button-primary-alt');
  });

  it('provideReasonOrCancel should set button text on hold', () => {
    component.provideReasonOrCancel('Hold');
    expect(component.reasonOrCancel.buttonClass).toEqual('usa-button');
  });

  it('provideReasonOrCancel should set button text on Returned', () => {
    component.provideReasonOrCancel('Returned');
    expect(component.reasonOrCancel.buttonClass).toEqual('usa-button-secondary');
  });

  it('should set fixedCtas to false on enter', () => {
    component.enter();
    expect(component.fixedCtas).toBeFalsy();
  });

  it('should set fixedCtas to true on leave', () => {
    component.leave();
    expect(component.fixedCtas).toBeTruthy();
  });

  it('should add messages when status changes', () => {
    const alertSpy = sinon.spy(component.alertService, 'addSuccessMessage');
    component.handleUpdateResponse('Accepted');
    component.handleUpdateResponse('Hold');
    component.handleUpdateResponse('Returned');
    expect(alertSpy.calledThrice).toBeTruthy();
  });
});

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

  handleStatusCode() {
    return true;
  }

  addSuccessMessage() {
    return true;
  }
}
