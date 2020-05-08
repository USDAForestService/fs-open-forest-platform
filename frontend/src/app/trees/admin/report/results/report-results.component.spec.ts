import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReportResultsComponent } from './report-results.component';
import * as sinon from 'sinon';

describe('ReportResultsComponent', () => {
  let component: ReportResultsComponent;
  let fixture: ComponentFixture<ReportResultsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ReportResultsComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportResultsComponent);
    component = fixture.debugElement.componentInstance;
    component.result = {
      parameters: {
        forestName: 'Mt. Hood National Forest',
        startDate: '10/10/2018',
        endDate: '10/10/2019',
        sumOfTrees: '12',
        sumOfCost: '100'
      },
      permits: [{ permitNumber: '11', quantity: 2, totalCost: '20.00', issueDate: '01/11/2018' }]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go into downloadReport', () => {
    const spy = sinon.spy(component, 'downloadReport');
    component.downloadReport();
    expect(spy.calledOnce).toBeTruthy();
  });

  it('should set permits on changes', () => {
    component.result = {
      parameters: {
        forestName: 'Mt. Hood National Forest',
        startDate: '10/10/2018',
        endDate: '10/10/2019',
        sumOfTrees: '12',
        sumOfCost: '100'
      },
      permits: [{ permitNumber: '112', quantity: 8, totalCost: '40.00', issueDate: '01/11/2018' }]
    };
    component.ngOnChanges();
    expect(component.permits[1].permitNumber).toEqual('112');
  });
});
