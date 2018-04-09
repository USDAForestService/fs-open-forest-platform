import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationService } from '../../_services/application.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { AlertService } from '../../_services/alert.service';
import { UtilService } from '../../_services/util.service';
import { CancelApplicationComponent } from './cancel-application.component';
import { Observable } from 'rxjs/Observable';
import { CamelToHyphensPipe } from '../../_pipes/camel-to-hyphens.pipe';

@Component({
  selector: 'app-test-component-wrapper',
  template: '<app-cancel-application [application]="application"></app-cancel-application>'
})
class TestComponentWrapperComponent {
  application: any;

  constructor() {
    this.application = { type: 'noncommercial', status: 'Submitted' };
  }
}

class MockApplicationService {
  public user = { email: 'test@test.com', role: 'user' };
  update(value1, value2) {
    return Observable.of({ type: 'noncommercial', status: 'Cancelled' });
  }
}

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
          CamelToHyphensPipe,
          AlertService,
          UtilService
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponentWrapperComponent);
      component = fixture.debugElement.children[0].componentInstance;
      fixture.detectChanges();
      spyOn(window, 'confirm').and.returnValue(true);
      component.cancelApplication();
    })
  );
  it('should cancel an application', () => {
    expect(component.application.status).toEqual('Cancelled');
  });

  it('should update application status', () => {
    component.updateApplication();
    expect(component.application.status).toEqual('Cancelled');
  });
});
