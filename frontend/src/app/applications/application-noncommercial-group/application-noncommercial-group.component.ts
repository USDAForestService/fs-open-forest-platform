import { SpecialUseApplication } from '../../_models/special-use-application';
import { ApplicationService } from '../../_services/application.service';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { Component, OnInit } from '@angular/core';
import { DateTimeRangeComponent } from '../fields/date-time-range.component';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
    private applicationService: ApplicationService,
    private applicationFieldsService: ApplicationFieldsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.applicationForm = this.formBuilder.group({
      district: ['11', [Validators.required]],
      region: ['06', [Validators.required]],
      forest: ['05', [Validators.required]],
      type: ['noncommercial', [Validators.required]],
      eventName: ['', [Validators.required]],
      signature: ['', [Validators.required]],
      applicantInfo: this.formBuilder.group({
        addSecondaryPermitHolder: [false],
        emailAddress: ['', Validators.required],
        organizationName: [''],
        orgType: ['Person', Validators.required],
        primaryAddressSameAsOrganization: [true],
        primaryFirstName: ['', [Validators.required]],
        primaryLastName: ['', [Validators.required]],
        secondaryAddressSameAsPrimary: [true],
        secondaryFirstName: [''],
        secondaryLastName: [''],
        website: ['']
      })
    });

    this.applicationForm.get('applicantInfo.orgType').valueChanges.subscribe(type => {
      if (type === 'Person') {
        this.applicationFieldsService.removeAddress(this.applicationForm.get('applicantInfo'), 'organizationAddress');
        this.applicationForm.get('applicantInfo.organizationName').setValidators(null);
      } else if (type === 'Corporation') {
        this.applicationFieldsService.removeAddress(this.applicationForm.get('applicantInfo'), 'primaryAddress');
        this.applicationForm.get('applicantInfo.organizationName').setValidators(Validators.required);
      }
    });

    this.applicationForm.get('applicantInfo.primaryAddressSameAsOrganization').valueChanges.subscribe(value => {
      if (value) {
        this.applicationFieldsService.removeAddress(this.applicationForm.get('applicantInfo'), 'primaryAddress');
      } else {
        this.applicationFieldsService.addAddress(this.applicationForm.get('applicantInfo'), 'primaryAddress');
      }
    });

    this.applicationForm.get('applicantInfo.secondaryAddressSameAsPrimary').valueChanges.subscribe(value => {
      if (value) {
        this.applicationFieldsService.removeAddress(this.applicationForm.get('applicantInfo'), 'secondaryAddress');
      } else {
        this.applicationFieldsService.addAddress(this.applicationForm.get('applicantInfo'), 'secondaryAddress');
      }
    });

    this.applicationForm.get('applicantInfo.addSecondaryPermitHolder').valueChanges.subscribe(value => {
      if (value) {
        this.applicationForm.get('applicantInfo.secondaryFirstName').setValidators(Validators.required);
        this.applicationForm.get('applicantInfo.secondaryLastName').setValidators(Validators.required);
      } else {
        this.applicationForm.get('applicantInfo.secondaryFirstName').setValidators(null);
        this.applicationForm.get('applicantInfo.secondaryLastName').setValidators(null);
      }
    });
  }

  updateDateStatus(dateStatus: any): void {
    this.dateStatus = dateStatus;
  }

  onSubmit(form) {
    this.submitted = true;
    this.applicationFieldsService.touchAllFields(this.applicationForm);
    if (!form.valid || this.dateStatus.hasErrors) {
      this.applicationFieldsService.scrollToFirstError();
    } else {
      this.applicationService
        .create(JSON.stringify(this.applicationForm.value), '/special-uses/noncommercial/')
        .subscribe(
          persistedApplication => {
            this.router.navigate([`applications/noncommercial/submitted/${persistedApplication.applicationId}`]);
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
