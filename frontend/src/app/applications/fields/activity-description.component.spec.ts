import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, TestBed, getTestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ActivityDescriptionComponent } from './activity-description.component';

describe('activity description', () => {
  let component: ActivityDescriptionComponent;
  let fixture: ComponentFixture<TestComponentWrapperComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ActivityDescriptionComponent, TestComponentWrapperComponent],
        providers: [FormBuilder, { provide: ApplicationFieldsService, useClass: MockApplicationFieldsService }],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponentWrapperComponent);
      component = fixture.debugElement.children[0].componentInstance;
      fixture.detectChanges();
    })
  );
  it('should include a default date status', () => {
    const dateStatus = {
      startDateTimeValid: true,
      endDateTimeValid: true,
      startBeforeEnd: true,
      startAfterToday: true,
      hasErrors: false,
      dateTimeSpan: 0
    };
    expect(component.dateStatus).toEqual(dateStatus);
  });

  it('should update date status', () => {
    const dateStatus = {
      startDateTimeValid: false,
      endDateTimeValid: false,
      startBeforeEnd: false,
      startAfterToday: true,
      hasErrors: false,
      dateTimeSpan: 0
    };
    component.updateDateStatus(dateStatus);
    expect(component.dateStatus.startDateTimeValid).toBeFalsy();
  });
});

@Component({
  selector: 'app-test-component-wrapper',
  template: '<app-activity-description [parentForm]="applicationForm"></app-activity-description>'
})
class TestComponentWrapperComponent {
  applicationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.applicationForm = this.formBuilder.group({});
  }
}

class MockApplicationFieldsService {
  simpleRequireToggle(value1, value2) {
    return true;
  }
}
