import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, TestBed, getTestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { ApplicationService } from '../../_services/application.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { AlertService } from '../../_services/alert.service';
import { UtilService } from '../../_services/util.service';
import { RevisionHistoryComponent } from './revision-history.component';
import { Observable } from 'rxjs/Observable';
import { SortArray } from '../../_pipes/sort-array.pipe';
import { Pipe, PipeTransform } from '@angular/core';
import { tempOutfitterMock } from '../../application-forms/temporary-outfitters/temp-outfitter.mock';

@Pipe({ name: 'SortArray' })
class MockPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

describe('RevisionHistoryComponent', () => {
  let component: RevisionHistoryComponent;
  let fixture: ComponentFixture<RevisionHistoryComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [RevisionHistoryComponent, MockPipe],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(RevisionHistoryComponent);
      component = fixture.debugElement.children[0].componentInstance;
      component.application = tempOutfitterMock;
      fixture.detectChanges();
    })
  );
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
