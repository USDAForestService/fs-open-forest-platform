'use strict';

const factory = require('unionized');

module.exports = factory.factory({
  district: '11',
  region: '06',
  forest: '05',
  type: 'noncommercial',
  eventName: 'Fun Party',
  signature: 'ABC',
  applicantInfo: {
    dayPhone: {
      areaCode: '123',
      prefix: '456',
      number: '7890',
      extension: '1122'
    },
    eveningPhone: {
      areaCode: '012',
      prefix: '345',
      number: '6789',
      extension: '3344'
    },
    organizationAddress: {
      mailingAddress: '876 Central St',
      mailingAddress2: '#2188',
      mailingCity: 'Chicago',
      mailingState: 'IL',
      mailingZIP: '60299'
    },
    primaryAddress: {
      mailingAddress: '123 Easy St',
      mailingAddress2: '#56',
      mailingCity: 'Evanston',
      mailingState: 'IL',
      mailingZIP: '60201'
    },
    secondaryAddress: {
      mailingAddress: '456 Main St',
      mailingAddress2: '#23',
      mailingCity: 'Madison',
      mailingState: 'WI',
      mailingZIP: '53703'
    },
    orgType: 'Person',
    primaryFirstName: 'Luke',
    primaryLastName: 'Skywalker',
    secondaryFirstName: 'Han',
    secondaryLastName: 'Solo',
    organizationName: 'Initech',
    emailAddress: 'luke@skywalker.com',
    website: 'http://skywalker.com'
  },
  noncommercialFields: {
    locationDescription: 'In the hills',
    numberParticipants: 123,
    numberSpectators: 321,
    activityDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  dateTimeRange: {
    startDateTime: '2018-12-12T13:00:00Z',
    endDateTime: '2018-12-12T21:00:00Z'
  }
});
