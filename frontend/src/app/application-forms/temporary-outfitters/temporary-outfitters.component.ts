import { alphanumericValidator } from '../validators/alphanumeric-validation';
import { urlValidator } from '../validators/url-validation';
import { applicationTypeValidator } from '../validators/application-type-validation';
import { AlertService } from '../../_services/alert.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { FileUploadService } from '../_services/file-upload.service';
import { ApplicationService } from '../../_services/application.service';
import { Component, DoCheck, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-temporary-outfitters',
  templateUrl: './temporary-outfitters.component.html'
})
export class TemporaryOutfittersComponent implements DoCheck, OnInit {
  apiErrors: any;
  application: any;
  applicationId: number;
  currentSection: any;
  forest = 'Mt. Baker-Snoqualmie National Forest';
  mode = 'Observable';
  submitted = false;
  uploadFiles = false;
  filesUploaded = false;
  goodStandingEvidenceMessage: string;
  orgTypeFileUpload: boolean;
  applicationForm: FormGroup;
  pointOfView = 'We';
  showFileUploadProgress = false;
  fileUploadProgress: number;
  fileUploadError = false;
  numberOfFiles: number;

  dateStatus = {
    startDateTimeValid: true,
    endDateTimeValid: true,
    startBeforeEnd: true,
    startAfterToday: true,
    hasErrors: false
  };

  invalidFileUpload: boolean;

