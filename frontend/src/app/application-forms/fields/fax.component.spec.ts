import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FaxComponent } from './fax.component';
import { ApplicationFieldsService } from '../_services/application-fields.service';

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

describe('fax', () => {
  let component: FaxComponent;
  let fixture: ComponentFixture<TestComponentWrapperComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [FaxComponent, TestComponentWrapperComponent],
        providers: [FormBuilder, ApplicationFieldsService],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponentWrapperComponent);
      component = fixture.debugElement.children[0].componentInstance;
      fixture.detectChanges();
    })
  );

  it('should be valid if no data is entered', () => {
    expect(component.fax.valid).toBeTruthy();
  });

  it('should be valid if just ten digit is entered', () => {
    component.fax.controls['tenDigit'].setValue('2222222222');
    expect(component.fax.valid).toBeTruthy();
  });

  it('should be invalid if extension is entered but not ten digit', () => {
    component.fax.controls['extension'].setValue('333');
    expect(component.fax.invalid).toBeTruthy();
  });

  it('should be invalid if extension is more than 6 chars', () => {
    component.fax.controls['extension'].setValue('3334444');
    expect(component.fax.invalid).toBeTruthy();
    component.fax.controls['extension'].setValue('');
    expect(component.fax.valid).toBeTruthy();
  });
});
