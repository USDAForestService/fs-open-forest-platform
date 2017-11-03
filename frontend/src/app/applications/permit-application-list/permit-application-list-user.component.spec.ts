import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MockBackend } from '@angular/http/testing';
import { PermitApplicationListComponent } from './permit-application-list.component';
import { ApplicationService } from './../../_services/application.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { SortArray } from './../../_pipes/sort-array.pipe';
import { HoursFromOrDate } from './../../_pipes/hours-from-or-date.pipe';
import { DaysToOrDate } from './../../_pipes/days-to-or-date.pipe';
import { SpacesToDashesPipe } from './../../_pipes/spaces-to-dashes.pipe';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../_services/alert.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { tempOutfitterMock } from '../../application-forms/temporary-outfitters/temp-outfitter-mock';
import * as moment from 'moment/moment';
import * as sinon from 'sinon';

describe('PermitApplicationListComponent', () => {
  let component: PermitApplicationListComponent;
  let fixture: ComponentFixture<PermitApplicationListComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [PermitApplicationListComponent, SortArray, HoursFromOrDate, DaysToOrDate, SpacesToDashesPipe],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        providers: [
          { provide: ApplicationService, useClass: MockService },
          { provide: AlertService, useClass: AlertService },
          { provide: XHRBackend, useClass: MockBackend },
          { provide: AuthenticationService, useClass: MockService }
        ],
        imports: [HttpModule, RouterTestingModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('use user values', () => {
    expect(component.holdText).toEqual('On hold');
    expect(component.reviewText).toEqual('In review');
    expect(component.warningMessage).toEqual('Applications with an ON HOLD status require additional information');
  });

  it('should throw error on get application', () => {
    component.getApplications('noncommercial');
    expect(component.apiErrors[0]).toEqual('Server Error');
  });
  it('should show attentionAlert()', () => {
    const now = moment();
    const date = moment(now, 'YYYY-MM-DDTHH:mm:ss').subtract(1, 'days');
    component.applications = [{ status: 'Hold', createdAt: date }, { status: 'Cancelled', createdAt: date }];
    expect(component.showAttentionAlert()).toBeTruthy();
    component.applications = [{ status: 'Cancelled', createdAt: date }, { status: 'Cancelled', createdAt: date }];
    expect(component.showAttentionAlert()).toBeFalsy();
  });
});
class MockService {
  isAdmin() {
    return false;
  }

  get(): Observable<{}> {
    return Observable.throw(['Server Error']);
  }

  handleStatusCode() {
    return true;
  }
}
