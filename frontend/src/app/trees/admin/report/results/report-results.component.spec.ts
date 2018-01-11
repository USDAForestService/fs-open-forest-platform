import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReportResultsComponent } from './report-results.component';

describe('NotFoundComponent', () => {
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
