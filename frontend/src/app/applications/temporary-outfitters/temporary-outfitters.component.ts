import { Component, OnInit } from '@angular/core';
import { SpecialUseApplication } from '../../_models/special-use-application';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { ApplicationService } from '../../_services/application.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { alphanumericValidator } from '../validators/alphanumeric-validation';

@Component({
  selector: 'app-temporary-outfitters',
  templateUrl: './temporary-outfitters.component.html'
})
export class TemporaryOutfittersComponent implements OnInit {
  apiErrors: any;
  application = new SpecialUseApplication();
  applicationId: number;
  forest = 'Mt. Baker-Snoqualmie National Forest';
  mode = 'Observable';
  submitted = false;
  uploadFiles = false;
  goodStandingEvidenceMessage: string;
  orgTypeFileUpload: boolean;
  alphanumericValidationMessage = ' requires an alphanumeric character.';

  applicationForm: FormGroup;

  constructor(
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
        website: ['', [Validators.pattern('https?://.+')]]
      }),
      tempOutfitterFields: this.formBuilder.group({
        individualIsCitizen: [false],
        smallBusiness: [false],
        advertisingDescription: ['', [Validators.required, alphanumericValidator()]],
        advertisingURL: ['', [Validators.pattern('https?://.+')]],
        clientCharges: ['', [Validators.required, alphanumericValidator()]],
        experienceList: ['', [alphanumericValidator()]]
      })
    });

    // this.applicationForm.valueChanges.subscribe(data => this.validationStatus(this.applicationForm));
    //  this.validationStatus();

    this.applicationForm.get('applicantInfo.orgType').valueChanges.subscribe(type => {
      switch (type) {
        case 'individual':
          this.goodStandingEvidenceMessage = 'Are you a citizen of the United States?';
          this.orgTypeFileUpload = false;
          break;
        case 'corporation':
          this.goodStandingEvidenceMessage = 'Provide a copy of your state certificate of good standing.';
          this.orgTypeFileUpload = true;
          break;
        case 'llc':
          this.goodStandingEvidenceMessage = 'Provide a copy of your state certificate of good standing.';
          this.orgTypeFileUpload = true;
          break;
        case 'partnership':
          this.goodStandingEvidenceMessage = 'Provide a copy of your partnership or association agreement.';
          this.orgTypeFileUpload = true;
          break;
        case 'stateGovernment':
          this.goodStandingEvidenceMessage = '';
          this.orgTypeFileUpload = false;
          break;
        case 'localGovernment':
          this.goodStandingEvidenceMessage = '';
          this.orgTypeFileUpload = false;
          break;
        case 'nonprofit':
          this.goodStandingEvidenceMessage = 'Please attach a copy of your IRS Form 990';
          this.orgTypeFileUpload = true;
          break;
      }
    });
  }

  // validationStatus(data?: any) {
  //   if (!this.applicationForm) {
  //     return;
  //   }
  //   const form = this.applicationForm;
  //
  //   for (const field in data) {
  //     this.formErrors[field] = '';
  //     const control = form.get(field);
  //     this.validateControl(control, field);
  //     if (data[field].lenth) {
  //       for (const f in data[field]){
  //         const c = form.get(field.)
  //         validateControl()
  //       }
  //     }
  //   }
  // }

  // validateControl(control: any, field) {
  //   if (control && (control.touched || control.dirty) && !control.valid) {
  //     for (const key in control.errors) {
  //       this.formErrors[field] += this.validationMessages[key] + ' ';
  //     }
  //   }
  // }
  //
  // validationStatus(formGroup: FormGroup) {
  //   (<any>Object).values(formGroup.controls).forEach(control => {
  //     if (control.status === 'INVALID') {
  //       console.log(control);
  //       // control.markAsTouched();
  //       // control.updateValueAndValidity();
  //     }
  //     if (control.controls) {
  //       this.validationStatus(control);
  //     }
  //   });
  // }

  // formErrors = {};
  //
  // validationMessages = {
  //   required: ' is required.',
  //   minlength: ' requires a minimum of 2 characters.',
  //   maxlength: ' requires a maximum of 3 characters.',
  //   alphanumericRequirement: this.alphanumericValidationMessage
  // };
  //
  // parseErrors(errors) {
  //   let message = '';
  //   if (errors.required) {
  //     message += 'Field is required';
  //   }
  //   return message;
  // }

  onSubmit(form) {
    this.submitted = true;
    this.applicationFieldsService.touchAllFields(this.applicationForm);
    if (!form.valid) {
      this.applicationFieldsService.scrollToFirstError();
    } else {
      this.applicationService
        .create(JSON.stringify(this.applicationForm.value), '/special-uses/temp-outfitters/')
        .subscribe(
          persistedApplication => {
            this.applicationId = persistedApplication.applicationId;
            this.uploadFiles = true;
            this.router.navigate(['applications/submitted/' + persistedApplication.applicationId]);
          },
          (e: any) => {
            this.apiErrors = e;
            window.scroll(0, 0);
          }
        );
    }
  }

  ngOnInit() {}
}
