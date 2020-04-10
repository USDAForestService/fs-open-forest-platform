import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MapUrlComponent } from './map-url.component';
import { urlValidator } from '../validators/url-validation';
import { ApplicationFieldsService } from '../_services/application-fields.service';

describe('MapUrlComponent', () => {
  let component: MapUrlComponent;
  let fixture: ComponentFixture<MapUrlComponent>;
  let formBuilder: FormBuilder;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MapUrlComponent],
        providers: [FormBuilder, ApplicationFieldsService],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
      formBuilder = new FormBuilder();
      fixture = TestBed.createComponent(MapUrlComponent);
      component = fixture.debugElement.componentInstance;
      component.applicantInfo = formBuilder.group({
        mapUrl: ['', [urlValidator()]]
      });
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be valid', () => {
    const field = component.applicantInfo.controls.mapUrl;
    expect(field.valid).toBeTruthy();
    field.setValue('test');
    expect(field.valid).toBeFalsy();
    field.setValue('http://www.test.com');
    expect(field.valid).toBeTruthy();
  });
});
