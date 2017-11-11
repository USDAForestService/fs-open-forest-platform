import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPlanningComponent } from './trip-planning.component';

describe('TripPlanningComponent', () => {
  let component: TripPlanningComponent;
  let fixture: ComponentFixture<TripPlanningComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TripPlanningComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TripPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
