'use strict';

var factory = require('unionized');

module.exports = {
  singlePermitHolder: factory.factory({
    'applicantInfo': {
      'dayPhone': {
        'areaCode': '123',
        'prefix': '456',
        'number': '7890'
      },
      'eveningPhone': {},
      'organizationAddress': {},
      'primaryAddress': {
        'mailingAddress': '123 Easy St',
        'mailingCity': 'Evanston',
        'mailingState': 'IL',
        'mailingZIP': '60201'
      },
      'secondaryAddress': {},
      'orgType': 'Person',
      'primaryFirstName': 'Luke',
      'primaryLastName': 'Skywalker',
      'emailAddress': 'luke@skywalker.com'
    },
    'noncommercialFields': {
      'locationDescription': 'In the hills',
      'numberParticipants': 123,
      'spectators': 321,
      'activityDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    'dateTimeRange': {
      'startDateTime': '2018-12-12T13:00:00Z',
      'endDateTime': '2018-12-12T21:00:00Z'
    },
    'district': '11',
    'region': '06',
    'forest': '05',
    'type': 'noncommercial',
    'eventName': 'Fun Party',
    'signature': 'LS'
  }),
  singlePermitHolderWithSecondaryPermitHolder: factory.factory({
    'applicantInfo': {
      'dayPhone': {
        'areaCode': '123',
        'prefix': '456',
        'number': '7890'
      },
      'eveningPhone': {},
      'organizationAddress': {},
      'primaryAddress': {
        'mailingAddress': '123 Easy St',
        'mailingCity': 'Evanston',
        'mailingState': 'IL',
        'mailingZIP': '60201'
      },
      'secondaryAddress': {},
      'orgType': 'Person',
      'primaryFirstName': 'Luke',
      'primaryLastName': 'Skywalker',
      'secondaryFirstName': 'Han',
      'secondaryLastName': 'Solo',
      'emailAddress': 'luke@skywalker.com'
    },
    'noncommercialFields': {
      'locationDescription': 'In the hills',
      'numberParticipants': 123,
      'spectators': 321,
      'activityDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    'dateTimeRange': {
      'startDateTime': '2018-12-12T13:00:00Z',
      'endDateTime': '2018-12-12T21:00:00Z'
    },
    'district': '11',
    'region': '06',
    'forest': '05',
    'type': 'noncommercial',
    'eventName': 'Fun Party',
    'signature': 'LS'
  }),
  singlePermitHolderWithSecondaryPermitHolderwithCustomAddress: factory.factory({
    'applicantInfo': {
      'dayPhone': {
        'areaCode': '123',
        'prefix': '456',
        'number': '7890',
        'extension': '2468'
      },
      'eveningPhone': {
        'areaCode': '111',
        'prefix': '222',
        'number': '3333',
        'extension': '1357'
      },
      'organizationAddress': {},
      'primaryAddress': {
        'mailingAddress': '123 Easy St',
        'mailingAddress2': 'Apartment 3',
        'mailingCity': 'Evanston',
        'mailingState': 'IL',
        'mailingZIP': '60201'
      },
      'secondaryAddress': {
        'mailingAddress': '456 Sesame St',
        'mailingAddress2': 'Apartment 2',
        'mailingCity': 'Madison',
        'mailingState': 'WI',
        'mailingZIP': '53703'
      },
      'orgType': 'Person',
      'primaryFirstName': 'Luke',
      'primaryLastName': 'Skywalker',
      'secondaryFirstName': 'Han',
      'secondaryLastName': 'Solo',
      'emailAddress': 'luke@skywalker.com'
    },
    'noncommercialFields': {
      'locationDescription': 'In the hills',
      'numberParticipants': 123,
      'spectators': 321,
      'activityDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    'dateTimeRange': {
      'startDateTime': '2018-12-12T13:00:00Z',
      'endDateTime': '2018-12-12T21:00:00Z'
    },
    'district': '11',
    'region': '06',
    'forest': '05',
    'type': 'noncommercial',
    'eventName': 'Fun Party',
    'signature': 'LS'
  }),
  singlePermitHolderOrganization: factory.factory({
    'applicantInfo': {
      'dayPhone': {
        'areaCode': '123',
        'prefix': '456',
        'number': '7890',
        'extension': '2468'
      },
      'eveningPhone': {},
      'organizationAddress': {
        'mailingAddress': '123 Rebel Way',
        'mailingAddress2': 'Unit 421',
        'mailingCity': 'New York',
        'mailingState': 'NY',
        'mailingZIP': '11201'
      },
      'primaryAddress': {},
      'secondaryAddress': {},
      'orgType': 'Corporation',
      'primaryFirstName': 'Luke',
      'primaryLastName': 'Skywalker',
      'emailAddress': 'luke@skywalker.com',
      'organizationName': 'Rebel Alliance',
      'website': 'http://www.starwars.com/'
    },
    'noncommercialFields': {
      'locationDescription': 'In the hills',
      'numberParticipants': 123,
      'spectators': 321,
      'activityDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    'dateTimeRange': {
      'startDateTime': '2018-12-12T13:00:00Z',
      'endDateTime': '2018-12-12T21:00:00Z'
    },
    'district': '11',
    'region': '06',
    'forest': '05',
    'type': 'noncommercial',
    'eventName': 'Fun Party',
    'signature': 'LS'
  }),
  singlePermitHolderOrganizationWithCustomAddresses: factory.factory({
    'applicantInfo': {
      'dayPhone': {
        'areaCode': '123',
        'prefix': '456',
        'number': '7890',
        'extension': '2468'
      },
      'eveningPhone': {},
      'organizationAddress': {
        'mailingAddress': '123 Rebel Way',
        'mailingAddress2': 'Unit 421',
        'mailingCity': 'New York',
        'mailingState': 'NY',
        'mailingZIP': '11201'
      },
      'primaryAddress': {
        'mailingAddress': '123 Easy St',
        'mailingAddress2': 'Apartment 3',
        'mailingCity': 'Evanston',
        'mailingState': 'IL',
        'mailingZIP': '60201'
      },
      'secondaryAddress': {
        'mailingAddress': '456 Sesame St',
        'mailingAddress2': 'Apartment 2',
        'mailingCity': 'Madison',
        'mailingState': 'WI',
        'mailingZIP': '53703'
      },
      'orgType': 'Corporation',
      'primaryFirstName': 'Luke',
      'primaryLastName': 'Skywalker',
      'secondaryFirstName': 'Han',
      'secondaryLastName': 'Solo',
      'emailAddress': 'luke@skywalker.com',
      'organizationName': 'Rebel Alliance',
      'website': 'http://www.starwars.com/'
    },
    'noncommercialFields': {
      'locationDescription': 'In the hills',
      'numberParticipants': 123,
      'spectators': 321,
      'activityDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    'dateTimeRange': {
      'startDateTime': '2018-12-12T13:00:00Z',
      'endDateTime': '2018-12-12T21:00:00Z'
    },
    'district': '11',
    'region': '06',
    'forest': '05',
    'type': 'noncommercial',
    'eventName': 'Fun Party',
    'signature': 'LS'
  }),
  singlePermitHolderMissingFirstName: factory.factory({
    'applicantInfo': {
      'dayPhone': {
        'areaCode': '123',
        'prefix': '456',
        'number': '7890'
      },
      'eveningPhone': {},
      'organizationAddress': {},
      'primaryAddress': {
        'mailingAddress': '123 Easy St',
        'mailingCity': 'Evanston',
        'mailingState': 'IL',
        'mailingZIP': '60201'
      },
      'secondaryAddress': {},
      'orgType': 'Person',
      'primaryFirstName': undefined,
      'primaryLastName': 'Skywalker',
      'emailAddress': 'luke@skywalker.com'
    },
    'noncommercialFields': {
      'locationDescription': 'In the hills',
      'numberParticipants': 123,
      'spectators': 321,
      'activityDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    'dateTimeRange': {
      'startDateTime': '2018-12-12T13:00:00Z',
      'endDateTime': '2018-12-12T21:00:00Z'
    },
    'district': '11',
    'region': '06',
    'forest': '05',
    'type': 'noncommercial',
    'eventName': 'Fun Party',
    'signature': 'LS'
  }),
  singlePermitHolderEveningPhoneMissingAreaCode: factory.factory({
    'applicantInfo': {
      'dayPhone': {
        'areaCode': '123',
        'prefix': '456',
        'number': '7890'
      },
      'eveningPhone': {
        'areaCode': undefined,
        'prefix': '222',
        'number': '3333'
      },
      'organizationAddress': {},
      'primaryAddress': {
        'mailingAddress': '123 Easy St',
        'mailingCity': 'Evanston',
        'mailingState': 'IL',
        'mailingZIP': '60201'
      },
      'secondaryAddress': {},
      'orgType': 'Person',
      'primaryFirstName': 'Luke',
      'primaryLastName': 'Skywalker',
      'emailAddress': 'luke@skywalker.com'
    },
    'noncommercialFields': {
      'locationDescription': 'In the hills',
      'numberParticipants': 123,
      'spectators': 321,
      'activityDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    'dateTimeRange': {
      'startDateTime': '2018-12-12T13:00:00Z',
      'endDateTime': '2018-12-12T21:00:00Z'
    },
    'district': '11',
    'region': '06',
    'forest': '05',
    'type': 'noncommercial',
    'eventName': 'Fun Party',
    'signature': 'LS'
  }),
  singlePermitHolderMissingPrimaryAddress: factory.factory({
    'applicantInfo': {
      'dayPhone': {
        'areaCode': '123',
        'prefix': '456',
        'number': '7890'
      },
      'eveningPhone': {},
      'organizationAddress': {},
      'primaryAddress': undefined,
      'secondaryAddress': {},
      'orgType': 'Person',
      'primaryFirstName': 'Luke',
      'primaryLastName': 'Skywalker',
      'emailAddress': 'luke@skywalker.com'
    },
    'noncommercialFields': {
      'locationDescription': 'In the hills',
      'numberParticipants': 123,
      'spectators': 321,
      'activityDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    'dateTimeRange': {
      'startDateTime': '2018-12-12T13:00:00Z',
      'endDateTime': '2018-12-12T21:00:00Z'
    },
    'district': '11',
    'region': '06',
    'forest': '05',
    'type': 'noncommercial',
    'eventName': 'Fun Party',
    'signature': 'LS'
  }),
  singlePermitHolderMissingPrimaryAddressState: factory.factory({
    'applicantInfo': {
      'dayPhone': {
        'areaCode': '123',
        'prefix': '456',
        'number': '7890'
      },
      'eveningPhone': {},
      'organizationAddress': {},
      'primaryAddress': {
        'mailingAddress': '123 Easy St',
        'mailingCity': 'Evanston',
        'mailingState': undefined,
        'mailingZIP': '60201'
      },
      'secondaryAddress': {},
      'orgType': 'Person',
      'primaryFirstName': 'Luke',
      'primaryLastName': 'Skywalker',
      'emailAddress': 'luke@skywalker.com'
    },
    'noncommercialFields': {
      'locationDescription': 'In the hills',
      'numberParticipants': 123,
      'spectators': 321,
      'activityDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    'dateTimeRange': {
      'startDateTime': '2018-12-12T13:00:00Z',
      'endDateTime': '2018-12-12T21:00:00Z'
    },
    'district': '11',
    'region': '06',
    'forest': '05',
    'type': 'noncommercial',
    'eventName': 'Fun Party',
    'signature': 'LS'
  }),
  singlePermitHolderOrganizationMissingOrgAddress: factory.factory({
    'applicantInfo': {
      'dayPhone': {
        'areaCode': '123',
        'prefix': '456',
        'number': '7890',
        'extension': '2468'
      },
      'eveningPhone': {},
      'organizationAddress': undefined,
      'primaryAddress': {},
      'secondaryAddress': {},
      'orgType': 'Corporation',
      'primaryFirstName': 'Luke',
      'primaryLastName': 'Skywalker',
      'emailAddress': 'luke@skywalker.com',
      'organizationName': 'Rebel Alliance',
      'website': 'http://www.starwars.com/'
    },
    'noncommercialFields': {
      'locationDescription': 'In the hills',
      'numberParticipants': 123,
      'spectators': 321,
      'activityDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    'dateTimeRange': {
      'startDateTime': '2018-12-12T13:00:00Z',
      'endDateTime': '2018-12-12T21:00:00Z'
    },
    'district': '11',
    'region': '06',
    'forest': '05',
    'type': 'noncommercial',
    'eventName': 'Fun Party',
    'signature': 'LS'
  }),
  singlePermitHolderOrganizationMissingOrgAddressState: factory.factory({
    'applicantInfo': {
      'dayPhone': {
        'areaCode': '123',
        'prefix': '456',
        'number': '7890',
        'extension': '2468'
      },
      'eveningPhone': {},
      'organizationAddress': {
        'mailingAddress': '123 Rebel Way',
        'mailingAddress2': 'Unit 421',
        'mailingCity': 'New York',
        'mailingState': undefined,
        'mailingZIP': '11201'
      },
      'primaryAddress': {},
      'secondaryAddress': {},
      'orgType': 'Corporation',
      'primaryFirstName': 'Luke',
      'primaryLastName': 'Skywalker',
      'emailAddress': 'luke@skywalker.com',
      'organizationName': 'Rebel Alliance',
      'website': 'http://www.starwars.com/'
    },
    'noncommercialFields': {
      'locationDescription': 'In the hills',
      'numberParticipants': 123,
      'spectators': 321,
      'activityDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    'dateTimeRange': {
      'startDateTime': '2018-12-12T13:00:00Z',
      'endDateTime': '2018-12-12T21:00:00Z'
    },
    'district': '11',
    'region': '06',
    'forest': '05',
    'type': 'noncommercial',
    'eventName': 'Fun Party',
    'signature': 'LS'
  }),
  singlePermitHolderOrganizationWithPrimaryAddressMissingState: factory.factory({
    'applicantInfo': {
      'dayPhone': {
        'areaCode': '123',
        'prefix': '456',
        'number': '7890',
        'extension': '2468'
      },
      'eveningPhone': {},
      'organizationAddress': {
        'mailingAddress': '123 Rebel Way',
        'mailingAddress2': 'Unit 421',
        'mailingCity': 'New York',
        'mailingState': 'NY',
        'mailingZIP': '11201'
      },
      'primaryAddress': {
        'mailingAddress': '123 Easy St',
        'mailingAddress2': 'Apartment 3',
        'mailingCity': 'Evanston',
        'mailingState': undefined,
        'mailingZIP': '60201'
      },
      'secondaryAddress': {
        'mailingAddress': '456 Sesame St',
        'mailingAddress2': 'Apartment 2',
        'mailingCity': 'Madison',
        'mailingState': 'WI',
        'mailingZIP': '53703'
      },
      'orgType': 'Corporation',
      'primaryFirstName': 'Luke',
      'primaryLastName': 'Skywalker',
      'secondaryFirstName': 'Han',
      'secondaryLastName': 'Solo',
      'emailAddress': 'luke@skywalker.com',
      'organizationName': 'Rebel Alliance',
      'website': 'http://www.starwars.com/'
    },
    'noncommercialFields': {
      'locationDescription': 'In the hills',
      'numberParticipants': 123,
      'spectators': 321,
      'activityDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    'dateTimeRange': {
      'startDateTime': '2018-12-12T13:00:00Z',
      'endDateTime': '2018-12-12T21:00:00Z'
    },
    'district': '11',
    'region': '06',
    'forest': '05',
    'type': 'noncommercial',
    'eventName': 'Fun Party',
    'signature': 'LS'
  }),
  singlePermitHolderWithSecondaryAddressMissingState: factory.factory({
    'applicantInfo': {
      'dayPhone': {
        'areaCode': '123',
        'prefix': '456',
        'number': '7890',
        'extension': '2468'
      },
      'eveningPhone': {
        'areaCode': '111',
        'prefix': '222',
        'number': '3333',
        'extension': '1357'
      },
      'organizationAddress': {},
      'primaryAddress': {
        'mailingAddress': '123 Easy St',
        'mailingAddress2': 'Apartment 3',
        'mailingCity': 'Evanston',
        'mailingState': 'IL',
        'mailingZIP': '60201'
      },
      'secondaryAddress': {
        'mailingAddress': '456 Sesame St',
        'mailingAddress2': 'Apartment 2',
        'mailingCity': 'Madison',
        'mailingState': undefined,
        'mailingZIP': '53703'
      },
      'orgType': 'Person',
      'primaryFirstName': 'Luke',
      'primaryLastName': 'Skywalker',
      'secondaryFirstName': 'Han',
      'secondaryLastName': 'Solo',
      'emailAddress': 'luke@skywalker.com'
    },
    'noncommercialFields': {
      'locationDescription': 'In the hills',
      'numberParticipants': 123,
      'spectators': 321,
      'activityDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    'dateTimeRange': {
      'startDateTime': '2018-12-12T13:00:00Z',
      'endDateTime': '2018-12-12T21:00:00Z'
    },
    'district': '11',
    'region': '06',
    'forest': '05',
    'type': 'noncommercial',
    'eventName': 'Fun Party',
    'signature': 'LS'
  }),
  singlePermitHolderBadStartDateTime: factory.factory({
    'applicantInfo': {
      'dayPhone': {
        'areaCode': '123',
        'prefix': '456',
        'number': '7890'
      },
      'eveningPhone': {},
      'organizationAddress': {},
      'primaryAddress': {
        'mailingAddress': '123 Easy St',
        'mailingCity': 'Evanston',
        'mailingState': 'IL',
        'mailingZIP': '60201'
      },
      'secondaryAddress': {},
      'orgType': 'Person',
      'primaryFirstName': 'Luke',
      'primaryLastName': 'Skywalker',
      'emailAddress': 'luke@skywalker.com'
    },
    'noncommercialFields': {
      'locationDescription': 'In the hills',
      'numberParticipants': 123,
      'spectators': 321,
      'activityDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    'dateTimeRange': {
      'startDateTime': '2018-12-12T13:00:00',
      'endDateTime': '2018-12-12T21:00:00Z'
    },
    'district': '11',
    'region': '06',
    'forest': '05',
    'type': 'noncommercial',
    'eventName': 'Fun Party',
    'signature': 'LS'
  }),
  singlePermitHolderBadEndDateTime: factory.factory({
    'applicantInfo': {
      'dayPhone': {
        'areaCode': '123',
        'prefix': '456',
        'number': '7890'
      },
      'eveningPhone': {},
      'organizationAddress': {},
      'primaryAddress': {
        'mailingAddress': '123 Easy St',
        'mailingCity': 'Evanston',
        'mailingState': 'IL',
        'mailingZIP': '60201'
      },
      'secondaryAddress': {},
      'orgType': 'Person',
      'primaryFirstName': 'Luke',
      'primaryLastName': 'Skywalker',
      'emailAddress': 'luke@skywalker.com'
    },
    'noncommercialFields': {
      'locationDescription': 'In the hills',
      'numberParticipants': 123,
      'spectators': 321,
      'activityDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    'dateTimeRange': {
      'startDateTime': '2018-12-12T13:00:00Z',
      'endDateTime': '2018-12-12T21:00:00'
    },
    'district': '11',
    'region': '06',
    'forest': '05',
    'type': 'noncommercial',
    'eventName': 'Fun Party',
    'signature': 'LS'
  }),
  singlePermitHolderUndefEveningPhone: factory.factory({
    'applicantInfo': {
      'dayPhone': {
        'areaCode': '123',
        'prefix': '456',
        'number': '7890'
      },
      'eveningPhone': undefined,
      'organizationAddress': {},
      'primaryAddress': {
        'mailingAddress': '123 Easy St',
        'mailingCity': 'Evanston',
        'mailingState': 'IL',
        'mailingZIP': '60201'
      },
      'secondaryAddress': {},
      'orgType': 'Person',
      'primaryFirstName': 'Luke',
      'primaryLastName': 'Skywalker',
      'emailAddress': 'luke@skywalker.com'
    },
    'noncommercialFields': {
      'locationDescription': 'In the hills',
      'numberParticipants': 123,
      'spectators': 321,
      'activityDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    'dateTimeRange': {
      'startDateTime': '2018-12-12T13:00:00Z',
      'endDateTime': '2018-12-12T21:00:00Z'
    },
    'district': '11',
    'region': '06',
    'forest': '05',
    'type': 'noncommercial',
    'eventName': 'Fun Party',
    'signature': 'LS'
  }),
  singlePermitHolderUndefOrgAddress: factory.factory({
    'applicantInfo': {
      'dayPhone': {
        'areaCode': '123',
        'prefix': '456',
        'number': '7890'
      },
      'eveningPhone': {},
      'organizationAddress': undefined,
      'primaryAddress': {
        'mailingAddress': '123 Easy St',
        'mailingCity': 'Evanston',
        'mailingState': 'IL',
        'mailingZIP': '60201'
      },
      'secondaryAddress': {},
      'orgType': 'Person',
      'primaryFirstName': 'Luke',
      'primaryLastName': 'Skywalker',
      'emailAddress': 'luke@skywalker.com'
    },
    'noncommercialFields': {
      'locationDescription': 'In the hills',
      'numberParticipants': 123,
      'spectators': 321,
      'activityDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    'dateTimeRange': {
      'startDateTime': '2018-12-12T13:00:00Z',
      'endDateTime': '2018-12-12T21:00:00Z'
    },
    'district': '11',
    'region': '06',
    'forest': '05',
    'type': 'noncommercial',
    'eventName': 'Fun Party',
    'signature': 'LS'
  }),
  singlePermitHolderOrganizationUndefPrimaryAddress: factory.factory({
    'applicantInfo': {
      'dayPhone': {
        'areaCode': '123',
        'prefix': '456',
        'number': '7890',
        'extension': '2468'
      },
      'eveningPhone': {},
      'organizationAddress': {
        'mailingAddress': '123 Rebel Way',
        'mailingAddress2': 'Unit 421',
        'mailingCity': 'New York',
        'mailingState': 'NY',
        'mailingZIP': '11201'
      },
      'primaryAddress': undefined,
      'secondaryAddress': {},
      'orgType': 'Corporation',
      'primaryFirstName': 'Luke',
      'primaryLastName': 'Skywalker',
      'emailAddress': 'luke@skywalker.com',
      'organizationName': 'Rebel Alliance',
      'website': 'http://www.starwars.com/'
    },
    'noncommercialFields': {
      'locationDescription': 'In the hills',
      'numberParticipants': 123,
      'spectators': 321,
      'activityDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    'dateTimeRange': {
      'startDateTime': '2018-12-12T13:00:00Z',
      'endDateTime': '2018-12-12T21:00:00Z'
    },
    'district': '11',
    'region': '06',
    'forest': '05',
    'type': 'noncommercial',
    'eventName': 'Fun Party',
    'signature': 'LS'
  }),
  singlePermitHolderOrganizationUndefSecondaryAddress: factory.factory({
    'applicantInfo': {
      'dayPhone': {
        'areaCode': '123',
        'prefix': '456',
        'number': '7890',
        'extension': '2468'
      },
      'eveningPhone': {},
      'organizationAddress': {
        'mailingAddress': '123 Rebel Way',
        'mailingAddress2': 'Unit 421',
        'mailingCity': 'New York',
        'mailingState': 'NY',
        'mailingZIP': '11201'
      },
      'primaryAddress': {},
      'secondaryAddress': undefined,
      'orgType': 'Corporation',
      'primaryFirstName': 'Luke',
      'primaryLastName': 'Skywalker',
      'emailAddress': 'luke@skywalker.com',
      'organizationName': 'Rebel Alliance',
      'website': 'http://www.starwars.com/'
    },
    'noncommercialFields': {
      'locationDescription': 'In the hills',
      'numberParticipants': 123,
      'spectators': 321,
      'activityDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    'dateTimeRange': {
      'startDateTime': '2018-12-12T13:00:00Z',
      'endDateTime': '2018-12-12T21:00:00Z'
    },
    'district': '11',
    'region': '06',
    'forest': '05',
    'type': 'noncommercial',
    'eventName': 'Fun Party',
    'signature': 'LS'
  })
};
