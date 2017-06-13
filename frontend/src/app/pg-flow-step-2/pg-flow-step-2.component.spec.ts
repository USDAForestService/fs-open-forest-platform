import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PgFlowStep2Component } from './pg-flow-step-2.component';

describe('PgFlowStep2Component', () => {
  let component: PgFlowStep2Component;
  let fixture: ComponentFixture<PgFlowStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgFlowStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgFlowStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
