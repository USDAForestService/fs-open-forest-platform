import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PgFlowStep1Component } from './pg-flow-step-1.component';

describe('PgFlowStep1Component', () => {
  let component: PgFlowStep1Component;
  let fixture: ComponentFixture<PgFlowStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgFlowStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgFlowStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
