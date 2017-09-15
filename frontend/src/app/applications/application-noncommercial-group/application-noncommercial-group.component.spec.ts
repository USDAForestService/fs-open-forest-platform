import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as sinon from 'sinon';
import { ApplicationNoncommercialGroupComponent } from './application-noncommercial-group.component';
'./temporary-outfitters.component';
import { ApplicationService } from '../../_services/application.service';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';

describe('ApplicationNoncommercialGroupComponent', () => {
  let component: ApplicationNoncommercialGroupComponent;
  let fixture: ComponentFixture<ApplicationNoncommercialGroupComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ApplicationNoncommercialGroupComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: ApplicationService, useClass: MockApplicationService },
          { provide: ApplicationFieldsService, useClass: MockApplicationService },
          { provide: FormBuilder, useClass: FormBuilder }
        ],
        imports: [RouterTestingModule, HttpModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationNoncommercialGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call orgTypeChange if org type is changed', () => {
    let spy = sinon.spy(component, 'orgTypeChange');
    component.applicationForm.get('applicantInfo.orgType').setValue('Corporation');
    expect(spy.calledOnce).toBeTruthy();
  });

  it('should update date status', () => {
    component.updateDateStatus({
      startDateTimeValid: false,
      endDateTimeValid: false,
      startBeforeEnd: false,
      startAfterToday: false,
      hasErrors: false
    });
    component.dateStatus = {
      startDateTimeValid: false,
      endDateTimeValid: false,
      startBeforeEnd: false,
      startAfterToday: false,
      hasErrors: false
    };
  });

  it('should submit the application', () => {
    component.onSubmit(component.applicationForm);
    expect(component.submitted).toBeTruthy();
  });
});

class MockApplicationService {
  spy = sinon.spy();

  get(): Observable<{}> {
    return Observable.of();
  }

  creat(): Observable<{}> {
    return Observable.of();
  }

  touchAllFields = () => {};
  scrollToFirstError = () => {};
  removeAddress = this.spy;
}
