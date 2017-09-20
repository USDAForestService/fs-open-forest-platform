import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MockBackend } from '@angular/http/testing';
import { PermitApplicationListComponent } from './permit-application-list.component';
import { ApplicationService } from './../../_services/application.service';
import { SortArray } from './../../_pipes/sort-array.pipe';
import { HoursFromOrDate } from './../../_pipes/hours-from-or-date.pipe';
import { DaysToOrDate } from './../../_pipes/days-to-or-date.pipe';
import { SpacesToDashesPipe } from './../../_pipes/spaces-to-dashes.pipe';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../_services/alert.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import * as moment from 'moment/moment';
import * as sinon from 'sinon';

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
          { provide: ApplicationService, useClass: ApplicationService },
          AlertService,
          { provide: XHRBackend, useClass: MockBackend },
          { provide: Router, useValue: router }
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

  it('should return true if we are past deadline', () => {
    const now = moment();
    const startDateTime = moment(now, 'YYYY-MM-DDTHH:mm:ss').add(1, 'weeks');
    expect(component.isApproachingBeginDateTime(startDateTime)).toBeTruthy();
  });

  it('should return false if we are prior to deadline', () => {
    const now = moment();
    const startDateTime = moment(now, 'YYYY-MM-DDTHH:mm:ss').add(3, 'weeks');
    expect(component.isApproachingBeginDateTime(startDateTime)).toBeFalsy();
  });

  it('should return true if now is past date', () => {
    const now = moment();
    const date = moment(now, 'YYYY-MM-DDTHH:mm:ss').subtract(1, 'weeks');
    expect(component.isPastDate(date)).toBeTruthy();
  });

  it('should return false if now is not past date', () => {
    const now = moment();
    const date = moment(now, 'YYYY-MM-DDTHH:mm:ss').add(1, 'weeks');
    expect(component.isPastDate(date)).toBeFalsy();
  });

  it('should return true if over one day old', () => {
    const now = moment();
    const date = moment(now, 'YYYY-MM-DDTHH:mm:ss').subtract(2, 'days');
    expect(component.isOverOneDayOld(date)).toBeTruthy();
  });

  it('should return false if less than one day old', () => {
    const now = moment();
    const date = moment(now, 'YYYY-MM-DDTHH:mm:ss').subtract(1, 'hours');
    expect(component.isOverOneDayOld(date)).toBeFalsy();
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

  it(
    'should handle status code',
    inject([ApplicationService], service => {
      service.handleStatusCode(403);
      expect(router.navigate).toHaveBeenCalledWith(['access-denied']);
    })
  );

  it('should trigger function when status changes', () => {
    const event = { target: { value: 'returned' } };
    component.applicationStatusChange(event);
    expect(component.applicationStatus).toEqual('returned');
  });
});
