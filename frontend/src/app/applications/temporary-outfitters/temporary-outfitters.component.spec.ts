import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as sinon from 'sinon';
import { TemporaryOutfittersComponent } from './temporary-outfitters.component';
import { ApplicationService } from '../../_services/application.service';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';


describe('TemporaryOutfittersComponent', () => {
  let component: TemporaryOutfittersComponent;
  let fixture: ComponentFixture<TemporaryOutfittersComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TemporaryOutfittersComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: ApplicationService, useClass: MockApplicationService },
          { provide: ApplicationFieldsService },
          { provide: FormBuilder, useClass: FormBuilder}
        ],
        imports: [RouterTestingModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporaryOutfittersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('Should switch on org type', () => {
    const orgTypes = {
      'Person': {
        pointOfView: 'I',
        orgTypeFileUpload: false,
        goodStandingEvidence: null
      },
      'Corporation': {
        pointOfView: 'We',
        orgTypeFileUpload: true,
        goodStandingEvidence: [Validators.required]
      },
      'Limited Liability Company (LLC)': {
        pointOfView: 'We',
        orgTypeFileUpload: true,
        goodStandingEvidence: [Validators.required]
      },
      'Limited Liability Partnership (LLP)': {
        pointOfView: 'We',
        orgTypeFileUpload: true,
        goodStandingEvidence: [Validators.required]
      },
      'State Government': {
        pointOfView: 'We',
        orgTypeFileUpload: false,
        goodStandingEvidence: null
      },
      'Local Govt': {
        pointOfView: 'We',
        orgTypeFileUpload: false,
        goodStandingEvidence: null
      },
      'Nonprofit': {
        pointOfView: 'We',
        orgTypeFileUpload: true,
        goodStandingEvidence: [Validators.required]
      }
    };
    for ( const type of Object.keys(orgTypes) ) {
      const orgFields = orgTypes[type];

      const get = sinon.stub(component.applicationForm, 'get').returns(
        {
        setValidators: required => { expect(required).toEqual(orgFields.goodStandingEvidence) }
        }
      );
      component.orgTypeChange(type);
      expect(component.pointOfView).toEqual(orgFields.pointOfView);
      expect(component.orgTypeFileUpload).toEqual(orgFields.orgTypeFileUpload);
      get.restore();
    }
  });

  it('matchUrls should not copy url on empty value', () => {
    const get = sinon.stub(component.applicationForm, 'get');
    const spy = sinon.spy();
    get.withArgs('applicantInfo.website').returns({value: ''});
    get.withArgs('tempOutfitterFields.advertisingURL').returns({value: '', setValue: spy});
    component.matchUrls();
    expect(spy.notCalled).toBeTruthy();
    get.restore();
  });

  it('matchUrls should copy url on url value', () => {
    const get = sinon.stub(component.applicationForm, 'get');
    const spy = sinon.spy();
    get.withArgs('applicantInfo.website').returns({value: 'http://www.google.com'});
    get.withArgs('tempOutfitterFields.advertisingURL').returns({value: '', setValue: spy});
    component.matchUrls();
    expect(spy.called).toBeTruthy();
    get.restore();
  });

  it('matchUrls should not copy url on url value when ad url has value', () => {
    const get = sinon.stub(component.applicationForm, 'get');
    const spy = sinon.spy();
    get.withArgs('applicantInfo.website').returns({value: 'http://www.google.com'});
    get.withArgs('tempOutfitterFields.advertisingURL').returns({value: 'www.google.com', setValue: spy});
    component.matchUrls();
    expect(spy.called).toBeFalsy();
    get.restore();
  });
});

class MockApplicationService {
  get(): Observable<{}> {
    return Observable.of();
  }
}
