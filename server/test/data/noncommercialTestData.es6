module.exports = {
  singlePermitHolder: {
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
      'activityDescription': 'Gonna have a party',
      'startDateTime': '2018-12-12T13:00:00Z',
      'endDateTime': '2018-12-12T21:00:00Z'
    },
    'district': '11',
    'region': '06',
    'forest': '05',
    'type': 'noncommercial',
    'eventName': 'Fun Party',
    'signature': 'LS'
  },
  singlePermitHolderWithSecondaryPermitHolder: {
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
      'activityDescription': 'Gonna have a party',
      'startDateTime': '2018-12-12T13:00:00Z',
      'endDateTime': '2018-12-12T21:00:00Z'
    },
    'district': '11',
    'region': '06',
    'forest': '05',
    'type': 'noncommercial',
    'eventName': 'Fun Party',
    'signature': 'LS'
  },
  singlePermitHolderWithSecondaryPermitHolderwithCustomAddress: {
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
      'activityDescription': 'Gonna have a party',
      'startDateTime': '2018-12-12T13:00:00Z',
      'endDateTime': '2018-12-12T21:00:00Z'
    },
    'district': '11',
    'region': '06',
    'forest': '05',
    'type': 'noncommercial',
    'eventName': 'Fun Party',
    'signature': 'LS'
  },
  singlePermitHolderOrganization: {
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
      'emailAddress': 'luke@skywalker.com'
    },
    'noncommercialFields': {
      'locationDescription': 'In the hills',
      'numberParticipants': 123,
      'spectators': 321,
      'activityDescription': 'Gonna have a party',
      'startDateTime': '2018-12-12T13:00:00Z',
      'endDateTime': '2018-12-12T21:00:00Z'
    },
    'district': '11',
    'region': '06',
    'forest': '05',
    'type': 'noncommercial',
    'eventName': 'Fun Party',
    'signature': 'LS'
  },
  singlePermitHolderOrganizationWithCustomAddresses: {
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
      'emailAddress': 'luke@skywalker.com'
    },
    'noncommercialFields': {
      'locationDescription': 'In the hills',
      'numberParticipants': 123,
      'spectators': 321,
      'activityDescription': 'Gonna have a party',
      'startDateTime': '2018-12-12T13:00:00Z',
      'endDateTime': '2018-12-12T21:00:00Z'
    },
    'district': '11',
    'region': '06',
    'forest': '05',
    'type': 'noncommercial',
    'eventName': 'Fun Party',
    'signature': 'LS'
  }
};
