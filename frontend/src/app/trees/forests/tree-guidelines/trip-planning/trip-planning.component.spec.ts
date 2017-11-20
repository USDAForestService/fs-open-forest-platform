import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPlanningComponent } from './trip-planning.component';
import { TreesService } from '../../../_services/trees.service';
import { MockBackend } from '@angular/http/testing';

describe('TripPlanningComponent', () => {
  let component: TripPlanningComponent;
  let fixture: ComponentFixture<TripPlanningComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TripPlanningComponent],
        providers: [{ provide: TreesService, use: MockBackend }]
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
