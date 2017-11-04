import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationSubmittedComponent } from './application-submitted.component';
import { HttpModule } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MockActivatedRoute, MockRouter } from '../../_mocks/routes.mock';
import { Observable } from 'rxjs/Observable';
import { noncommercialMock } from '../application-noncommercial-group/noncommercial-mock';
import { ApplicationService } from '../../_services/application.service';

describe('ApplicationSubmittedComponent', () => {
  let component: ApplicationSubmittedComponent;
  let fixture: ComponentFixture<ApplicationSubmittedComponent>;
  let mockActivatedRoute: MockActivatedRoute;
  let mockRouter: MockRouter;

  beforeEach(
    async(() => {
      mockActivatedRoute = new MockActivatedRoute({ test: 'route' });
      mockRouter = new MockRouter();
      TestBed.configureTestingModule({
        declarations: [ApplicationSubmittedComponent],
        providers: [
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
          { provide: Router, useValue: mockRouter },
          { provide: ApplicationService, useClass: MockApplicationService }
        ],
        imports: [HttpModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

export class MockApplicationService {
  getOne(id): Observable<{}> {
    if (id === '111') {
      return Observable.of(noncommercialMock);
    } else {
      return Observable.throw(['Server Error']);
    }
  }
}
