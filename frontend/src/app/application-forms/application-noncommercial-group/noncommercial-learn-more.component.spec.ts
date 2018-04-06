import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoncommercialLearnMoreComponent } from './noncommercial-learn-more.component';
import { UtilService } from '../../_services/util.service';

describe('NoncommercialLearnMoreComponent', () => {
  let component: NoncommercialLearnMoreComponent;
  let fixture: ComponentFixture<NoncommercialLearnMoreComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [NoncommercialLearnMoreComponent],
        providers: [UtilService],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NoncommercialLearnMoreComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
