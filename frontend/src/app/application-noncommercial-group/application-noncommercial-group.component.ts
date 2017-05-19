import { Component, OnInit } from '@angular/core';

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
   'authorizingOfficerName': '',
   'authorizingOfficerTitle': '',
   'eventName': '',
   'applicantInfo': {
     'name': '',
     'secondaryName': '',
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
     'mailingAddress': '',
     'mailingAddress2': '',
     'mailingCity': '',
     'mailingState': '',
     'mailingZIP': '',
     'primaryPermitHolderName': '',
     'primaryMailingAddress': '',
     'primaryMailingAddress2': '',
     'primaryMailingCity': '',
     'primaryMailingState': '',
     'primaryMailingZIP': '',
     'secondaryMailingAddress': '',
     'secondaryMailingAddress2': '',
     'secondaryMailingCity': '',
     'secondaryMailingState': '',
     'secondaryMailingZIP': '',
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
