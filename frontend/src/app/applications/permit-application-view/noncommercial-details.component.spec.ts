import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoncommercialDetailsComponent } from './noncommercial-details.component';
import { Base64 } from '../../_pipes/base64.pipe';
import { UrlPipe } from '../../_pipes/url.pipe';
import { noncommercialMock } from '../../application-forms/application-noncommercial-group/noncommercial.mock';

@Pipe({ name: 'SortArray' })
class MockPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

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
