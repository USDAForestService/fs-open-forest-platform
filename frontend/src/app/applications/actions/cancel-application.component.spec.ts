import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, TestBed, getTestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { ApplicationService } from '../../_services/application.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { AlertService } from '../../_services/alert.service';
import { CancelApplicationComponent } from './cancel-application.component';
import { Observable } from 'rxjs/Observable';

describe('Cancel application', () => {
  let component: CancelApplicationComponent;
  let fixture: ComponentFixture<TestComponentWrapperComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [CancelApplicationComponent, TestComponentWrapperComponent],
        providers: [
          { provide: ApplicationService, useClass: MockApplicationService },
          { provide: AuthenticationService, useClass: MockApplicationService },
          AlertService
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponentWrapperComponent);
      component = fixture.debugElement.children[0].componentInstance;
      fixture.detectChanges();
    })
  );
  it('should update application status', () => {
    component.updateApplication();
    expect(component.application.status).toEqual('Cancelled');
  });
});

@Component({
  selector: 'app-test-component-wrapper',
  template: '<app-cancel-application [application]="application"></app-cancel-application>'
})
class TestComponentWrapperComponent {
  application: any;

  constructor() {
    this.application = { type: 'noncommercial', status: 'Received' };
  }
}

class MockApplicationService {
  public user = { email: 'test@test.com', role: 'user' };
  update(value1, value2) {
    return Observable.of({ type: 'noncommercial', status: 'Cancelled' });
  }
}
