'use strict';

const factory = require('unionized');

module.exports = factory.factory({
  // required string
  authorizingOfficerName: 'Test Officer',
  // required string
  authorizingOfficerTitle: 'Test Title',
  // required, 2 digit string
  district: '11',
  // required, 2 digits string
  region: '06',
  // required, 2 digits string
  forest: '05',
  // required string 'noncommercial'
  type: 'noncommercial',
  // required string
  eventName: 'Fun Party',
  // required string 2 or 3 characters
  signature: 'ABC',
  // required
  applicantInfo: {
    // required
    dayPhone: {
      // required 3 digit string
      areaCode: '123',
      // required 3 digit string
      prefix: '456',
      // required 4 digit string
      number: '7890',
      // optional 4 digit string
      extension: '1122'
    },
    // optional
    eveningPhone: {
      // required 3 digit string
      areaCode: '012',
      // required 3 digit string
      prefix: '345',
      // required 4 digit string
      number: '6789',
      // optional 4 digit string
      extension: '3344'
    },
    // optional
    faxNumber: {
      // required if parent is defined, 3 digit string
      areaCode: '234',
      // required 3 digit string
      prefix: '567',
      // required 4 digit string
      number: '8901',
      // optional 4 digit string
      extension: '2345'
    },
    // required if orgType is 'Corporation'
    organizationAddress: {
      // required string
      mailingAddress: '876 Central St',
      // optional string
      mailingAddress2: '#2188',
      // required string
      mailingCity: 'Chicago',
      // required string 2 character state
      mailingState: 'IL',
      // required string 5 digits
      mailingZIP: '60299'
    },
    // required
    primaryAddress: {
      // required string
      mailingAddress: '123 Easy St',
      // optional string
      mailingAddress2: '#56',
      // required string
      mailingCity: 'Evanston',
      // required string 2 character state
      mailingState: 'IL',
      // required string 5 digits
      mailingZIP: '60201'
    },
    // optional
    secondaryAddress: {
      // required string
      mailingAddress: '456 Main St',
      // optional string
      mailingAddress2: '#23',
      // required string
      mailingCity: 'Madison',
      // required string 2 character state
      mailingState: 'WI',
      // required string 5 digits
      mailingZIP: '53703'
    },
    // required string 'Person' or 'Corporation'
    orgType: 'Person',
    // required string
    primaryFirstName: 'Luke',
    // required string
    primaryLastName: 'Skywalker',
    // optional string
    secondaryFirstName: 'Han',
    // optional string
    secondaryLastName: 'Solo',
    // required string if orgType is 'Corporation'
    organizationName: 'Initech',
    // required string email address
    emailAddress: 'luke@skywalker.com',
    // optional string(255) URL
    website: 'http://skywalker.com'
  },
  // required
  noncommercialFields: {
    // required string(255)
    locationDescription: 'In the hills',
    // required number
    numberParticipants: 123,
    // required number
    numberSpectators: 321,
    // required string(512)
    activityDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  // required
  dateTimeRange: {
    // required string UTC datetime
    startDateTime: '2018-12-12T13:00:00Z',
    // required string UTC datetime
    endDateTime: '2018-12-12T21:00:00Z'
  }
});
