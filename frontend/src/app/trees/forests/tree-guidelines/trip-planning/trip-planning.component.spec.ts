import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TripPlanningComponent } from './trip-planning.component';
import { MockBackend } from '@angular/http/testing';
import { UtilService } from '../../../../_services/util.service';

describe('TripPlanningComponent', () => {
  let component: TripPlanningComponent;
  let fixture: ComponentFixture<TripPlanningComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TripPlanningComponent],
        providers: [{ provide: UtilService }],
        schemas: [NO_ERRORS_SCHEMA]
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
