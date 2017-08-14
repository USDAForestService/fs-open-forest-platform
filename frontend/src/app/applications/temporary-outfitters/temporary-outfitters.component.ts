import { alphanumericValidator } from '../validators/alphanumeric-validation';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { ApplicationService } from '../../_services/application.service';
import { Component, DoCheck, ElementRef, HostListener } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SpecialUseApplication } from '../../_models/special-use-application';

@Component({
  selector: 'app-temporary-outfitters',
  templateUrl: './temporary-outfitters.component.html'
})
export class TemporaryOutfittersComponent implements DoCheck {
  apiErrors: any;
  application = new SpecialUseApplication();
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

  dateStatus = {
    startDateTimeValid: true,
    endDateTimeValid: true,
    startBeforeEnd: true,
    startAfterToday: true,
    hasErrors: false
  };

  invalidFileUpload: boolean;

  constructor(
    private element: ElementRef,
    private applicationService: ApplicationService,
    private applicationFieldsService: ApplicationFieldsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.applicationForm = this.formBuilder.group({
      district: ['11', [Validators.required]],
      region: ['06', [Validators.required]],
      forest: ['05', [Validators.required]],
      type: ['tempOutfitters', [Validators.required, alphanumericValidator()]],
      signature: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(3), alphanumericValidator()]],
      applicantInfo: this.formBuilder.group({
        emailAddress: ['', Validators.required],
        organizationName: ['', alphanumericValidator()],
        primaryFirstName: ['', [Validators.required, alphanumericValidator()]],
        primaryLastName: ['', [Validators.required, alphanumericValidator()]],
        orgType: ['', [Validators.required, alphanumericValidator()]],
        website: ['', [Validators.pattern('https?://.+')]],
        goodStandingEvidence: ['']
      }),
      guideIdentification: [''],
      operatingPlan: [''],
      liabilityInsurance: ['', [Validators.required]],
      acknowledgementOfRisk: [''],
      tempOutfitterFields: this.formBuilder.group({
        individualIsCitizen: [false],
        smallBusiness: [false],
        advertisingDescription: ['', [alphanumericValidator()]],
        advertisingURL: ['', [Validators.pattern('https?://.+')]],
        clientCharges: ['', [Validators.required, alphanumericValidator()]],
        experienceList: ['', [alphanumericValidator()]]
      })
    });

    this.applicationForm.get('applicantInfo.orgType').valueChanges.subscribe(type => {
      this.pointOfView = 'We';
      switch (type) {
        case 'Person':
          this.goodStandingEvidenceMessage = 'Are you a citizen of the United States?';
          this.pointOfView = 'I';
          this.orgTypeFileUpload = false;
          break;
        case 'Corporation':
          console.log(type);
          this.goodStandingEvidenceMessage = 'Provide a copy of your state certificate of good standing.';
          this.orgTypeFileUpload = true;
          break;
        case 'Limited Liability Company (LLC)':
          this.goodStandingEvidenceMessage = 'Provide a copy of your state certificate of good standing.';
          this.orgTypeFileUpload = true;
          break;
        case 'Limited Liability Partnership (LLP)':
          this.goodStandingEvidenceMessage = 'Provide a copy of your partnership or association agreement.';
          this.orgTypeFileUpload = true;
          break;
        case 'State Government':
          this.goodStandingEvidenceMessage = '';
          this.orgTypeFileUpload = false;
          break;
        case 'Local Govt':
          this.goodStandingEvidenceMessage = '';
          this.orgTypeFileUpload = false;
          break;
        case 'Nonprofit':
          this.goodStandingEvidenceMessage = 'Please attach a copy of your IRS Form 990';
          this.orgTypeFileUpload = true;
          break;
      }
    });
  }

  updateDateStatus(dateStatus: any): void {
    this.dateStatus = dateStatus;
  }

  checkFileUploadValidity() {
    const untouchedRequired = document.querySelectorAll('.usa-file-input.ng-untouched.required');
    const invalid = document.querySelectorAll('.usa-file-input.ng-invalid');
    if (untouchedRequired.length || invalid.length) {
      this.invalidFileUpload = true;
    } else {
      this.invalidFileUpload = false;
    }
  }

  onSubmit(form) {
    this.submitted = true;
    this.checkFileUploadValidity();
    this.applicationFieldsService.touchAllFields(this.applicationForm);
    if (!this.applicationForm.valid || this.dateStatus.hasErrors || this.invalidFileUpload) {
      this.applicationFieldsService.scrollToFirstError();
    } else {
      this.applicationService
        .create(JSON.stringify(this.applicationForm.value), '/special-uses/temp-outfitter/')
        .subscribe(
          persistedApplication => {
            this.application = persistedApplication;
            this.applicationId = persistedApplication.applicationId;
            this.uploadFiles = true;
            this.filesUploaded = true;
          },
          (e: any) => {
            this.apiErrors = e;
            window.scroll(0, 0);
          }
        );
    }
  }

  elementInView(event) {
    if (event.value) {
      this.currentSection = event;
    }
  }

  ngDoCheck() {
    if (this.filesUploaded) {
      this.router.navigate([`applications/temp-outfitter/submitted/${this.application.appControlNumber}`]);
    }
  }
}
