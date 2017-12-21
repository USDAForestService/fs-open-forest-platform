import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { alphanumericValidator } from '../../application-forms/validators/alphanumeric-validation';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  applicationForm: FormGroup;
  successUrl: any;
  failureUrl: any;
  token: any;

  constructor(
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: Http,
    private httpClient: HttpClient
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
      cardNumber: ['', [Validators.required, Validators.pattern(/(\d{16})/)]],
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

  getApplicationData(token, appId) {
    return this.http
      .get(`${environment.apiUrl}mock-pay-gov?token=${token}&tcsAppID=${appId}`, { withCredentials: true })
      .map((res: Response) => res.json());
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.token = params['token'];
      this.getApplicationData(params['token'], params['tcsAppID']).subscribe(
        (data: any) => {
          this.applicationForm.get('paymentAmount').setValue(data['paymentAmount']);
          this.applicationForm.get('formName').setValue(data['formName']);
          this.applicationForm.get('applicantName').setValue(data['applicantName']);
          this.applicationForm.get('applicantEmailAddress').setValue(data['applicantEmailAddress']);
          this.applicationForm.get('selectedOption').setValue(data['selectedOption']);
          this.applicationForm.get('description').setValue(data['description']);
          this.applicationForm.get('amountOwed').setValue(data['amountOwed']);
          this.successUrl = data['successUrl'];
        },
        (e: any) => {
          console.log(e);
        }
      );
    });
    this.applicationForm.get('paymentAmount').disable();
    this.applicationForm.get('applicantEmailAddress').disable();
  }

  cancelButtonClick() {}
  submitButtonClick() {
    const cardNumber = this.applicationForm.get('cardNumber').value;
    const url = `${environment.apiUrl}mock-pay-gov-process`;
    const params = {
      token: this.token,
      cc: cardNumber
    };
    this.httpClient.post(url, params).subscribe();
    window.location.href = this.successUrl;
  }
}
