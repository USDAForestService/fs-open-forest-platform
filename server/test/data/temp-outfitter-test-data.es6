'use strict';

const factory = require('unionized');

module.exports = {
  mockS3Get: {
    AcceptRanges: 'bytes',
    LastModified: '2017-05-09T12:25:00.000Z',
    ContentLength: 13,
    ETag: 'fa7d7e650b2cec68f302b31ba28235d8',
    ContentType: 'application/octet-stream',
    Metadata: {},
    Body: {
      type: 'Buffer',
      data: [37, 80, 68, 70, 45, 49, 46, 51, 13, 37, 226, 227, 207]
    }
  },
  tempOutfitterFactory: factory.factory({
    // required string
    authorizingOfficerName: 'Test Officer',
    // required string
    authorizingOfficerTitle: 'Test Title',
    // required, 2 digits string
    district: '11',
    // required, 2 digits string
    region: '06',
    // required, 2 digits string
    forest: '05',
    // required string 'tempOutfitters'
    type: 'tempOutfitters',
    // required string 2 or 3 characters
    signature: 'TT',
    // required
    applicantInfo: {
      // required string email address
      emailAddress: 'theodore@twombly.com',
      // required string
      primaryFirstName: 'Theodore',
      // required string
      primaryLastName: 'Twombly',
      // required string enum
      orgType: 'Person',
      // optional string(255) URL
      website: 'http://twombly.com',
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
      }
    },
    // required
    tempOutfitterFields: {
      // required boolean
      individualIsCitizen: false,
      // required boolean
      smallBusiness: false,
      // optional string
      advertisingDescription: 'Advertising',
      // optional string URL
      advertisingURL: '',
      // required string
      clientCharges: '$3.50',
      // required
      activityDescriptionFields: {
        // required integer
        numberOfTrips: 3,
        // required string
        partySize: '4-10',
        // required string
        locationDescription: 'Start and end',
        // required string
        servicesProvided: 'Services',
        // required string
        audienceDescription: 'Description',
        // required boolean
        needGovernmentFacilities: false,
        // optional string
        listOfGovernmentFacilities: '',
        // required boolean
        needTemporaryImprovements: false,
        // optional string
        listOfTemporaryImprovements: '',
        // required boolean
        haveMotorizedEquipment: false,
        // optional string
        statementOfMotorizedEquipment: '',
        // required boolean
        haveLivestock: false,
        // optional string
        statementOfTransportationOfLivestock: '',
        // required boolean
        needAssignedSite: false,
        // optional string
        statementOfAssignedSite: '',
        // required string
        descriptionOfCleanupAndRestoration: 'Cleanup',
        // required
        dateTimeRange: {
          // required string UTC datetime
          startDateTime: '2018-12-12T13:00:00Z',
          // required string UTC datetime
          endDateTime: '2018-12-12T21:00:00Z'
        }
      },
      // required
      experienceFields: {
        // required boolean
        haveNationalForestPermits: false,
        // optional string
        listAllNationalForestPermits: '',
        // required boolean
        haveOtherPermits: false,
        // optional string
        listAllOtherPermits: '',
        // required boolean
        haveCitations: false,
        // optional string
        listAllCitations: ''
      }
    }
  })
};
