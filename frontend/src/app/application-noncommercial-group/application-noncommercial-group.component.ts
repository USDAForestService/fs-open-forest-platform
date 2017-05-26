import { Component, OnInit } from '@angular/core';

import { ApplicationService } from '../admin/application.service';

import { Application } from '../admin/application';

import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-application-noncommercial-group',
  templateUrl: './application-noncommercial-group.component.html',
  providers: [ ApplicationService ],
  styleUrls: ['./application-noncommercial-group.component.scss']
})
export class ApplicationNoncommercialGroupComponent implements OnInit {

  apiErrors: any;
  mode = 'Observable';
  application = new Application();
  forest = 'Mt. Baker-Snoqualmie National Forest';
  primaryPermitHolderSameAddress = true;
  viewSecondaryPermitHolder = false;
  secondaryPermitHolderSameAddress = true;
  submitted = false;

  states = [
    {short: 'AK', long: 'Alabama'},
    {short: 'AL', long: 'Alaska'},
    {short: 'AR', long: 'Arizona'},
    {short: 'AZ', long: 'Arkansas'},
    {short: 'CA', long: 'California'},
    {short: 'CO', long: 'Colorado'},
    {short: 'CT', long: 'Connecticut'},
    {short: 'DE', long: 'Delaware'},
    {short: 'FL', long: 'Florida'},
    {short: 'GA', long: 'Georgia'},
    {short: 'HI', long: 'Hawaii'},
    {short: 'ID', long: 'Idaho'},
    {short: 'IL', long: 'Illinois'},
    {short: 'IN', long: 'Indiana'},
    {short: 'IA', long: 'Iowa'},
    {short: 'KS', long: 'Kansas'},
    {short: 'KY', long: 'Kentucky'},
    {short: 'LA', long: 'Louisiana'},
    {short: 'ME', long: 'Maine'},
    {short: 'MD', long: 'Maryland'},
    {short: 'MA', long: 'Massachusetts'},
    {short: 'MI', long: 'Michigan'},
    {short: 'MN', long: 'Minnesota'},
    {short: 'MS', long: 'Mississippi'},
    {short: 'MO', long: 'Missouri'},
    {short: 'MT', long: 'Montana'},
    {short: 'NE', long: 'Nebraska'},
    {short: 'NV', long: 'Nevada'},
    {short: 'NH', long: 'New Hampshire'},
    {short: 'NJ', long: 'New Jersey'},
    {short: 'NM', long: 'New Mexico'},
    {short: 'NY', long: 'New York'},
    {short: 'NC', long: 'North Carolina'},
    {short: 'ND', long: 'North Dakota'},
    {short: 'OH', long: 'Ohio'},
    {short: 'OK', long: 'Oklahoma'},
    {short: 'OR', long: 'Oregon'},
    {short: 'PA', long: 'Pennsylvania'},
    {short: 'RI', long: 'Rhode Island'},
    {short: 'SC', long: 'South Carolina'},
    {short: 'SD', long: 'South Dakota'},
    {short: 'TN', long: 'Tennessee'},
    {short: 'TX', long: 'Texas'},
    {short: 'UT', long: 'Utah'},
    {short: 'VT', long: 'Vermont'},
    {short: 'VA', long: 'Virginia'},
    {short: 'WA', long: 'Washington'},
    {short: 'WV', long: 'West Virginia'},
    {short: 'WI', long: 'Wisconsin'},
    {short: 'WY', long: 'Wyoming'}
  ];

  hours = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  minutes = ['00', '15', '30', '45'];

  constructor(private applicationService: ApplicationService, private router: Router) { }

  startDateChangeHandler() {
    if (
      this.application.noncommercialFields.startMonth &&
      this.application.noncommercialFields.startDay &&
      this.application.noncommercialFields.startYear &&
      !this.application.noncommercialFields.endMonth &&
      !this.application.noncommercialFields.endDay &&
      !this.application.noncommercialFields.endYear
    ) {
      this.application.noncommercialFields.endMonth = this.application.noncommercialFields.startMonth;
      this.application.noncommercialFields.endDay = this.application.noncommercialFields.startDay;
      this.application.noncommercialFields.endYear = this.application.noncommercialFields.startYear;
    }
  }

  onSubmit(form) {
    if (!form.valid) {
      window.scroll(0, 0);
    } else {
      console.log('submit');
      this.applicationService.create(this.application, '/special-uses/noncommercial/')
        .subscribe(
          () => {
            this.router.navigate(['applications/submitted']);
          },
          (e: any) => {
            this.apiErrors =  e;
            window.scroll(0, 0);
          }
        );
    }
  }

  ngOnInit() {
    this.application.district = '11';
    this.application.region = '11';
    this.application.forest = '11';
    this.application.type = 'noncommercial';
    this.application.applicantInfo.orgType = 'Individual';
    this.application.noncommercialFields.startMinutes = '00';
    this.application.noncommercialFields.endMinutes = '00';
    this.application.noncommercialFields.startDateTime = '2018-01-01T01:01:01Z';
    this.application.noncommercialFields.endDateTime = '2018-01-01T01:01:01Z';

  }

}
