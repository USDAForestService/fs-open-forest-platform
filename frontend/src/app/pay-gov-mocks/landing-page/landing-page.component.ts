import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  applicationForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {

    this.applicationForm = this.formBuilder.group({
      paymentAmount: ['$5.00', [Validators.required]],
      cardholderName: ['', [Validators.required]],
      cardholderBillingAddress  : ['', [Validators.required]],
      cardholderBillingAddress2  : ['', [Validators.required]],
      cardholderCity  : ['', [Validators.required]],
      cardholderCountry  : ['', [Validators.required]],
      cardholderState  : ['', [Validators.required]],
      cardholderZip  : ['', [Validators.required]],
      cardNumber  : ['', [Validators.required]],
      cardExpirationMonth  : ['', [Validators.required]],
      cardExpirationYear  : ['', [Validators.required]],
      cardSecurityCode  : ['', [Validators.required]],
      formName  : ['Chistmas Tree Permit - Shoshone National Forest', [Validators.required]],
      applicantName  : ['John Doe', [Validators.required]],
      applicantEmailAddress  : ['a@a.co', [Validators.required]],
      selectedOption  : ['Christmas Tree Permit', [Validators.required]],
      description  : ['Something', [Validators.required]],
      amountOwed  : ['$5.00', [Validators.required]]
    });

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.applicationForm.get('paymentAmount').setValue(params['']);
      this.applicationForm.get('formName').setValue(params['']);
      this.applicationForm.get('applicantName').setValue(params['']);
      this.applicationForm.get('applicantEmailAddress').setValue(params['']);
      this.applicationForm.get('selectedOption').setValue(params['']);
      this.applicationForm.get('description').setValue(params['']);
      this.applicationForm.get('amountOwed').setValue(params['']);
    });
    this.applicationForm.get('paymentAmount').disable();
  }

}
