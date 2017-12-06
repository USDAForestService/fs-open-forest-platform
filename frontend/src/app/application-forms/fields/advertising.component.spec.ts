import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdvertisingComponent } from './advertising.component';
import { tempOutfitterMock } from '../temporary-outfitters/temp-outfitter.mock';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { TestService } from '../../_services/test.service';

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

describe('Advertising Component', () => {
  let component: AdvertisingComponent;
  let fixture: ComponentFixture<TestComponentWrapperComponent>;
  let testService: TestService;

  beforeEach(
    async(() => {
      testService = new TestService();
      testService.configureTestingModule(
        [AdvertisingComponent, TestComponentWrapperComponent],
        [FormBuilder, ApplicationFieldsService]
      );
      fixture = TestBed.createComponent(TestComponentWrapperComponent);
      component = fixture.debugElement.children[0].componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