  constructor(
    private alertService: AlertService,
    private authentication: AuthenticationService,
    private element: ElementRef,
    public applicationService: ApplicationService,
    public applicationFieldsService: ApplicationFieldsService,
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public renderer: Renderer2,
    public fileUploadService: FileUploadService
  ) {
    this.applicationForm = this.formBuilder.group({
      appControlNumber: ['', [Validators.maxLength(255)]],
      applicationId: ['', [Validators.maxLength(255)]],
      createdAt: ['', [Validators.maxLength(255)]],
      applicantMessage: ['', [Validators.maxLength(255)]],
      status: ['', [Validators.maxLength(255)]],
      authEmail: ['', [Validators.maxLength(255)]],
      authorizingOfficerName: ['', [Validators.maxLength(255)]],
      authorizingOfficerTitle: ['', [Validators.maxLength(255)]],
      revisions: [''],
      district: ['11', [Validators.required, Validators.maxLength(2)]],
      region: ['06', [Validators.required, Validators.maxLength(2)]],
      forest: ['05', [Validators.required, Validators.maxLength(2)]],
      type: [
        'tempOutfitters',
        [Validators.required, alphanumericValidator(), applicationTypeValidator(), Validators.maxLength(255)]
      ],
      signature: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(3), alphanumericValidator()]],
      applicantInfo: this.formBuilder.group({
        addAdditionalPhone: [false],
        emailAddress: ['', [Validators.required, Validators.email, alphanumericValidator(), Validators.maxLength(255)]],
        organizationName: ['', [alphanumericValidator(), Validators.maxLength(255)]],
        primaryFirstName: ['', [Validators.required, alphanumericValidator(), Validators.maxLength(255)]],
        primaryLastName: ['', [Validators.required, alphanumericValidator(), Validators.maxLength(255)]],
        orgType: ['', [Validators.required, alphanumericValidator(), Validators.maxLength(255)]],
        website: ['', [urlValidator(), Validators.maxLength(255)]],
        goodStandingEvidence: ['', [Validators.maxLength(255)]]
      }),
      guideIdentification: ['', [Validators.maxLength(255)]],
      operatingPlan: ['', [Validators.maxLength(255)]],
      liabilityInsurance: ['', [Validators.maxLength(255)]],
      acknowledgementOfRisk: ['', [Validators.maxLength(255)]],
      tempOutfitterFields: this.formBuilder.group({
        individualIsCitizen: [false],
        smallBusiness: [false],
        advertisingDescription: ['', [alphanumericValidator(), Validators.maxLength(255)]],
        advertisingURL: ['', [Validators.required, urlValidator(), Validators.maxLength(255)]],
        noPromotionalWebsite: ['', Validators.maxLength(10)],
        clientCharges: ['', [Validators.required, alphanumericValidator(), Validators.maxLength(512)]],
        experienceList: ['', [alphanumericValidator(), Validators.maxLength(512)]]
      })
    });

    this.applicationForm.get('tempOutfitterFields.noPromotionalWebsite').valueChanges.subscribe(value => {
      this.advertisingRequirementToggle(
        value,
        this.applicationForm.get('tempOutfitterFields.advertisingURL'),
        this.applicationForm.get('tempOutfitterFields.advertisingDescription')
      );
    });

    this.applicationForm.get('applicantInfo.orgType').valueChanges.subscribe(type => {
      this.orgTypeChange(type);
    });
  }

  advertisingRequirementToggle(value, advertisingUrl, advertisingDescription) {
    if (value) {
      advertisingDescription.setValidators([Validators.required, alphanumericValidator()]);
      advertisingDescription.updateValueAndValidity();
      advertisingUrl.setValidators([alphanumericValidator(), urlValidator(), Validators.maxLength(255)]);
      advertisingUrl.updateValueAndValidity();
    } else {
      advertisingUrl.setValidators([
        Validators.required,
        alphanumericValidator(),
        urlValidator(),
        Validators.maxLength(255)
      ]);
      advertisingUrl.updateValueAndValidity();
      advertisingDescription.setValidators(null);
      advertisingDescription.updateValueAndValidity();
    }
  }

  orgTypeChange(type): void {
    this.pointOfView = 'We';
    this.goodStandingEvidenceMessage = '';
    this.orgTypeFileUpload = true;
    const gse = this.applicationForm.get('applicantInfo.goodStandingEvidence');
    this.applicationFieldsService.updateValidators(gse, true, 255);
    switch (type) {
      case 'Person':
        this.goodStandingEvidenceMessage = 'Are you a citizen of the United States?';
        this.pointOfView = 'I';
        this.orgTypeFileUpload = false;
        this.applicationFieldsService.updateValidators(gse, false);
        break;
      case 'Corporation':
        this.goodStandingEvidenceMessage = 'Provide a copy of your state certificate of good standing.';
        break;
      case 'Limited Liability Company (LLC)':
        this.goodStandingEvidenceMessage = 'Provide a copy of your state certificate of good standing.';
        break;
      case 'Limited Liability Partnership (LLP)':
        this.goodStandingEvidenceMessage = 'Provide a copy of your partnership or association agreement.';
        break;
      case 'State Government':
        this.orgTypeFileUpload = false;
        this.applicationFieldsService.updateValidators(gse, false);
        break;
      case 'Local Govt':
        this.orgTypeFileUpload = false;
        this.applicationFieldsService.updateValidators(gse, false);
        break;
      case 'Nonprofit':
        this.goodStandingEvidenceMessage = 'Please attach a copy of your IRS Form 990';
        break;
    }
  }

  matchUrls(): void {
    const website = this.applicationForm.get('applicantInfo.website');
    const value = website.value;
    const url = this.applicationForm.get('tempOutfitterFields.advertisingURL').value;
    if (value.trim().length > 0 && url.trim().length === 0 && website.valid) {
      // Reproduce the url typed into the website input into the advertising url input
      // if the advertising url is empty
      this.applicationForm.get('tempOutfitterFields.advertisingURL').setValue(value);
    }
  }

  updateDateStatus(dateStatus: any): void {
    this.dateStatus = dateStatus;
  }

  checkFileUploadValidity() {
    const untouchedRequired = document.querySelectorAll('.usa-file-input.ng-untouched.required');
    const invalid = document.querySelectorAll('.usa-file-input.ng-invalid');
    this.invalidFileUpload = !!(untouchedRequired.length || invalid.length);
  }

  numberOfFilesToUpload() {
    this.numberOfFiles = this.fileUploadService.getNumberOfFiles();
  }

  /**
  * Remove data that has not been used and should not be sent to the api.
  * There are fields that are conditionally added or removed from the form.
  */

  removeUnusedData() {
    const form = this.applicationForm;
    if (form.get('applicantInfo')) {
      if (!form.get('applicantInfo.addAdditionalPhone').value) {
        this.applicationFieldsService.removeAdditionalPhone(form.get('applicantInfo'));
      }
    }
    this.removeDataWrapper(form, 'activityDescriptionFields');
    this.removeDataWrapper(form, 'experienceFields');
  }

  removeDataWrapper(form, fieldGroup) {
    if (form.get(`tempOutfitterFields.${fieldGroup}`)) {
      if (fieldGroup === 'activityDescriptionFields') {
        this.removeUnusedActivityDescription(form);
      } else {
        this.removedUnusedExperience(form);
      }
    }
  }

  removeUnusedActivityDescription(form) {
    const fieldGroup = 'tempOutfitterFields.activityDescriptionFields';
    if (!form.get(`${fieldGroup}.needGovernmentFacilities`).value) {
      form.get(`${fieldGroup}.listOfGovernmentFacilities`).setValue('');
    }
    if (!form.get(`${fieldGroup}.needTemporaryImprovements`).value) {
      form.get(`${fieldGroup}.listOfTemporaryImprovements`).setValue('');
    }
    if (!form.get(`${fieldGroup}.haveMotorizedEquipment`).value) {
      form.get(`${fieldGroup}.statementOfMotorizedEquipment`).setValue('');
    }
    if (!form.get(`${fieldGroup}.haveLivestock`).value) {
      form.get(`${fieldGroup}.statementOfTransportationOfLivestock`).setValue('');
    }
    if (!form.get(`${fieldGroup}.needAssignedSite`).value) {
      form.get(`${fieldGroup}.statementOfAssignedSite`).setValue('');
    }
  }

  removedUnusedExperience(form) {
    const fieldGroup = 'tempOutfitterFields.experienceFields';
    if (!form.get(`${fieldGroup}.haveNationalForestPermits`).value) {
      form.get(`${fieldGroup}.listAllNationalForestPermits`).setValue('');
    }
    if (!form.get(`${fieldGroup}.haveOtherPermits`).value) {
      form.get(`${fieldGroup}.listAllOtherPermits`).setValue('');
    }
    if (!form.get(`${fieldGroup}.haveCitations`).value) {
      form.get(`${fieldGroup}.listAllCitations`).setValue('');
    }
  }

  getApplication(id) {
    this.applicationService.getOne(id, `/special-uses/temp-outfitter/`).subscribe(
      application => {
        this.application = application;
        this.applicationId = application.applicationId;
        this.applicationForm.setValue(this.application);
        this.getFiles(this.application.applicationId);
      },
      (e: any) => {
        this.apiErrors = e;
        window.scrollTo(0, 200);
      }
    );
  }

  getFiles(id) {
    this.applicationService.get(`/special-uses/temp-outfitter/${id}/files`).subscribe(files => {
      for (const file of files) {
        let type = '';
        switch (file.documentType) {
          case 'acknowledgement-of-risk-form':
            type = 'acknowledgementOfRisk';
            break;
          case 'good-standing-evidence':
            type = 'applicantInfo.goodStandingEvidence';
            break;
          case 'insurance-certificate':
            type = 'liabilityInsurance';
            break;
          case 'guide-document':
            type = 'guideIdentification';
            break;
          case 'operating-plan':
            type = 'operatingPlan';
            break;
        }
        this.applicationForm.get(type).setValue(file.originalFileName);
      }
    });
  }

  createApplication() {
    this.applicationService
      .create(JSON.stringify(this.applicationForm.value), '/special-uses/temp-outfitter/')
      .subscribe(
        persistedApplication => {
          this.application = persistedApplication;
          this.applicationId = persistedApplication.applicationId;
          this.showFileUploadProgress = true;
          this.uploadFiles = true;
        },
        (e: any) => {
          this.apiErrors = e;
          window.scroll(0, 0);
        }
      );
  }

  updateApplication() {
    this.applicationService.update(this.applicationForm.value, 'temp-outfitter').subscribe(
      (data: any) => {
        this.showFileUploadProgress = true;
        this.uploadFiles = true;
      },
      (e: any) => {
        this.apiErrors = e;
        window.scrollTo(0, 200);
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    this.numberOfFilesToUpload();
    this.checkFileUploadValidity();
    this.applicationFieldsService.touchAllFields(this.applicationForm);
    if (!this.applicationForm.valid || this.dateStatus.hasErrors || this.invalidFileUpload) {
      this.applicationFieldsService.scrollToFirstError();
    } else {
      this.removeUnusedData();
      if (this.applicationFieldsService.getEditApplication()) {
        this.updateApplication();
      } else {
        this.createApplication();
      }
    }
  }

  retryFileUpload(event) {
    this.fileUploadService.setFileUploadError(false);
    this.fileUploadError = false;
    this.numberOfFilesToUpload();
    this.uploadFiles = true;
  }

  elementInView(event) {
    if (event.value) {
      this.renderer.addClass(event.target, 'in-view');
    } else {
      this.renderer.removeClass(event.target, 'in-view');
    }

    const viewableElements = document.getElementsByClassName('in-view');
    if (viewableElements[0]) {
      this.currentSection = viewableElements[0].id;
    }
  }

  ngDoCheck() {
    if (this.fileUploadService.fileUploadError) {
      this.fileUploadError = true;
      this.uploadFiles = false;
    }
    if (this.uploadFiles) {
      this.fileUploadProgress = this.fileUploadService.getFileUploadProgress(this.numberOfFiles + 1);
      if (this.fileUploadService.getNumberOfFiles() < 1) {
        this.endOfUpload();
      }
    }
  }

  endOfUpload() {
      this.uploadFiles = false;
      this.showFileUploadProgress = false;
      this.fileUploadError = false;
      if (this.applicationFieldsService.getEditApplication()) {
        this.alertService.addSuccessMessage('Permit application was successfully updated.');
        if (this.authentication.isAdmin()) {
          this.router.navigate([`admin/applications/temp-outfitter/${this.application.appControlNumber}`]);
        } else {
          this.router.navigate([`user/applications/temp-outfitter/${this.application.appControlNumber}`]);
        }
      } else {
        this.application.status = 'Submitted';
        this.applicationService.update(this.application, 'temp-outfitter').subscribe(
          (data: any) => {
            this.router.navigate([`applications/temp-outfitter/submitted/${this.application.appControlNumber}`]);
          },
          (e: any) => {
            this.apiErrors = e;
            window.scrollTo(0, 200);
          }
        );
      }

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.getApplication(params['id']);
        this.applicationFieldsService.setEditApplication(true);
      } else {
        this.applicationFieldsService.setEditApplication(false);
      }
    });
  }
}
