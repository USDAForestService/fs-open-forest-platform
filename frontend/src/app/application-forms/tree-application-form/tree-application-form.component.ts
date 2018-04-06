import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { alphanumericValidator } from '../validators/alphanumeric-validation';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { currencyValidator } from '../validators/currency-validation';
import { lessThanOrEqualValidator } from '../validators/less-than-or-equal-validation';
import { ChristmasTreesInfoService } from '../../trees/_services/christmas-trees-info.service';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { ChristmasTreesApplicationService } from '../../trees/_services/christmas-trees-application.service';
import { UtilService } from '../../_services/util.service';
import * as moment from 'moment-timezone';
import { MarkdownService } from 'ngx-md';
import { WindowRef } from '../../_services/native-window.service';

@Component({
  selector: 'app-tree-application-form',
  templateUrl: './tree-application-form.component.html'
})
export class TreeApplicationFormComponent implements OnInit {
  forest: any;
  permit: any;
  submitted = false;
  application: any;
  applicationForm: FormGroup;
  applicationRulesForm: FormGroup;
  maxNumberOfTrees: number;
  costPerTree: number;
  apiErrors: any;
  showRules = false;
  jwtToken: string;
  showCancelAlert = false;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    public formBuilder: FormBuilder,
    public markdownService: MarkdownService,
    public applicationService: ChristmasTreesApplicationService,
    public applicationFieldsService: ApplicationFieldsService,
    private christmasTreesInfoService: ChristmasTreesInfoService,
    public util: UtilService,
    private winRef: WindowRef
  ) {}

  /**
   * Update total cost when quantity changes
   */
  quantityChange(value) {
    this.applicationForm
      .get('quantity')
      .setValidators([Validators.required, lessThanOrEqualValidator(this.maxNumberOfTrees, 1)]);
    if (!this.applicationForm.get('quantity').errors) {
      this.updateTotalCost();
    } else {
      this.applicationForm.get('totalCost').setValue(0);
    }
  }

  /**
   * @returns application form
   */
  getApplicationForm(formBuilder, maxNumTrees) {
    return formBuilder.group({
      forestId: ['', [Validators.required]],
      forestAbbr: [''],
      orgStructureCode: ['', [Validators.required]],
      treeCost: [''],
      firstName: ['', [Validators.required, alphanumericValidator(), Validators.maxLength(255)]],
      lastName: ['', [Validators.required, alphanumericValidator(), Validators.maxLength(255)]],
      emailAddress: ['', [Validators.required, Validators.email, alphanumericValidator(), Validators.maxLength(255)]],
      quantity: ['', [Validators.required, Validators.min(1), Validators.max(maxNumTrees)]],
      totalCost: [0, [Validators.required, currencyValidator()]]
    });
  }

  /**
   * Get application form and set default values
   */
  createForm(forest, formBuilder) {
    this.applicationForm = this.getApplicationForm(formBuilder, forest.maxNumTrees);

    this.applicationForm.get('forestId').setValue(forest.id);
    this.applicationForm.get('forestAbbr').setValue(forest.forestAbbr);
    this.applicationForm.get('orgStructureCode').setValue(forest.orgStructureCode);
    this.costPerTree = forest.treeCost;
    this.applicationForm.get('treeCost').setValue(this.costPerTree);
    this.maxNumberOfTrees = forest.maxNumTrees;
    this.applicationRulesForm = formBuilder.group({ acceptRules: [false, [Validators.required]] });

    if (this.permit) {
      this.rePopulateForm();
    }

    this.applicationForm.get('quantity').valueChanges.subscribe(value => {
      this.quantityChange(value);
    });
  }

  /**
   * Redirect to tree guidelines if forest start date is after today
   */
  checkSeasonStartDate(forest) {
    if (forest && moment(forest.startDate).isAfter(moment().tz(forest.timezone))) {
      this.router.navigate(['/christmas-trees/forests/', forest.forestAbbr]);
    }
  }

  /**
  * handle the data of an existing application
  */
  handleData(isCancel) {

    this.christmasTreesInfoService.updateMarkdownText(this.markdownService, this.forest);

    this.checkSeasonStartDate(this.forest);

    // cancel any permits coming here that are still initiated and not yet completed
    if (this.permit && isCancel && this.permit.status === 'Initiated') {
      this.applicationService.updatePermit(this.permit.permitId, 'Cancelled', this.jwtToken).subscribe(updated => {
        this.permit = updated;
        this.showCancelAlert = true;
      });
    }

    this.titleService.setTitle(
      'Buy a permit | ' + this.forest.forestName + ' | U.S. Forest Service Christmas Tree Permitting'
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
   * Submit application if valid, if not valid, scroll to first error
   */
  onSubmit() {
    this.applicationFieldsService.touchAllFields(this.applicationRulesForm);
    if (this.applicationRulesForm.valid) {
      this.createApplication();
    } else {
      this.applicationFieldsService.scrollToFirstError();
    }
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
      const routeOptions = { fragment: 'rules' };
      if (this.permit) {
        this.router.navigate(
          [`/christmas-trees/forests/${this.forest.forestAbbr}/applications`, this.permit.permitId],
          routeOptions
        );
      } else {
        this.router.navigate([`/christmas-trees/forests/${this.forest.forestAbbr}/applications`], routeOptions);
      }
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
    this.applicationForm.get('quantity').setValue(this.permit.quantity);
    this.applicationRulesForm.get('acceptRules').setValue(false);
    this.quantityChange(this.permit.quantity);
    this.showRules = false;
  }

  /**
   * Create application and redirect to pay.gov.
   * If errors, return to application form.
   */
  createApplication() {
    this.applicationService.create(JSON.stringify(this.applicationForm.value)).subscribe(
      response => {
        this.winRef.getNativeWindow().location.href = `${response.payGovUrl}?token=${response.token}&tcsAppID=${response.tcsAppID}`;
      },
      (error: any) => {
        this.showRules = false;
        window.location.hash = '';
        this.apiErrors = error;
        this.submitted = false;
        this.applicationRulesForm.get('acceptRules').setValue(false);
        this.winRef.getNativeWindow().scroll(0, 0);
      }
    );
  }

  /**
   * Calculate total cost based on quantity
   */
  updateTotalCost() {
    const quantity = this.applicationForm.get('quantity').value;
    if (!isNaN(parseInt(quantity, 10))) {
      this.applicationForm.get('totalCost').setValue(parseInt(quantity, 10) * this.costPerTree);
    } else {
      this.applicationForm.get('totalCost').setValue(0);
    }
  }
}
