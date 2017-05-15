import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-noncommercial-group',
  templateUrl: './application-noncommercial-group.component.html',
  styleUrls: ['./application-noncommercial-group.component.scss']
})
export class ApplicationNoncommercialGroupComponent implements OnInit {

  application = {
    startMonth: undefined,
    startDay: undefined,
    startYear: undefined,
    endMonth: undefined,
    endDay: undefined,
    endYear: undefined,
  };

  applicantType = 'individual';
  primaryPermitHolderSameAddress = true;
  secondaryPermitHolderSameAddress = true;
  submitted = false;

  states = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire ',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
  ];

  hours = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  minutes = ['00', '15', '30', '45'];

  startDateChangeHandler() {
    if (
      this.application.startMonth &&
      this.application.startDay &&
      this.application.startYear &&
      !this.application.endMonth &&
      !this.application.endDay &&
      !this.application.endYear
    ) {
      this.application.endMonth = this.application.startMonth;
      this.application.endDay = this.application.startDay;
      this.application.endYear = this.application.startYear;
    }
  }

  onSubmit(form) {
    if (!form.valid) {
      window.scroll(0, 0);
    } else {
      console.log('submit');
    }
  }

  constructor() { }

  ngOnInit() { }

}
