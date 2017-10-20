import { alphanumericValidator } from '../validators/alphanumeric-validation';
import { ApplicationService } from '../../_services/application.service';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { Component, OnInit } from '@angular/core';
import { DateTimeRangeComponent } from '../fields/date-time-range.component';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SpecialUseApplication } from '../../_models/special-use-application';
import { AlertService } from '../../_services/alert.service';
import { AuthenticationService } from '../../_services/authentication.service';
import * as moment from 'moment/moment';

@Component({
  providers: [ApplicationService, ApplicationFieldsService, DateTimeRangeComponent],
  selector: 'app-application-noncommercial-group',
  templateUrl: './application-noncommercial-group.component.html'
})
export class ApplicationNoncommercialGroupComponent implements OnInit {
  apiErrors: any;
  application = new SpecialUseApplication();
  forest = 'Mt. Baker-Snoqualmie National Forest';
  mode = 'Observable';
  primaryPermitHolderSameAddress = true;
  secondaryPermitHolderSameAddress = true;
  submitted = false;
  applicantInfo: any;
  orgType: any;

  dateStatus = {
    startDateTimeValid: true,
    endDateTimeValid: true,
    startBeforeEnd: true,
    startAfterToday: true,
    hasErrors: false
  };

  public applicationForm: FormGroup;

  constructor(
    private alertService: AlertService,
    private applicationService: ApplicationService,
    private applicationFieldsService: ApplicationFieldsService,
    private authentication: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.applicationForm = this.formBuilder.group({
      /*** these should probably be taken out **/
      appControlNumber: [''],
      applicationId: [''],
      createdAt: [''],
      applicantMessage: [''],
      status: [''],
      authEmail: [''],
      revisions: [''],
      /*** take out above here **/
      district: ['11', [Validators.required]],
      region: ['06', [Validators.required]],
      forest: ['05', [Validators.required]],
      type: ['noncommercial', [Validators.required]],
      eventName: ['', [Validators.required, alphanumericValidator()]],
      signature: ['', [Validators.required, alphanumericValidator()]],
      applicantInfo: this.formBuilder.group({
        addSecondaryPermitHolder: [false],
        emailAddress: ['', [Validators.required, Validators.email, alphanumericValidator()]],
        organizationName: ['', [alphanumericValidator()]],
        orgType: ['Person', Validators.required],
        primaryAddressSameAsOrganization: [true],
        primaryFirstName: ['', [Validators.required, alphanumericValidator()]],
        primaryLastName: ['', [Validators.required, alphanumericValidator()]],
        secondaryAddressSameAsPrimary: [true],
        secondaryFirstName: ['', [alphanumericValidator()]],
        secondaryLastName: ['', [alphanumericValidator()]],
        website: ['', [alphanumericValidator()]]
      })
    });

    this.applicationForm.get('applicantInfo.orgType').valueChanges.subscribe(type => {
      this.orgTypeChange(type);
    });

    this.applicationForm.get('applicantInfo.primaryAddressSameAsOrganization').valueChanges.subscribe(value => {
      this.addRemoveAddress('primaryAddress', value);
    });

    this.applicationForm.get('applicantInfo.secondaryAddressSameAsPrimary').valueChanges.subscribe(value => {
      this.addRemoveAddress('secondaryAddress', value);
    });

    this.applicationForm.get('applicantInfo.addSecondaryPermitHolder').valueChanges.subscribe(value => {
      this.addSecondaryPermitHolder(value);
    });
  }

  orgTypeChange(type): void {
    if (type === 'Person') {
      this.applicationFieldsService.removeAddress(this.applicationForm.get('applicantInfo'), 'organizationAddress');
      this.applicationForm.get('applicantInfo.organizationName').setValidators(null);
    } else if (type === 'Corporation') {
      this.applicationFieldsService.removeAddress(this.applicationForm.get('applicantInfo'), 'primaryAddress');
      this.applicationForm
        .get('applicantInfo.organizationName')
        .setValidators([Validators.required, alphanumericValidator()]);
    }
  }

  addRemoveAddress(type, value) {
    if (value) {
      this.applicationFieldsService.removeAddress(this.applicationForm.get('applicantInfo'), type);
    } else {
      this.applicationFieldsService.addAddress(this.applicationForm.get('applicantInfo'), type);
    }
  }

  addSecondaryPermitHolder(value) {
    if (value) {
      this.applicationForm
        .get('applicantInfo.secondaryFirstName')
        .setValidators([Validators.required, alphanumericValidator()]);
      this.applicationForm
        .get('applicantInfo.secondaryLastName')
        .setValidators([Validators.required, alphanumericValidator()]);
    } else {
      this.applicationForm.get('applicantInfo.secondaryFirstName').setValidators(null);
      this.applicationForm.get('applicantInfo.secondaryLastName').setValidators(null);
    }
  }

  updateDateStatus(dateStatus: any): void {
    this.dateStatus = dateStatus;
  }

  getApplication(id) {
    this.applicationService.getOne(id, `/special-uses/noncommercial/`).subscribe(
      application => {
        this.application = application;
        this.application.applicantInfo['addSecondaryPermitHolder'] = false;
        this.application.applicantInfo['primaryAddressSameAsOrganization'] = false;
        this.application.applicantInfo['secondaryAddressSameAsPrimary'] = false;
        delete this.application.applicantInfo.eveningPhone;
        delete this.application.applicantInfo.organizationAddress;
        delete this.application.applicantInfo.secondaryAddress;

        this.applicationForm.setValue(application);
      },
      (e: any) => {
        this.applicationService.handleStatusCode(e[0]);
        this.apiErrors = 'The application could not be found.';
        window.scrollTo(0, 200);
      }
    );
  }

  createApplication() {
    this.applicationService
      .create(JSON.stringify(this.applicationForm.value), '/special-uses/noncommercial/')
      .subscribe(
        persistedApplication => {
          this.router.navigate([`applications/noncommercial/submitted/${persistedApplication.appControlNumber}`]);
        },
        (e: any) => {
          this.apiErrors = e;
          window.scroll(0, 0);
        }
      );
  }

  updateApplication() {
    this.applicationService.update(this.application, 'noncommercial').subscribe(
      (data: any) => {
        this.alertService.addSuccessMessage('Permit application was successfully updated.');
        if (this.authentication.isAdmin()) {
          this.router.navigate([`admin/applications/noncommercial/${data.appControlNumber}`]);
        } else {
          this.router.navigate([`user/applications/noncommercial/${data.appControlNumber}`]);
        }
      },
      (e: any) => {
        this.applicationService.handleStatusCode(e[0]);
      }
    );
  }

  onSubmit(form) {
    this.submitted = true;
    this.applicationFieldsService.touchAllFields(this.applicationForm);
    if (!form.valid || this.dateStatus.hasErrors) {
      this.applicationFieldsService.scrollToFirstError();
    } else {
      if (this.applicationFieldsService.editApplication) {
        this.updateApplication();
      } else {
        this.createApplication();
      }
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
