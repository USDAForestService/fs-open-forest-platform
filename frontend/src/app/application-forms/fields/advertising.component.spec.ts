import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdvertisingComponent } from './advertising.component';
import { tempOutfitterMock } from '../temporary-outfitters/temp-outfitter-mock';

describe('Advertising Component', () => {
  let component: AdvertisingComponent;
  let fixture: ComponentFixture<TestComponentWrapperComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AdvertisingComponent, TestComponentWrapperComponent],
        providers: [FormBuilder],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'app-test-component-wrapper',
  template: '<app-advertising [tempOutfitterFields]="applicationForm"></app-advertising>'
})
class TestComponentWrapperComponent {
  applicationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.applicationForm = this.formBuilder.group({
      advertisingDescription: [''],
      advertisingURL: [''],
      noPromotionalWebsite: ['']
    });
  }
}

class MockApplicationFieldsService {
  simpleRequireToggle(value1, value2) {
    return true;
  }
}
