import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as sinon from 'sinon';
import { ApplicationNoncommercialGroupComponent } from './application-noncommercial-group.component';
import { ApplicationService } from '../../_services/application.service';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { AlertService } from '../../_services/alert.service';
import { AuthenticationService } from '../../_services/authentication.service';

describe('ApplicationNoncommercialGroupComponent', () => {
  let component: ApplicationNoncommercialGroupComponent;
  let fixture: ComponentFixture<ApplicationNoncommercialGroupComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ApplicationNoncommercialGroupComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: ApplicationService, useClass: ApplicationService },
          { provide: ApplicationFieldsService, useClass: MockApplicationFieldsService },
          { provide: FormBuilder, useClass: FormBuilder },
          { provide: XHRBackend, useClass: MockBackend },
          AlertService,
          AuthenticationService
        ],
        imports: [RouterTestingModule, HttpModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationNoncommercialGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call orgTypeChange if org type is changed', () => {
    const spy = sinon.spy(component, 'orgTypeChange');
    component.applicationForm.get('applicantInfo.orgType').setValue('Person');
    component.applicationForm.get('applicantInfo.orgType').setValue('Corporation');
    expect(spy.calledTwice).toBeTruthy();
  });

  it('should call addRemoveAddress if primary is same as secondary checkbox is checked', () => {
    const spy = sinon.spy(component, 'addRemoveAddress');
    component.applicationForm.get('applicantInfo.secondaryAddressSameAsPrimary').setValue(false);
    component.applicationForm.get('applicantInfo.secondaryAddressSameAsPrimary').setValue(true);
    component.applicationForm.get('applicantInfo.primaryAddressSameAsOrganization').setValue(false);
    component.applicationForm.get('applicantInfo.primaryAddressSameAsOrganization').setValue(true);
    expect(spy.callCount).toEqual(4);
  });

  it('should call addSecondaryPermitHolder if addSecondaryPermitHolder field is changed', () => {
    const spy = sinon.spy(component, 'addSecondaryPermitHolder');
    component.applicationForm.get('applicantInfo.addSecondaryPermitHolder').setValue(true);
    component.applicationForm.get('applicantInfo.addSecondaryPermitHolder').setValue(false);
    expect(spy.calledTwice).toBeTruthy();
  });

  it('should update date status', () => {
    component.updateDateStatus({
      startDateTimeValid: false,
      endDateTimeValid: false,
      startBeforeEnd: false,
      startAfterToday: false,
      hasErrors: false
    });
    expect(component.dateStatus.startDateTimeValid).toBeFalsy();
  });

  it('should submit the application', () => {
    component.onSubmit(component.applicationForm);
    expect(component.submitted).toBeTruthy();
  });

  it('should remove unused data', () => {
    component.removeUnusedData();
    component.applicationForm.get('applicantInfo.orgType').setValue('Person');
    expect(component.applicationForm.get('applicantInfo.organizationAddress')).toBeFalsy();
    expect(component.applicationForm.get('applicantInfo.organizationName').value).toEqual('');
    expect(component.applicationForm.get('applicantInfo.website').value).toEqual('');
    component.applicationForm.get('applicantInfo.orgType').setValue('Corporation');
    component.removeUnusedData();
    expect(component.applicationForm.get('applicantInfo.primaryAddress')).toBeFalsy();
    component.applicationForm.get('applicantInfo.secondaryAddressSameAsPrimary').setValue(true);
    expect(component.applicationForm.get('applicantInfo.secondaryAddress')).toBeFalsy();
    component.applicationForm.get('applicantInfo.addAdditionalPhone').setValue(true);
    expect(component.applicationForm.get('applicantInfo.eveningPhone')).toBeFalsy();
  });

  it(
    'should create a new application',
    inject([ApplicationService, XHRBackend], (service, mockBackend) => {
      const mockResponse = { eventName: 'test', id: '123' };
      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              body: JSON.stringify(mockResponse)
            })
          )
        );
      });

      service.create().subscribe(data => {
        expect(data.eventName).toBe('test');
      });
    })
  );
});

class MockApplicationFieldsService {
  get(): Observable<{}> {
    return Observable.of();
  }

  scrollToFirstError() {
    return false;
  }

  touchAllFields() {
    return false;
  }

  create(): Observable<{}> {
    return Observable.of();
  }
}
