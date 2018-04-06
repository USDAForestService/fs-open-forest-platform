import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RevisionHistoryComponent } from './revision-history.component';
import { SortArray } from '../../_pipes/sort-array.pipe';
import { AdminUserFormatterPipe } from '../../_pipes/admin-user-formatter.pipe';
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
        declarations: [RevisionHistoryComponent, MockPipe, AdminUserFormatterPipe],
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
