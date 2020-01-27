import { alphanumericValidator } from '../validators/alphanumeric-validation';
import { applicationTypeValidator } from '../validators/application-type-validation';
import { numberValidator } from '../validators/number-validation';
import { urlValidator } from '../validators/url-validation';
import { ApplicationService } from '../../_services/application.service';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { emailConfirmationValidator } from '../validators/email-confirmation-validation';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../_services/alert.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { SpecialUseInfoService } from '../../_services/special-use-info.service';

@Component({
  selector: 'app-application-noncommercial-group',
  templateUrl: './application-noncommercial-group.component.html'
})
export class ApplicationNoncommercialGroupComponent implements OnInit {
  apiErrors: any;
  application: any = {};
  currentSection: any;
  forest = this.specialUseInfoService.getOne('0605');
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
    private specialUseInfoService: SpecialUseInfoService,
    private applicationService: ApplicationService,
    public applicationFieldsService: ApplicationFieldsService,
    private authentication: AuthenticationService,
    public renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private meta: Meta
  ) {
    this.meta.addTag({
      name: 'description',
      content: 'Apply for a noncommercial group\
 use permit on the Mount Baker Snoqualmie\
 National Forest with Open Forest.'
    });
    this.applicationForm = new FormGroup({
      acceptPII: new FormControl()
    });
    this.applicationForm = this.formBuilder.group({
      acceptPII: [false, Validators.required],
      appControlNumber: ['', [Validators.maxLength(255)]],
      applicationId: ['', [Validators.maxLength(255)]],
      createdAt: ['', [Validators.maxLength(255)]],
      applicantMessage: ['', [Validators.maxLength(255)]],
      status: ['', [Validators.maxLength(255)]],
      authEmail: ['', [Validators.maxLength(255)]],
      authorizingOfficerName: ['', [Validators.maxLength(255)]],
      authorizingOfficerTitle: ['', [Validators.maxLength(255)]],
      revisions: [''],
      district: ['11', [Validators.required, Validators.maxLength(2), numberValidator()]],
      region: ['06', [Validators.required, Validators.maxLength(2), numberValidator()]],
      forest: ['05', [Validators.required, Validators.maxLength(2), numberValidator()]],
      type: ['noncommercial', [Validators.required, applicationTypeValidator(), Validators.maxLength(255)]],
      eventName: ['', [Validators.required, alphanumericValidator(), Validators.maxLength(255)]],
      signature: ['', [Validators.required, Validators.maxLength(3), alphanumericValidator()]],
      applicantInfo: this.formBuilder.group({
        addAdditionalPhone: [false],
        addSecondaryPermitHolder: [false],
        emailAddress: ['', [Validators.required, Validators.email, alphanumericValidator(), Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'), Validators.maxLength(255)]],
        emailAddressConfirmation: [
          '', [Validators.required, Validators.email, alphanumericValidator(), Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
          ), Validators.maxLength(255)]],
        organizationName: ['', [alphanumericValidator(), Validators.maxLength(30)]],
        orgType: ['Person', [Validators.required, Validators.maxLength(255)]],
        primaryAddressSameAsOrganization: [true],
        primaryFirstName: ['', [Validators.required, Validators.maxLength(255), alphanumericValidator()]],
        primaryLastName: ['', [Validators.required, Validators.maxLength(255), alphanumericValidator()]],
        secondaryAddressSameAsPrimary: [true],
        secondaryFirstName: ['', [alphanumericValidator(), Validators.maxLength(255)]],
        secondaryLastName: ['', [alphanumericValidator(), Validators.maxLength(255)]],
        website: ['', [urlValidator(), Validators.maxLength(255)]]
      },
      {validator: emailConfirmationValidator('emailAddress', 'emailAddressConfirmation')}),
    });
  }

  addressChangeListeners() {
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
      this.applicationFieldsService.removeAddressValidation(
        this.applicationForm.get('applicantInfo'),
        'organizationAddress'
      );
      this.applicationFieldsService.updateValidators(
        this.applicationForm.get('applicantInfo.organizationName'),
        false
      );
    } else if (type === 'Corporation') {
      this.applicationFieldsService.addAddressValidation(
        this.applicationForm.get('applicantInfo'),
        'organizationAddress'
      );
      this.applicationFieldsService.updateValidators(
        this.applicationForm.get('applicantInfo.organizationName'),
        true,
        30
      );
    }
  }

  public elementInView({ target, visible }: { target: Element; visible: boolean }): void {
    this.renderer.addClass(target, visible ? 'in-view' : 'inactive');
    this.renderer.removeClass(target, visible ? 'inactive' : 'in-view');

    const viewableElements = document.getElementsByClassName('in-view');
    if (viewableElements.length) {
      this.currentSection = viewableElements[viewableElements.length - 1].id;
    }
  }

  /**
  * @param type  Address type and name of address field group, e.g. primaryAddress
  * @param Value  Boolean that determines if address fields should be required or not.
  *  This function removes the address validation or adds the address validations if the fields are required.
  */

  addRemoveAddress(type, value) {
    if (value) {
      this.applicationFieldsService.removeAddressValidation(this.applicationForm.get('applicantInfo'), type);
    } else {
      this.applicationFieldsService.addAddressValidation(this.applicationForm.get('applicantInfo'), type);
    }
  }

  addSecondaryPermitHolder(value) {
    if (value) {
      this.applicationFieldsService.updateValidators(
        this.applicationForm.get('applicantInfo.secondaryFirstName'),
        true,
        255
      );
      this.applicationFieldsService.updateValidators(
        this.applicationForm.get('applicantInfo.secondaryLastName'),
        true,
        255
      );
    } else {
      this.applicationFieldsService.updateValidators(
        this.applicationForm.get('applicantInfo.secondaryFirstName'),
        false
      );
      this.applicationFieldsService.updateValidators(
        this.applicationForm.get('applicantInfo.secondaryLastName'),
        false
      );
    }
  }

  updateDateStatus(dateStatus: any): void {
    this.dateStatus = dateStatus;
  }

  getApplication(id) {
    this.applicationService.getOne(id, `/special-uses/noncommercial/`).subscribe(
      application => {
        this.application = application;
        this.applicationForm.patchValue(application);
      },
      (e: any) => {
        this.apiErrors = e;
        window.scrollTo(0, 200);
      }
    );
  }

  createApplication() {
    this.applicationService
      .create(JSON.stringify(this.applicationForm.value), '/special-uses/noncommercial/')
      .subscribe(
        (persistedApplication: any) => {
          this.router.navigate([`mbs/applications/noncommercial/submitted/${persistedApplication.appControlNumber}`]);
        },
        (e: any) => {
          this.apiErrors = e;
          window.scroll(0, 0);
        }
      );
  }

  updateApplication() {
    this.applicationService.update(this.applicationForm.value, 'noncommercial').subscribe(
      (data: any) => {
        this.alertService.addSuccessMessage('Permit application was successfully updated.');
        if (this.authentication.isAdmin()) {
          this.router.navigate([`admin/applications/noncommercial/${data.appControlNumber}`]);
        } else {
          this.router.navigate([`user/applications/noncommercial/${data.appControlNumber}`]);
        }
      },
      (e: any) => {
        this.apiErrors = e;
        window.scroll(0, 0);
      }
    );
  }

  removeUnusedData() {
    const form = this.applicationForm;
    const service = this.applicationFieldsService;
    if (form.get('applicantInfo.orgType').value === 'Person') {
      form.get('applicantInfo.organizationName').setValue('');
      form.get('applicantInfo.website').setValue('');
      service.removeAddress(form.get('applicantInfo'), 'organizationAddress');
    }
    if (!form.get('applicantInfo.addSecondaryPermitHolder').value) {
      form.get('applicantInfo.secondaryFirstName').setValue('');
      form.get('applicantInfo.secondaryLastName').setValue('');
    }
    if (form.get('applicantInfo.secondaryAddressSameAsPrimary').value) {
      service.removeAddress(form.get('applicantInfo'), 'secondaryAddress');
    }
    if (!form.get('applicantInfo.addAdditionalPhone').value) {
      service.removeAdditionalPhone(form.get('applicantInfo'));
    }
  }

  onSubmit(form) {
    this.submitted = true;
    if (form.get('applicantInfo.orgType').value === 'Corporation' && form.get('applicantInfo.primaryAddressSameAsOrganization').value) {
      this.applicationFieldsService.copyValues(
        form.get('applicantInfo'),
        'organizationAddress',
        'primaryAddress'
      );
    }
    this.applicationFieldsService.touchAllFields(this.applicationForm);
    if (!form.valid || this.dateStatus.hasErrors) {
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

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.getApplication(params['id']);
        this.applicationFieldsService.setEditApplication(true);
      } else {
        this.applicationFieldsService.setEditApplication(false);
      }
    });
    this.addressChangeListeners();
  }
}
