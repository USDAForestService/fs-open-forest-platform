import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, TestBed, getTestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivityDescriptionComponent } from './activity-description.component';

describe('fax', () => {
  let component: ActivityDescriptionComponent;
  let fixture: ComponentFixture<TestComponentWrapperComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ActivityDescriptionComponent, TestComponentWrapperComponent],
        providers: [FormBuilder],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponentWrapperComponent);
      component = fixture.debugElement.children[0].componentInstance;
      fixture.detectChanges();
    })
  );


});

@Component({
  selector: 'app-test-component-wrapper',
  template: '<app-fax [parentForm]="applicationForm"></app-fax>'
})
class TestComponentWrapperComponent {
  applicationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.applicationForm = this.formBuilder.group({});
  }
}
