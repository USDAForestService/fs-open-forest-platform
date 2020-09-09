import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { Location } from '@angular/common';
import * as moment from 'moment-timezone';
import { alphanumericValidator } from '../../../application-forms/validators/alphanumeric-validation';
import { lessThanOrEqualValidator } from '../../../application-forms/validators/less-than-or-equal-validation';
import { currencyValidator } from '../../../application-forms/validators/currency-validation';
import { emailConfirmationValidator } from '../../../application-forms/validators/email-confirmation-validation';
import { FirewoodInfoService } from '../../_services/firewood-info.service';
import { ApplicationFieldsService } from '../../../application-forms/_services/application-fields.service';
import { FirewoodApplicationService } from '../../_services/firewood-application.service';
import { UtilService } from '../../../_services/util.service';
import { WindowRef } from '../../../_services/native-window.service';

@Component({
  selector: 'app-buy-firewood-permit',
  templateUrl: './buy-firewood-permit.component.html'
})
export class BuyFirewoodPermitComponent implements OnInit {
  @Input() applicantInfo: FormGroup;
  forest: any;
  permit: any;
  submitted = false;
  application: any;
  applicationForm: FormGroup;
  costPerTree: number;
  apiErrors: any;
  showRules = false;
  jwtToken: string;
  showCancelAlert = false;
  totalCost: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private titleService: Title,
    public formBuilder: FormBuilder,
    public firewoodInfoService: FirewoodInfoService,
    public applicationService: FirewoodApplicationService,
    public applicationFieldsService: ApplicationFieldsService,
    public util: UtilService,
    private winRef: WindowRef,
    private meta: Meta
  ) {
    this.meta.addTag({
      name: 'description',
      content: `Purchase a Firewood permit with the United States Forest Service on your National Forest.`
    });
    this.applicationForm = new FormGroup({
      acceptPII: new FormControl(),
      numberOfCords: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
    });
    this.totalCost = 0.00;
  }

  /**
   * Update total cost when quantity changes
   */
  quantityChange(userInput) {
    const minCords = this.forest.minCords;
    const maxCords = this.forest.maxCords;
    this.applicationForm.get('numberOfCords').setValidators([
      Validators.required,
      lessThanOrEqualValidator(maxCords, minCords)
    ]);
    this.totalCost = userInput * this.forest.woodCost;
    this.applicationForm.get('totalCost').setValue(this.totalCost);
  }

  /**
   * @returns application form
   */
  getApplicationForm(formBuilder) {
    return formBuilder.group({
      acceptPII: [false, Validators.required],
      forestId: ['', [Validators.required]],
      forestAbbr: [''],
      firstName: ['', [Validators.required, Validators.maxLength(36), alphanumericValidator()]],
      lastName: ['', [Validators.required, Validators.maxLength(60), alphanumericValidator()]],
      orgStructureCode: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email, alphanumericValidator(), Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'), Validators.maxLength(255)]],
      emailAddressConfirmation: [
        '', [Validators.required, Validators.email, alphanumericValidator(), Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
        ), Validators.maxLength(255)]
      ],
      numberOfCords: ['', [Validators.required, lessThanOrEqualValidator(this.forest.maxCords, this.forest.minCords)]],
      totalCost: [0, [Validators.required, currencyValidator()]]
    },
    {validator: emailConfirmationValidator('emailAddress', 'emailAddressConfirmation')});
  }

  /**
   * Get application form and set default values
   */
  createForm(forest, formBuilder) {
    this.applicationForm = this.getApplicationForm(formBuilder);
    this.applicationForm.get('acceptPII').setValue(false);
    this.applicationForm.get('forestId').setValue(forest.id);
    this.applicationForm.get('orgStructureCode').setValue(forest.orgStructureCode);
    this.applicationForm.get('forestAbbr').setValue(forest.forestAbbr);

    if (this.permit) {
      this.rePopulateForm();
    }

    this.applicationForm.get('numberOfCords').valueChanges.subscribe(value => {
      this.quantityChange(value);
    });
  }

  /**
   * Redirect to tree guidelines if forest start date is after today
   */
  checkSeasonStartDate(forest) {
    // if (forest && moment(forest.startDate).isAfter(moment())) {
    //   this.router.navigate(['/christmas-trees/forests/', forest.forestAbbr]);
    // }
  }

  /**
  * handle the data of an existing application
  */
  handleData(isCancel) {
    this.checkSeasonStartDate(this.forest);

    // cancel any permits coming here that are still initiated and not yet completed
    if (this.permit && isCancel && this.permit.status === 'Initiated') {
      this.applicationService.updatePermit(this.permit.permitId, 'Cancelled', this.jwtToken).subscribe(updated => {
        this.permit = updated;
        this.showCancelAlert = true;
      });
    }

    this.titleService.setTitle(
      'Buy a Firewood permit | ' + this.forest.forestName + ' | U.S. Forest Service Open Forest'
    );
    this.createForm(this.forest, this.formBuilder);

  }

  /**
   * Get data from route resolver
   */
  ngOnInit() {
    this.winRef.getNativeWindow().location.hash = ''; // clear out the hash on reload

    this.location.subscribe(locationChange => {
      if (locationChange.type === 'hashchange') {
        // back button press from #rules
        this.showRules = false;
      }
    });
    let isCancel = false;
    this.route.queryParams.forEach((params: Params) => {
      if (params.cancel)  {
        isCancel = true;
      }

      if (params.t) {
        this.jwtToken = params.t;
      }
    });

    this.route.data.subscribe(data => {
      if (data.forest) {
        this.forest = data.forest;
        this.permit = data.permit;
        this.handleData(isCancel);
      }
    });
  }

  /**
   * If form is submitted, show rules
   * If permit already exists, redirect to permit view page
   * If errors, scroll to error
   */
  showRulesForm() {
    this.submitted = true;
    this.showCancelAlert = false;
    this.apiErrors = null;
    this.applicationFieldsService.touchAllFields(this.applicationForm);
    if (this.applicationForm.valid) {
      this.showRules = true;
      this.winRef.getNativeWindow().scroll(0, 200);
    } else {
      this.applicationFieldsService.scrollToFirstError();
    }
  }

  /**
   * Repopulate form if returning due to error after form has been completed.
   */
  rePopulateForm() {
    this.applicationForm.get('firstName').setValue(this.permit.firstName);
    this.applicationForm.get('lastName').setValue(this.permit.lastName);
    this.applicationForm.get('emailAddress').setValue(this.permit.emailAddress);
    this.applicationForm.get('numberOfCords').setValue(this.permit.numberOfCords);
    this.applicationForm.get('acceptPII').setValue(false);
    this.quantityChange(this.permit.numberOfCords);
    this.showRules = false;
  }

  /**
   * Create application and redirect to pay.gov.
   * If errors, return to application form.
   */
  createApplication() {
    const paramsWhitelist = [
      'forestId', 'firstName', 'lastName', 'emailAddress', 'numberOfCords'
    ];

    const formValuesToSend = Object.keys(this.applicationForm.value)
    .filter((key) => paramsWhitelist.includes(key))
    .reduce((aggregator, key) => {
      aggregator[key] = this.applicationForm.value[key];
      return aggregator;
    }, {});
    this.applicationService.create(JSON.stringify(formValuesToSend)).subscribe(
      (response: any) => {
        this.winRef.getNativeWindow().location.href = `${response.payGovUrl}?token=${response.token}&tcsAppID=${response.tcsAppID}`;
      },
      (error: any) => {
        this.showRules = false;
        window.location.hash = '';
        this.apiErrors = error;
        this.submitted = false;
        this.winRef.getNativeWindow().scroll(0, 0);
      }
    );
  }
}
