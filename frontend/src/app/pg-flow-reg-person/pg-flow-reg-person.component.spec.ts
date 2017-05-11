import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PgFlowRegPersonComponent } from './pg-flow-reg-person.component';

describe('PgFlowRegPersonComponent', () => {
  let component: PgFlowRegPersonComponent;
  let fixture: ComponentFixture<PgFlowRegPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgFlowRegPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgFlowRegPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
