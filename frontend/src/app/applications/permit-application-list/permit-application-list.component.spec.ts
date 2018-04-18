import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PermitApplicationListComponent } from './permit-application-list.component';
import { ApplicationService } from './../../_services/application.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { SortArray } from './../../_pipes/sort-array.pipe';
import { HoursFromOrDate } from './../../_pipes/hours-from-or-date.pipe';
import { DaysToOrDate } from './../../_pipes/days-to-or-date.pipe';
import { SpacesToDashesPipe } from './../../_pipes/spaces-to-dashes.pipe';
import { AlertService } from '../../_services/alert.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import * as moment from 'moment/moment';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockService {
  isAdmin() {
    return true;
  }

  get(): Observable<{}> {
    return Observable.of();
  }

  handleStatusCode() {
    return true;
  }
}

describe('PermitApplicationListComponent', () => {
  let component: PermitApplicationListComponent;
  let fixture: ComponentFixture<PermitApplicationListComponent>;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [PermitApplicationListComponent, SortArray, HoursFromOrDate, DaysToOrDate, SpacesToDashesPipe],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        providers: [
          { provide: ApplicationService, useClass: MockService },
          { provide: AlertService, useClass: AlertService },
          { provide: Router, useValue: router },
          { provide: AuthenticationService, useClass: MockService }
        ],
        imports: [HttpClientTestingModule, RouterTestingModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return true if over two days old', () => {
    const now = moment();
    const date = moment(now, 'YYYY-MM-DDTHH:mm:ss').subtract(3, 'days');
    expect(component.isOverTwoDaysOld(date)).toBeTruthy();
  });

  it('should return false if less than two days old', () => {
    const now = moment();
    const date = moment(now, 'YYYY-MM-DDTHH:mm:ss').subtract(1, 'days');
    expect(component.isOverTwoDaysOld(date)).toBeFalsy();
  });

  it('should not show attention alert if there are no applications over 2 days old', () => {
    expect(component.showAttentionAlert()).toBeFalsy();
  });

  it('should show attention alert if there are no applications over 2 days old', () => {
    component.applications = [{ createdAt: '2017-08-14 11:52:52-05' }, { createdAt: '2017-08-14 11:52:52-05' }];
    expect(component.showAttentionAlert()).toBeTruthy();
  });

  it('should return true if start date is less than one week away', () => {
    const now = moment();
    const date = moment(now, 'YYYY-MM-DDTHH:mm:ss').add(6, 'days');
    expect(component.isWeekAwayOrPast(date)).toBeTruthy();
  });

  it('should return true if start date is past', () => {
    const now = moment();
    const date = moment(now, 'YYYY-MM-DDTHH:mm:ss').subtract(2, 'days');
    expect(component.isWeekAwayOrPast(date)).toBeTruthy();
  });

  it('should return false if start date more than a week away', () => {
    const now = moment();
    const date = moment(now, 'YYYY-MM-DDTHH:mm:ss').add(2, 'weeks');
    expect(component.isWeekAwayOrPast(date)).toBeFalsy();
  });

  it('should trigger function when status changes', () => {
    const event = { target: { value: 'returned' } };
    component.applicationStatusChange(event);
    expect(component.successMessage).toEqual(null);
    expect(component.applicationStatus).toEqual('returned');
  });

  it(
    'should cancel application',
    inject([AlertService], alert => {
      component.applicationStatus = 'Cancelled';
      component.applicationCancelled({});
      expect(alert.getSuccessMessage()).toBeFalsy();
    })
  );
});
