export class NoncommercialGroup {
  name = 'test';
  region = 'test';
  forest = 'test';
  district = 'test';
  authorizingOfficerName = 'test';
  authorizingOfficerTitle = 'test';
  //TODO put applicant info into own model
  // applicantInfo: ApplicantInfo[];
  firstName = 'test';
  lastName = 'test';
  //TODO put phone into own model
  // dayPhone: Phone[];
  // eveningPhone: Phone[];
  dayPhoneAreaCode = '555';
  dayPhoneNumber = '5555555';
  dayPhoneExtension = '';
  dayPhoneType = 'cell';
  eveningPhoneAreaCode = '555';
  eveningPhoneNumber = '5555555';
  eveningPhoneExtension = '';
  eveningPhoneType = 'cell';
  emailAddress = 'test@test.com';
  mailingAddress = 'test';
  mailingAddress2 = 'test';
  mailingCity = 'test';
  mailingState: 'Washington';
  mailingZIP = '11111';
  organizationName = 'test';
  website = 'test';
  orgType = 'individual';


  type = 'noncommercial';
  // TODO put noncommercial fields into own model
  // noncomercialFields: NoncommercialFields;
  activityDescription = 'test';
  locationDescription = 'test';
  startDateTime = 'test';
  endDateTime = 'test';
  numberParticipants = '0';
  startMonth = '01';
  startDay = '01';
  startYear = '2018';
  endMonth = '01';
  endDay = '01';
  endYear = '2018';
  startHour = '08';
  startMinutes = '00';
  startPeriod = 'AM';
  endHour = '10';
  endMinutes = '00';
  endPeriod = 'AM';
  //TODO remove spectators
  spectators = '0';

}

export class ApplicantInfo {
  firstName = 'test';
  lastName = 'test';
  dayPhone: Phone[];
  eveningPhone: Phone[];
  emailAddress = 'test@test.com';
  mailingAddress = 'test';
  mailingAddress2 = 'test';
  mailingCity = 'test';
  mailingState: 'Washington';
  mailingZIP = '11111';
  organizationName = 'test';
  website = 'test';
  orgType = 'individual';
}

export class Phone {
  areaCode = '555';
  number = '5555555'
  extension = ''
  phoneType = 'test'
}

export class NoncommercialFields {
  activityDescription = 'test';
  locationDescription = 'test';
  startDateTime = 'test';
  endDateTime = 'test';
  numberParticipants = '0';
}

export const Types = [
  'noncommercial',
  'commercial'
]

export const OrgTypes = [
  'individual',
  'group'
]

export const States = [
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
]
