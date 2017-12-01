import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { alphanumericValidator } from '../../application-forms/validators/alphanumeric-validation';
import { Http, Response } from '@angular/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  applicationForm: FormGroup;
  successURL: any;
  failureURL: any;

  constructor(
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: Http
  ) {
    this.applicationForm = this.formBuilder.group({
      paymentAmount: ['', [Validators.required, alphanumericValidator()]],
      cardholderName: ['', [Validators.required, alphanumericValidator()]],
      cardholderBillingAddress: ['', [Validators.required, alphanumericValidator()]],
      cardholderBillingAddress2: ['', [Validators.required, alphanumericValidator()]],
      cardholderCity: ['', [Validators.required, alphanumericValidator()]],
      cardholderCountry: ['', [Validators.required, alphanumericValidator()]],
      cardholderState: ['', [Validators.required, alphanumericValidator()]],
      cardholderZip: ['', [Validators.required, Validators.pattern(/(\d{5}|\d{9})/)]],
      cardNumber: ['', [Validators.required, Validators.pattern(/(\d{8,19})/)]],
      cardExpirationMonth: ['', [Validators.required]],
      cardExpirationYear: ['', [Validators.required]],
      cardSecurityCode: ['', [Validators.required, Validators.pattern(/(\d{3,4})/)]],
      formName: ['', [Validators.required, alphanumericValidator()]],
      applicantName: ['', [Validators.required, alphanumericValidator()]],
      applicantEmailAddress: ['', [Validators.required, alphanumericValidator()]],
      selectedOption: ['', [Validators.required, alphanumericValidator()]],
      description: ['', [Validators.required, alphanumericValidator()]],
      amountOwed: ['', [Validators.required, alphanumericValidator()]]
    });
  }

  getApplicationData(url, token, appId) {
    return this.http
      .get(`${url}?token=${token}&tcsAppID=${appId}`, { withCredentials: true })
      .map((res: Response) => res.json());
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.getApplicationData(params['payGovUrl'], params['token'], params['tcsAppID']).subscribe(
        (data: any) => {
          this.applicationForm.get('paymentAmount').setValue(data['paymentAmount']);
          this.applicationForm.get('formName').setValue(data['formName']);
          this.applicationForm.get('applicantName').setValue(data['applicantName']);
          this.applicationForm.get('applicantEmailAddress').setValue(data['applicantEmailAddress']);
          this.applicationForm.get('selectedOption').setValue(data['selectedOption']);
          this.applicationForm.get('description').setValue(data['description']);
          this.applicationForm.get('amountOwed').setValue(data['amountOwed']);
        },
        (e: any) => {
          console.log(e);
        }
      );
    });
    this.applicationForm.get('paymentAmount').disable();
  }

  cancelButtonClick() {}
  submitButtonClick() {}
}
