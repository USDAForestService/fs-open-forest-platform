import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationService } from '../../_services/application.service';
import { TempOutfitterDetailsComponent } from './temp-outfitter-details.component';
import { Observable } from 'rxjs/Observable';
import { Base64 } from '../../_pipes/base64.pipe';
import { UrlPipe } from '../../_pipes/url.pipe';
import { tempOutfitterMock } from '../../application-forms/temporary-outfitters/temp-outfitter.mock';

@Pipe({ name: 'SortArray' })
class MockPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

class MockApplicationService {
  get(): Observable<{}> {
    const array = [
      { documentType: 'acknowledgement-of-risk-form', originalFileName: 'test1' },
      { documentType: 'good-standing-evidence', originalFileName: 'test2' },
      { documentType: 'insurance-certificate', originalFileName: 'test3' },
      { documentType: 'guide-document', originalFileName: 'test4' },
      { documentType: 'operating-plan', originalFileName: 'test5' }
    ];
    return Observable.of(array);
  }
}

describe('TempOutfitterDetailsComponent', () => {
  let component: TempOutfitterDetailsComponent;
  let fixture: ComponentFixture<TempOutfitterDetailsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TempOutfitterDetailsComponent, MockPipe, Base64, UrlPipe],
        providers: [{ provide: ApplicationService, useClass: MockApplicationService }],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(TempOutfitterDetailsComponent);
      component = fixture.debugElement.children[0].componentInstance;
      component.application = tempOutfitterMock;
      fixture.detectChanges();
    })
  );
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
