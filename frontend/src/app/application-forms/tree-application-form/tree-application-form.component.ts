import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { alphanumericValidator } from '../validators/alphanumeric-validation';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { currencyValidator } from '../validators/currency-validation';
import { lessThanOrEqualValidator } from '../validators/less-than-or-equal-validation';
import { TreesService } from '../../trees/_services/trees.service';

@Component({
  selector: 'app-tree-application-form',
  templateUrl: './tree-application-form.component.html'
})
export class TreeApplicationFormComponent implements OnInit {
  id: any;
  forest: any;
  submitted: boolean;
  applicationForm: FormGroup;
  maxNumberOfTrees = 5;
  costPerTree = 10;

  constructor(private route: ActivatedRoute, public formBuilder: FormBuilder, private treesService: TreesService) {
    this.applicationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, alphanumericValidator(), Validators.maxLength(255)]],
      lastName: ['', [Validators.required, alphanumericValidator(), Validators.maxLength(255)]],
      emailAddress: ['', [Validators.required, Validators.email, alphanumericValidator(), Validators.maxLength(255)]],
      quantity: ['', [Validators.required, Validators.maxLength(1), lessThanOrEqualValidator(this.maxNumberOfTrees)]],
      totalCost: [0, [Validators.required, currencyValidator()]]
    });
    this.applicationForm.get('quantity').valueChanges.subscribe(value => {
      this.updateNumTrees();
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.route.data.subscribe(data => {
      this.forest = data.forest;
    });
    this.submitted = false;
  }
  onSubmit() {
    if (this.applicationForm.valid) {
      this.submitted = true;
    } else {
      this.submitted = false;
    }
  }
  updateNumTrees() {
    const quantity = this.applicationForm.get('quantity').value;
    if (!isNaN(parseInt(quantity, 10))) {
      this.applicationForm.get('totalCost').setValue(parseInt(quantity, 10) * this.costPerTree);
    } else {
      this.applicationForm.get('totalCost').setValue(0);
    }
  }
}
