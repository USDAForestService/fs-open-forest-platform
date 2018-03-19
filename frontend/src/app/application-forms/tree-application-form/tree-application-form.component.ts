import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { alphanumericValidator } from '../validators/alphanumeric-validation';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { currencyValidator } from '../validators/currency-validation';
import { lessThanOrEqualValidator } from '../validators/less-than-or-equal-validation';
import { ChristmasTreesService } from '../../trees/_services/christmas-trees.service';
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
    private christmasTreesService: ChristmasTreesService,
    public util: UtilService,
    private winRef: WindowRef
  ) {}

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

  createForm(data, formBuilder) {
    this.applicationForm = this.getApplicationForm(formBuilder, data.forest.maxNumTrees);

    this.applicationForm.get('forestId').setValue(data.forest.id);
    this.applicationForm.get('forestAbbr').setValue(data.forest.forestAbbr);
    this.applicationForm.get('orgStructureCode').setValue(data.forest.orgStructureCode);
    this.costPerTree = data.forest.treeCost;
    this.applicationForm.get('treeCost').setValue(this.costPerTree);
    this.maxNumberOfTrees = data.forest.maxNumTrees;
    this.applicationRulesForm = formBuilder.group({ acceptRules: [false, [Validators.required]] });

    if (this.permit) {
      this.rePopulateForm();
      //let status;
      // if (this.permit.status === 'Initiated') {
      //   status = 'Completed';
      // } else if (this.permit.status !== 'Cancelled' && this.permit.status !== 'Error') {
      //   status = 'Cancelled';
      // }
      // this.applicationService.updatePermit(this.permit.permitId, 'Completed').subscribe(response => {
      //   this.permit = response.permit;
      // });
    }

    this.applicationForm.get('quantity').valueChanges.subscribe(value => {
      this.quantityChange(value);
    });
  }

  checkSeasonStartDate(forest) {
    if (forest && moment(forest.startDate).isAfter(moment().tz(forest.timezone))) {
      this.router.navigate(['/christmas-trees/forests/', forest.forestAbbr]);
    }
  }

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
        this.jwtToken = params.t
      }
    });

    this.route.data.subscribe(data => {
      if (data.forest) {
        this.forest = data.forest;

        if (this.forest) {
          this.christmasTreesService.updateMarkdownText(this.markdownService, this.forest);
        }

        this.checkSeasonStartDate(this.forest);
        this.permit = data.permit;
        //cancel any permits coming here that are still initiated and not yet completed
        if (this.permit && isCancel && this.permit.status === 'Initiated') {
          this.applicationService.updatePermit(this.permit.permitId, 'Cancelled', this.jwtToken).subscribe(updated => {
            this.permit = updated;
            this.showCancelAlert = true;
          });
        }

        this.titleService.setTitle(
          'Buy a permit | ' + this.forest.forestName + ' | U.S. Forest Service Christmas Tree Permitting'
        );
        this.createForm(data, this.formBuilder);
      }
    });
  }

  onSubmit() {
    this.applicationFieldsService.touchAllFields(this.applicationRulesForm);
    if (this.applicationRulesForm.valid) {
      this.createApplication();
    } else {
      this.applicationFieldsService.scrollToFirstError();
    }
  }

  showRulesForm() {
    this.submitted = true;
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

  rePopulateForm() {
    this.applicationForm.get('firstName').setValue(this.permit.firstName);
    this.applicationForm.get('lastName').setValue(this.permit.lastName);
    this.applicationForm.get('emailAddress').setValue(this.permit.emailAddress);
    this.applicationForm.get('quantity').setValue(this.permit.quantity);
    this.applicationRulesForm.get('acceptRules').setValue(false);
    this.quantityChange(this.permit.quantity);
    this.showRules = false;
  }

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

  updateTotalCost() {
    const quantity = this.applicationForm.get('quantity').value;
    if (!isNaN(parseInt(quantity, 10))) {
      this.applicationForm.get('totalCost').setValue(parseInt(quantity, 10) * this.costPerTree);
    } else {
      this.applicationForm.get('totalCost').setValue(0);
    }
  }
}
