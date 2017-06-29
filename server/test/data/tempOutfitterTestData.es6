'use strict';

var factory = require('unionized');

module.exports = {
  basicTempOutfitter: factory.factory({
    'authorizingOfficerName': 'Test Officer',
    'authorizingOfficerTitle': 'Test Title',
    'district': '11',
    'region': '06',
    'forest': '05',
    'signature': 'aaa',
    'type': 'tempOutfitters',
    'applicantInfo': {
      'emailAddress': 'test@test.com',
      'organizationName': 'Forest Jaunts Unlimited',
      'primaryFirstName': 'Bob',
      'primaryLastName': 'Smith',
      'orgType': 'corporation',
      'website': 'http://www.forestjaunts.com',
      'dayPhone': {
        'areaCode': '555',
        'prefix': '555',
        'number': '5555'
      },
      'eveningPhone': {
        'areaCode': '555',
        'prefix': '111',
        'number': '1111'
      },
      'faxNumber': {
        'areaCode': '555',
        'prefix': '222',
        'number': '2222'
      },
      'primaryAddress': {
        'mailingAddress': '111 Post Rd',
        'mailingAddress2': '',
        'mailingCity': 'Metropolis',
        'mailingState': 'NY',
        'mailingZIP': '55555',
      },
    },
    'tempOutfitterFields': {
      'activityDescriptionFields': {
        'numberServiceDaysRequested': 2,
        'numberOfTrips': 1,
        'dateTimeRange': {
          'endDateTime': '2018-12-12T13:00:00Z',
          'startDateTime': '2018-12-14T13:00:00Z'
        },
        'locationDescription': 'A really nice forest',
        'servicesProvided': 'Hiking',
        'audienceDescription': 'People who like to hike',
        'listOfGovernmentFacilities': 'none',
        'listOfTemporaryImprovements': 'none',
        'statementOfMotorizedEquipment': 'none',
        'statementOfTransportationOfLivestock': 'none',
        'statementOfAssignedSite': 'none',
        'descriptionOfCleanupAndRestoration': 'none',
      },
      'advertisingDescription': 'none',
      'advertisingURL': 'none',
      'clientCharges': '500',
      'experienceList': 'Lots of experience',
      'individualIsCitizen': true,
      'smallBusiness': true
    }
  })
};
