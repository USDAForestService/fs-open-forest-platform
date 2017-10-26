import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AlertService } from '../../_services/alert.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as sinon from 'sinon';
import { ApplicationNoncommercialGroupComponent } from './application-noncommercial-group.component';
import { ApplicationService } from '../../_services/application.service';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { noncommercialMock } from './noncommercial-mock';

describe('Noncommercial with mock application service', () => {
  let component: ApplicationNoncommercialGroupComponent;
  let fixture: ComponentFixture<ApplicationNoncommercialGroupComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ApplicationNoncommercialGroupComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: ApplicationService, useClass: MockApplicationService },
          { provide: ApplicationFieldsService, useClass: ApplicationFieldsService },
          { provide: FormBuilder, useClass: FormBuilder },
          AlertService,
          AuthenticationService
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

  it('should return application', () => {
    component.getApplication(111);
    expect(component.apiErrors).toEqual('The application could not be found.');
    component.getApplication('111');
    expect(component.applicationForm.get('appControlNumber').value).toEqual('a309fe16-47a4-4da7-a293-9697d438815f');
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

  handleStatusCode(e) {
    return e;
  }

  get(): Observable<{}> {
    return Observable.of();
  }

  create(): Observable<{}> {
    return Observable.of();
  }

  update(): Observable<{}> {
    return Observable.of();
  }
}
