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
          { provide: ApplicationFieldsService, useClass: ApplicationFieldsService },
          { provide: FormBuilder, useClass: FormBuilder }
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

  function createFakeEvent(type: string) {
    const event = document.createEvent('Event');
    event.initEvent(type, true, true);
    return event;
  }

  function dispatchFakeEvent(type: string) {
    window.dispatchEvent(createFakeEvent(type));
  }

  it('Should switch on org type', () => {
    const orgTypes = {
      Person: {
        pointOfView: 'I',
        orgTypeFileUpload: false,
        goodStandingEvidence: null
      },
      Corporation: {
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
      Nonprofit: {
        pointOfView: 'We',
        orgTypeFileUpload: true,
        goodStandingEvidence: [Validators.required]
      }
    };
    for (const type of Object.keys(orgTypes)) {
      const orgFields = orgTypes[type];

      const get = sinon.stub(component.applicationForm, 'get').returns({
        setValidators: required => {
          expect(required).toEqual(orgFields.goodStandingEvidence);
        }
      });
      component.orgTypeChange(type);
      expect(component.pointOfView).toEqual(orgFields.pointOfView);
      expect(component.orgTypeFileUpload).toEqual(orgFields.orgTypeFileUpload);
      get.restore();
    }
  });

  it('matchUrls should not copy url on empty value', () => {
    const get = sinon.stub(component.applicationForm, 'get');
    const spy = sinon.spy();
    get.withArgs('applicantInfo.website').returns({ value: '' });
    get.withArgs('tempOutfitterFields.advertisingURL').returns({ value: '', setValue: spy });
    component.matchUrls();
    expect(spy.notCalled).toBeTruthy();
    get.restore();
  });

  it('matchUrls should not copy url on url value when ad url has value', () => {
    const get = sinon.stub(component.applicationForm, 'get');
    const spy = sinon.spy();
    get.withArgs('applicantInfo.website').returns({ value: 'http://www.google.com' });
    get.withArgs('tempOutfitterFields.advertisingURL').returns({ value: 'www.google.com', setValue: spy });
    component.matchUrls();
    expect(spy.called).toBeFalsy();
    get.restore();
  });

  it('should not copy url if url is not valid, and copy url if url is valid', () => {
    component.applicationForm.get('applicantInfo.website').setValue('test');
    component.matchUrls();
    expect(component.applicationForm.get('tempOutfitterFields.advertisingURL').value).toBe('');
    component.applicationForm.get('applicantInfo.website').setValue('http://www.test.com');
    component.matchUrls();
    expect(component.applicationForm.get('tempOutfitterFields.advertisingURL').value).toBe('http://www.test.com');
    component.applicationForm.get('applicantInfo.website').setValue('test');
    component.matchUrls();
    expect(component.applicationForm.get('tempOutfitterFields.advertisingURL').value).toBe('http://www.test.com');
  });

  it('should not submit if form not valid', () => {
    component.checkFileUploadValidity = () => {};
    component.applicationForm = component.formBuilder.group({
      liabilityInsurance: ['', [Validators.required]]
    });

    component.dateStatus.hasErrors = false;
    component.invalidFileUpload = false;
    const spy = sinon.spy(component.applicationFieldsService, 'scrollToFirstError');
    const spyPass = sinon.spy(component.applicationService, 'create');

    component.onSubmit();
    expect(spy.called).toBeTruthy();
    expect(spyPass.called).toBeFalsy();
  });

  it('should not submit if date has errors', () => {
    component.checkFileUploadValidity = () => {};
    component.applicationForm = component.formBuilder.group({
      liabilityInsurance: ['', [Validators.required]]
    });
    component.applicationForm.controls['liabilityInsurance'].setValue('meow mix');
    component.dateStatus.hasErrors = true;
    component.invalidFileUpload = false;
    const spyFail = sinon.spy(component.applicationFieldsService, 'scrollToFirstError');
    const spyPass = sinon.spy(component.applicationService, 'create');

    component.onSubmit();
    expect(spyFail.called).toBeTruthy();
    expect(spyPass.called).toBeFalsy();
  });

  it('should not submit if file is invalid', () => {
    component.checkFileUploadValidity = () => {};
    component.applicationForm = component.formBuilder.group({
      liabilityInsurance: ['', [Validators.required]]
    });
    component.applicationForm.controls['liabilityInsurance'].setValue('meow mix');
    component.dateStatus.hasErrors = false;
    component.invalidFileUpload = true;
    const spyFail = sinon.spy(component.applicationFieldsService, 'scrollToFirstError');
    const spyPass = sinon.spy(component.applicationService, 'create');

    component.onSubmit();
    expect(spyFail.called).toBeTruthy();
    expect(spyPass.called).toBeFalsy();
  });

  it('should submit if no errors', () => {
    component.checkFileUploadValidity = () => {};
    component.applicationForm = component.formBuilder.group({
      liabilityInsurance: ['', [Validators.required]]
    });
    component.applicationForm.controls['liabilityInsurance'].setValue('meow mix');
    component.dateStatus.hasErrors = false;
    component.invalidFileUpload = false;
    const spyFail = sinon.spy(component.applicationFieldsService, 'scrollToFirstError');
    const spyPass = sinon.spy(component.applicationService, 'create');

    component.onSubmit();
    expect(spyFail.called).toBeFalsy();
    expect(spyPass.called).toBeTruthy();
  });

  it('should make fileupload invalid if no files', () => {
    const queryStub = sinon.stub(window.document, 'querySelectorAll').returns([]);
    component.checkFileUploadValidity();
    expect(component.invalidFileUpload).toBeFalsy();
    queryStub.restore();
  });

  it('should make fileupload valid if files', () => {
    const queryStub = sinon.stub(window.document, 'querySelectorAll').returns(['meowMix']);
    component.checkFileUploadValidity();
    expect(component.invalidFileUpload).toBeTruthy();
    queryStub.restore();
  });

  it('should add class if in view', () => {
    const target = document.body;
    const addClassSpy = sinon.spy(component.renderer, 'addClass');
    const removeClassSpy = sinon.spy(component.renderer, 'removeClass');
    component.elementInView({ value: 'meowmix', target: target });
    expect(addClassSpy.called).toBeTruthy();
    expect(removeClassSpy.called).toBeFalsy();
  });

  it('should remove class if in view', () => {
    const target = document.body;
    const addClassSpy = sinon.spy(component.renderer, 'addClass');
    const removeClassSpy = sinon.spy(component.renderer, 'removeClass');
    component.elementInView({ target: target });
    expect(addClassSpy.called).toBeFalsy();
    expect(removeClassSpy.called).toBeTruthy();
  });
});

class MockApplicationService {
  get(): Observable<{}> {
    return Observable.of();
  }

  create(): Observable<{}> {
    return Observable.of();
  }
}
