import { Component, OnInit } from '@angular/core';

import { NoncommercialGroup } from './_models/noncommercial-group';
import { ApplicationNoncommercialGroupService } from './application-noncommercial-group-service';

@Component({
  selector: 'app-application-noncommercial-group',
  templateUrl: './application-noncommercial-group.component.html',
  providers: [ ApplicationNoncommercialGroupService ],
  styleUrls: ['./application-noncommercial-group.component.scss']
})
export class ApplicationNoncommercialGroupComponent implements OnInit {

  errorMessage: string;
  mode = 'Observable';

  application = {
   'region': '11',
   'forest': '11',
   'district': '11',
   'authorizingOfficerName': 'string',
   'authorizingOfficerTitle': 'string',
   'eventName': 'string',
   'applicantInfo': {
     'name': 'string',
     'secondaryName': 'string',
     'firstName': 'string',
     'lastName': 'string',
     'dayPhone': {
       'areaCode': 555,
       'prefix': 555,
       'number': 5555,
       'phoneType': ''
     },
     'eveningPhone': {
       'areaCode': 555,
       'prefix': 555,
       'number': 5555,
       'phoneType': ''
     },
     'emailAddress': 'test@test.com',
     'mailingAddress': 'string',
     'mailingAddress2': 'string',
     'mailingCity': 'string',
     'mailingState': 'string',
     'mailingZIP': '55555',
     'secondaryMailingAddress': 'string',
     'secondaryMailingAddress2': 'string',
     'secondaryMailingCity': 'string',
     'secondaryMailingState': 'string',
     'secondaryMailingZIP': '55555',
     'organizationName': 'string',
     'website': 'string',
     'orgType': 'Individual'
   },
   'type': 'noncommercial',
   'noncommercialFields': {
     'activityDescription': 'string',
     'locationDescription': 'string',
     'startDateTime': '2018-01-01T01:01:01Z',
     'endDateTime': '2018-01-01T01:01:01Z',
     'startMonth': '01',
     'startDay': '01',
     'startYear': '2018',
     'endMonth': '01',
     'endDay': '01',
     'endYear': '2018',
     'startHour': '01',
     'startMinutes': '01',
     'startPeriod': 'AM',
     'endHour': '01',
     'endMinutes': '01',
     'endPeriod': 'AM',
     'numberParticipants': 0
   }
 };

  primaryPermitHolderSameAddress = true;
  secondaryPermitHolderSameAddress = true;
  submitted = false;



  states = [
    'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI',
    'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN',
    'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH',
    'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA',
    'WI', 'WV', 'WY', 'AS', 'GU', 'MP', 'PR', 'VI', 'UM', 'FM', 'MH', 'PW'
  ];

  hours = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  minutes = ['00', '15', '30', '45'];

  constructor(private applicationNoncommercialGroupService: ApplicationNoncommercialGroupService) { }

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
      this.applicationNoncommercialGroupService.create(this.application)
        .subscribe(
          () => {
            console.log('success');
          }
        );
    }
  }


  ngOnInit() {

  }

}
