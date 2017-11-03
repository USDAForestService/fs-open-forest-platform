import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, TestBed, getTestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { ApplicationService } from '../../_services/application.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { AlertService } from '../../_services/alert.service';
import { UtilService } from '../../_services/util.service';
import { NoncommercialDetailsComponent } from './noncommercial-details.component';
import { Observable } from 'rxjs/Observable';
import { Pipe, PipeTransform } from '@angular/core';
import { Base64 } from '../../_pipes/base64.pipe';
import { UrlPipe } from '../../_pipes/url.pipe';
import { environment } from '../../../environments/environment';
import { noncommercialMock } from '../../application-forms/application-noncommercial-group/noncommercial-mock';

describe('TempOutfitterDetailsComponent', () => {
  let component: NoncommercialDetailsComponent;
  let fixture: ComponentFixture<NoncommercialDetailsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [NoncommercialDetailsComponent, MockPipe, Base64, UrlPipe],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(NoncommercialDetailsComponent);
      component = fixture.debugElement.children[0].componentInstance;
      component.application = noncommercialMock;
      fixture.detectChanges();
    })
  );
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Pipe({ name: 'SortArray' })
class MockPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}
