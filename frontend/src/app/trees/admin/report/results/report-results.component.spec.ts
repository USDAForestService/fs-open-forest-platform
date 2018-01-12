import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReportResultsComponent } from './report-results.component';

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
        sumOfCost: '100',
        permits: {}
      }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
