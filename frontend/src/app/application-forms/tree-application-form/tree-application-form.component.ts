import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { alphanumericValidator } from '../validators/alphanumeric-validation';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { currencyValidator } from '../validators/currency-validation';
import { lessThanOrEqualValidator } from '../validators/less-than-or-equal-validation';
import { TreesService } from '../../trees/_services/trees.service';
import { ApplicationService } from '../../_services/application.service';

@Component({
  selector: 'app-tree-application-form',
  templateUrl: './tree-application-form.component.html'
})
export class TreeApplicationFormComponent implements OnInit {
  forest: any;
  submitted: boolean = false;
  application: any;
  applicationForm: FormGroup;
  maxNumberOfTrees = 5;
  costPerTree = 10;
  apiErrors: any;

  constructor(
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public applicationService: ApplicationService,
    private treesService: TreesService
  ) {
    this.applicationForm = this.formBuilder.group({
      forestId: ['', [Validators.required]],
      orgStructureCode: ['', [Validators.required]],
      treeCost: [this.costPerTree],
      firstName: ['', [Validators.required, alphanumericValidator(), Validators.maxLength(255)]],
      lastName: ['', [Validators.required, alphanumericValidator(), Validators.maxLength(255)]],
      emailAddress: ['', [Validators.required, Validators.email, alphanumericValidator(), Validators.maxLength(255)]],
      quantity: ['', [Validators.required, lessThanOrEqualValidator(this.maxNumberOfTrees)]],
      totalCost: [0, [Validators.required, currencyValidator()]]
    });
    this.applicationForm.get('quantity').valueChanges.subscribe(value => {
      this.updateTotalCost();
    });
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.forest = data.forest;
      this.applicationForm.get('forestId').setValue(data.forest.id);
      this.applicationForm.get('orgStructureCode').setValue(data.forest.orgStructureCode);
      this.costPerTree = data.forest.treeCost;
      this.maxNumberOfTrees = data.forest.maxNumTrees;
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.applicationForm.valid) {
      this.createApplication();
      alert('Permit application saved');
    } else {
      this.submitted = false;
      window.scroll(0, 0);
    }
  }

  createApplication() {
    this.applicationService.create(JSON.stringify(this.applicationForm.value), '/christmas-trees').subscribe(
      persistedApplication => {
        this.application = persistedApplication;
      },
      (e: any) => {
        this.apiErrors = e;
        window.scroll(0, 0);
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
