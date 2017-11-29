import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { alphanumericValidator } from '../../application-forms/validators/alphanumeric-validation';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  applicationForm: FormGroup;
  successURL: any;
  failureURL: any;

  constructor(public formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,  private router: Router) {

    this.applicationForm = this.formBuilder.group({
      paymentAmount: ['', [Validators.required, alphanumericValidator()]],
      cardholderName: ['', [Validators.required, alphanumericValidator()]],
      cardholderBillingAddress  : ['', [Validators.required, alphanumericValidator()]],
      cardholderBillingAddress2  : ['', [Validators.required, alphanumericValidator()]],
      cardholderCity  : ['', [Validators.required, alphanumericValidator()]],
      cardholderCountry  : ['', [Validators.required, alphanumericValidator()]],
      cardholderState  : ['', [Validators.required, alphanumericValidator()]],
      cardholderZip  : ['', [Validators.required, Validators.pattern(/(\d{5}|\d{9})/)]],
      cardNumber  : ['', [Validators.required, Validators.pattern(/(\d{8,19})/)]],
      cardExpirationMonth  : ['', [Validators.required]],
      cardExpirationYear  : ['', [Validators.required]],
      cardSecurityCode  : ['', [Validators.required, Validators.pattern(/(\d{3,4})/)]],
      formName  : ['', [Validators.required, alphanumericValidator()]],
      applicantName  : ['', [Validators.required, alphanumericValidator()]],
      applicantEmailAddress  : ['', [Validators.required, alphanumericValidator()]],
      selectedOption  : ['', [Validators.required, alphanumericValidator()]],
      description  : ['', [Validators.required, alphanumericValidator()]],
      amountOwed  : ['', [Validators.required, alphanumericValidator()]]
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
      this.successURL = params[''];
      this.failureURL = params[''];
    });
    this.applicationForm.get('paymentAmount').disable();
  }

  cancelButtonClick() {}
  submitButtonClick() {}

}
