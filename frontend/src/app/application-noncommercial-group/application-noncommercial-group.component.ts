import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-noncommercial-group',
  templateUrl: './application-noncommercial-group.component.html',
  styleUrls: ['./application-noncommercial-group.component.scss']
})
export class ApplicationNoncommercialGroupComponent implements OnInit {

  application = {};
  applicantType = 'individual';
  primaryPermitHolderSameAddress = true;
  secondaryPermitHolderSameAddress = true;

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

  onSubmit() {
    console.log('submit');
  }

  constructor() { }

  ngOnInit() { }

}
