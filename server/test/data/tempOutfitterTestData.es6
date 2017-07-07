'use strict';

var factory = require('unionized');

module.exports = {
  basicTempOutfitter: factory.factory({
    'authorizingOfficerName': 'Test Officer',
    'authorizingOfficerTitle': 'Test Title',
    'district': '11',
    'region': '06',
    'forest': '05',
    'type': 'tempOutfitters',
    'signature': 'TT',
    'applicantInfo': {
      'emailAddress': 'theodore@twombly.com',
      'organizationName': '',
      'primaryFirstName': 'Theodore',
      'primaryLastName': 'Twombly',
      'orgType': 'individual',
      'website': 'http://twombly.com',
      'primaryAddress': {
        'mailingAddress': '2345 Central Street',
        'mailingAddress2': '',
        'mailingCity': 'Los Angeles',
        'mailingState': 'CA',
        'mailingZIP': '12345'
      },
      'dayPhone': {
        'areaCode': '123',
        'extension': null,
        'number': '7890',
        'phoneType': 'dayPhone',
        'prefix': '456',
        'tenDigit': '1234567890'
      },
      'fax': {
        'areaCode': null,
        'extension': null,
        'number': null,
        'phoneType': 'fax',
        'prefix': null,
        'tenDigit': ''
      }
    },
    'tempOutfitterFields': {
      'individualIsCitizen': false,
      'smallBusiness': false,
      'advertisingDescription': 'Advertising',
      'advertisingURL': '',
      'clientCharges': '$3.50',
      'experienceList': '',
      'activityDescriptionFields': {
        'numberServiceDaysRequested': 2,
        'numberOfTrips': 3,
        'partySize': 4,
        'locationDescription': 'Start and end',
        'servicesProvided': 'Services',
        'audienceDescription': 'Description',
        'needGovernmentFacilities': false,
        'listOfGovernmentFacilities': '',
        'needTemporaryImprovements': false,
        'listOfTemporaryImprovements': '',
        'haveMotorizedEquipment': false,
        'statementOfMotorizedEquipment': '',
        'haveLivestock': false,
        'statementOfTransportationOfLivestock': '',
        'needAssignedSite': false,
        'statementOfAssignedSite': '',
        'descriptionOfCleanupAndRestoration': 'Cleanup',
        'dateTimeRange': {
          'endDateTime': '2018-12-12T16:00:00Z',
          'endDay': '12',
          'endMonth': '12',
          'endYear': '2018',
          'endHour': '04',
          'endMinutes': '00',
          'endPeriod': 'PM',
          'startDateTime': '2018-12-12T14:00:00Z',
          'startDay': '12',
          'startMonth': '12',
          'startYear': '2018',
          'startHour': '02',
          'startMinutes': '00',
          'startPeriod': 'PM'
        }
      },
      'experienceFields': {
        'haveNationalForestPermits': false,
        'listAllNationalForestPermits': '',
        'haveOtherPermits': false,
        'listAllOtherPermits': '',
        'haveCitations': false,
        'listAllCitations': ''
      }
    }
  })
};
