'use strict';

const factory = require('unionized');

module.exports = factory.factory({
  // required string(255)
  authorizingOfficerName: 'Test Officer',
  // required string(255)
  authorizingOfficerTitle: 'Test Title',
  // required, string(2)
  district: '11',
  // required, string(2)
  region: '06',
  // required, string(2)
  forest: '05',
  // required string(255)
  eventName: 'Fun Party',
  // required string(3)
  signature: 'ABC',
  // required string(255)
  status: 'Submitted',
  // required
  applicantInfo: {
    // required
    dayPhone: {
      // required string(3)
      areaCode: '123',
      // required string(3)
      prefix: '456',
      // required string(4)
      number: '7890',
      // optional string(6)
      extension: '112233'
    },
    // optional
    eveningPhone: {
      // required string(3)
      areaCode: '012',
      // required string(3)
      prefix: '345',
      // required string(4)
      number: '6789',
      // optional string(6)
      extension: '334455'
    },
    // optional
    faxNumber: {
      // required string(3)
      areaCode: '234',
      // required string(3)
      prefix: '567',
      // required string(4)
      number: '8901',
      // optional string(6)
      extension: '445566'
    },
    // required if orgType is 'Corporation'
    organizationAddress: {
      // required string(255)
      mailingAddress: '876 Central St',
      // optional string(255)
      mailingAddress2: '#2188',
      // required string(255)
      mailingCity: 'Chicago',
      // required string(2) state enum
      mailingState: 'IL',
      // required string(5) digits only
      mailingZIP: '60299'
    },
    // required
    primaryAddress: {
      // required string(255)
      mailingAddress: '123 Easy St',
      // optional string(255)
      mailingAddress2: '#56',
      // required string(255)
      mailingCity: 'Evanston',
      // required string(2) state enum
      mailingState: 'IL',
      // required string(5) digits only
      mailingZIP: '60201'
    },
    // optional
    secondaryAddress: {
      // required string(255)
      mailingAddress: '456 Main St',
      // optional string(255)
      mailingAddress2: '#23',
      // required string(255)
      mailingCity: 'Madison',
      // required string(2) state enum
      mailingState: 'WI',
      // required string(5) digits only
      mailingZIP: '53703'
    },
    // required string(255) enum 'Person' or 'Corporation'
    orgType: 'Person',
    // required string(255)
    primaryFirstName: 'Luke',
    // required string(255)
    primaryLastName: 'Skywalker',
    // optional string(255)
    secondaryFirstName: 'Han',
    // optional string(255)
    secondaryLastName: 'Solo',
    // required string(255) if orgType is 'Corporation'
    organizationName: 'Initech',
    // required string(255) email address
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
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ' +
      'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ' +
      'commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
      'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id ' +
      ' est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  // required
  dateTimeRange: {
    // required string UTC datetime
    startDateTime: '2018-12-12T13:00:00Z',
    // required string UTC datetime
    endDateTime: '2018-12-12T21:00:00Z'
  }
});
