import { Component, OnInit } from '@angular/core';

import { ApplicationService } from '../admin/application.service';

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

  application = {
   'region': '11',
   'forest': '11',
   'district': '11',
   'authorizingOfficerName': '',
   'authorizingOfficerTitle': '',
   'eventName': '',
   'applicantInfo': {
     'name': '',
     'firstName': '',
     'lastName': '',
     'dayPhone': {
       'areaCode': '',
       'prefix': '',
       'number': '',
       'phoneType': ''
     },
     'eveningPhone': {
       'areaCode': '',
       'prefix': '',
       'number': '',
       'phoneType': ''
     },
     'emailAddress': '',
     'address': {
       'mailingAddress': '',
       'mailingAddress2': '',
       'mailingCity': '',
       'mailingState': '',
       'mailingZIP': '',
     },
     'primaryAddress': {
       'mailingAddress': '',
       'mailingAddress2': '',
       'mailingCity': '',
       'mailingState': '',
       'mailingZIP': '',
     },
     'secondaryFirstName': '',
     'secondaryLastName': '',
     'secondaryAddress': {
       'mailingAddress': '',
       'mailingAddress2': '',
       'mailingCity': '',
       'mailingState': '',
       'mailingZIP': '',
     },
     'organizationName': '',
     'website': '',
     'orgType': 'Individual'
   },
   'type': 'noncommercial',
   'noncommercialFields': {
     'activityDescription': '',
     'locationDescription': '',
     'startDateTime': '2018-01-01T01:01:01Z',
     'endDateTime': '2018-01-01T01:01:01Z',
     'startMonth': '',
     'startDay': '',
     'startYear': '',
     'endMonth': '',
     'endDay': '',
     'endYear': '',
     'startHour': '',
     'startMinutes': '',
     'startPeriod': 'AM',
     'endHour': '',
     'endMinutes': '',
     'endPeriod': 'AM',
     'numberParticipants': ''
    }
  };

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
            console.log('success');
            this.router.navigate(['application-noncommercial-group/submitted']);
          },
          (e: any) => {
            this.apiErrors =  e;
            window.scroll(0, 0);
          }
        );
    }
  }

  ngOnInit() {

  }

}
