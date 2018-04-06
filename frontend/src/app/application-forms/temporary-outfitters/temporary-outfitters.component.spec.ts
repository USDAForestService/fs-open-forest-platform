import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertService } from '../../_services/alert.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as sinon from 'sinon';
import { TemporaryOutfittersComponent } from './temporary-outfitters.component';
import { ApplicationService } from '../../_services/application.service';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { FileUploadService } from '../_services/file-upload.service';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tempOutfitterMock } from './temp-outfitter.mock';
import { UtilService } from '../../_services/util.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockApplicationService {
  getOne(id): Observable<{}> {
    if (id === '111') {
      return Observable.of(tempOutfitterMock);
    } else {
      return Observable.throw('The application could not be found.');
    }
  }

  update(id): Observable<{}> {
    if (id === '111') {
      return Observable.of(tempOutfitterMock);
    } else {
      return Observable.throw('There were errors when attempting to update your application.');
    }
  }

  create(): Observable<{}> {
    return Observable.of(tempOutfitterMock);
  }

  handleStatusCode(e) {
    return e;
  }

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
          ApplicationFieldsService,
          FileUploadService,
          FormBuilder,
          AlertService,
          AuthenticationService,
          UtilService
        ],
        imports: [RouterTestingModule, HttpClientTestingModule]
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

  it('should switch on org type', () => {
    const orgTypes = {
      Person: {
        pointOfView: 'I',
        orgTypeFileUpload: false,
        goodStandingEvidence: true
      },
      Corporation: {
        pointOfView: 'We',
        orgTypeFileUpload: true,
        goodStandingEvidence: false
      },
      'Limited Liability Company (LLC)': {
        pointOfView: 'We',
        orgTypeFileUpload: true,
        goodStandingEvidence: false
      },
      'Limited Liability Partnership (LLP)': {
        pointOfView: 'We',
        orgTypeFileUpload: true,
        goodStandingEvidence: false
      },
      'State Government': {
        pointOfView: 'We',
        orgTypeFileUpload: false,
        goodStandingEvidence: true
      },
      'Local Govt': {
        pointOfView: 'We',
        orgTypeFileUpload: false,
        goodStandingEvidence: true
      },
      Nonprofit: {
        pointOfView: 'We',
        orgTypeFileUpload: true,
        goodStandingEvidence: false
      }
    };
    for (const type of Object.keys(orgTypes)) {
      const orgFields = orgTypes[type];
      component.orgTypeChange(type);
      expect(component.applicationForm.get('applicantInfo.goodStandingEvidence').valid).toEqual(
        orgFields.goodStandingEvidence
      );
      expect(component.pointOfView).toEqual(orgFields.pointOfView);
      expect(component.orgTypeFileUpload).toEqual(orgFields.orgTypeFileUpload);
    }
  });

  it('should toggle advertising description', () => {
    component.applicationForm.get('tempOutfitterFields.advertisingURL').setValue('http://www.test.com');
    expect(component.applicationForm.get('tempOutfitterFields.advertisingURL').valid).toBeTruthy();
    component.applicationForm.get('tempOutfitterFields.advertisingURL').setValue('');
    expect(component.applicationForm.get('tempOutfitterFields.advertisingURL').valid).toBeFalsy();
    component.advertisingRequirementToggle(
      true,
      component.applicationForm.get('tempOutfitterFields.advertisingURL'),
      component.applicationForm.get('tempOutfitterFields.advertisingDescription')
    );
    expect(component.applicationForm.get('tempOutfitterFields.advertisingURL').valid).toBeTruthy();
    expect(component.applicationForm.get('tempOutfitterFields.advertisingDescription').valid).toBeFalsy();
    component.applicationForm.get('tempOutfitterFields.advertisingDescription').setValue('test');
    expect(component.applicationForm.get('tempOutfitterFields.advertisingDescription').valid).toBeTruthy();
    component.advertisingRequirementToggle(
      false,
      component.applicationForm.get('tempOutfitterFields.advertisingURL'),
      component.applicationForm.get('tempOutfitterFields.advertisingDescription')
    );
    expect(component.applicationForm.get('tempOutfitterFields.advertisingURL').valid).toBeFalsy();
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

  it('should reset file error status on retryFileUpload', () => {
    component.fileUploadError = true;
    component.uploadFiles = false;
    component.fileUploadService.setFileUploadError(true);
    component.retryFileUpload(new Event('click'));
    expect(component.fileUploadError).toBeFalsy();
    expect(component.uploadFiles).toBeTruthy();
    expect(component.fileUploadService.fileUploadError).toBeFalsy();
  });

  it('should trigger doCheck function', () => {
    component.fileUploadService.setFileUploadError(true);
    component.uploadFiles = true;
    component.ngDoCheck();
    expect(component.uploadFiles).toBeFalsy();
    expect(component.fileUploadError).toBeTruthy();
  });

  it('should remove unused data', () => {
    const formBuilder = new FormBuilder();
    const experienceFields = formBuilder.group({
      haveNationalForestPermits: [false],
      listAllNationalForestPermits: ['test'],
      haveOtherPermits: [false],
      listAllOtherPermits: ['test'],
      haveCitations: [false],
      listAllCitations: ['test']
    });
    const activityDescription = formBuilder.group({
      needGovernmentFacilities: [false],
      listOfGovernmentFacilities: ['test'],
      needTemporaryImprovements: [false],
      listOfTemporaryImprovements: ['test'],
      haveMotorizedEquipment: [false],
      statementOfMotorizedEquipment: ['test'],
      haveLivestock: [false],
      statementOfTransportationOfLivestock: ['test'],
      needAssignedSite: [false],
      statementOfAssignedSite: ['test']
    });
    const tempOutfitterFields = component.applicationForm.get('tempOutfitterFields') as FormGroup;

    tempOutfitterFields.addControl('experienceFields', experienceFields);
    tempOutfitterFields.addControl('activityDescriptionFields', activityDescription);

    component.removeUnusedData();

    expect(component.applicationForm.get('applicantInfo.eveningPhone')).toBeFalsy();
    expect(
      component.applicationForm.get('tempOutfitterFields.experienceFields.listAllNationalForestPermits').value
    ).toBeFalsy();
    expect(component.applicationForm.get('tempOutfitterFields.experienceFields.listAllOtherPermits').value).toBeFalsy();
    expect(component.applicationForm.get('tempOutfitterFields.experienceFields.listAllCitations').value).toBeFalsy();
    expect(
      component.applicationForm.get('tempOutfitterFields.activityDescriptionFields.listOfGovernmentFacilities').value
    ).toBeFalsy();
    expect(
      component.applicationForm.get('tempOutfitterFields.activityDescriptionFields.listOfTemporaryImprovements').value
    ).toBeFalsy();
    expect(
      component.applicationForm.get('tempOutfitterFields.activityDescriptionFields.statementOfMotorizedEquipment').value
    ).toBeFalsy();
    expect(
      component.applicationForm.get(
        'tempOutfitterFields.activityDescriptionFields.statementOfTransportationOfLivestock'
      ).value
    ).toBeFalsy();
    expect(
      component.applicationForm.get('tempOutfitterFields.activityDescriptionFields.statementOfAssignedSite').value
    ).toBeFalsy();
  });

  it('should not remove used data', () => {
    const formBuilder = new FormBuilder();
    const experienceFields = formBuilder.group({
      haveNationalForestPermits: [true],
      listAllNationalForestPermits: ['test'],
      haveOtherPermits: [true],
      listAllOtherPermits: ['test'],
      haveCitations: [true],
      listAllCitations: ['test']
    });
    const activityDescription = formBuilder.group({
      needGovernmentFacilities: [true],
      listOfGovernmentFacilities: ['test'],
      needTemporaryImprovements: [true],
      listOfTemporaryImprovements: ['test'],
      haveMotorizedEquipment: [true],
      statementOfMotorizedEquipment: ['test'],
      haveLivestock: [true],
      statementOfTransportationOfLivestock: ['test'],
      needAssignedSite: [true],
      statementOfAssignedSite: ['test']
    });
    const tempOutfitterFields = component.applicationForm.get('tempOutfitterFields') as FormGroup;

    tempOutfitterFields.addControl('experienceFields', experienceFields);
    tempOutfitterFields.addControl('activityDescriptionFields', activityDescription);

    component.removeUnusedData();

    expect(
      component.applicationForm.get('tempOutfitterFields.experienceFields.listAllNationalForestPermits').value
    ).toBeTruthy();
    expect(
      component.applicationForm.get('tempOutfitterFields.experienceFields.listAllOtherPermits').value
    ).toBeTruthy();
    expect(component.applicationForm.get('tempOutfitterFields.experienceFields.listAllCitations').value).toBeTruthy();
    expect(
      component.applicationForm.get('tempOutfitterFields.activityDescriptionFields.listOfGovernmentFacilities').value
    ).toBeTruthy();
    expect(
      component.applicationForm.get('tempOutfitterFields.activityDescriptionFields.listOfTemporaryImprovements').value
    ).toBeTruthy();
    expect(
      component.applicationForm.get('tempOutfitterFields.activityDescriptionFields.statementOfMotorizedEquipment').value
    ).toBeTruthy();
    expect(
      component.applicationForm.get(
        'tempOutfitterFields.activityDescriptionFields.statementOfTransportationOfLivestock'
      ).value
    ).toBeTruthy();
    expect(
      component.applicationForm.get('tempOutfitterFields.activityDescriptionFields.statementOfAssignedSite').value
    ).toBeTruthy();
  });

  it('should return application', () => {
    component.getApplication(111);
    expect(component.apiErrors).toEqual('The application could not be found.');
    component.getApplication('111');
    expect(component.applicationForm.get('appControlNumber').value).toEqual('222');
  });

  it('should create application', () => {
    component.createApplication();
    expect(component.application.appControlNumber).toEqual('222');
    expect(component.showFileUploadProgress).toBeTruthy();
    expect(component.uploadFiles).toBeTruthy();
  });

  it('should update application', () => {
    component.updateApplication();
    expect(component.apiErrors).toEqual('There were errors when attempting to update your application.');
  });

  it('should set the correct file names from the server', () => {
    component.getFiles(1);
    expect(component.applicationForm.get('acknowledgementOfRisk').value).toEqual('test1');
  });

  it('should upload files on when uploadFiles is true', () => {
    component.uploadFiles = true;
    component.application = { status: '' };
    component.ngDoCheck();
    expect(component.uploadFiles).toBeFalsy();
  });
});
