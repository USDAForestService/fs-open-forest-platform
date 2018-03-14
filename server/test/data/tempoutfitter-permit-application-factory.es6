'use strict';

const factory = require('unionized');

module.exports = factory.factory({
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
    advertisingURL: 'http://advertising.url',
    // required string
    clientCharges: '$3.50',
    // required
    activityDescriptionFields: {
      // required integer
      numberOfTrips: 3,
      // required string
      partySize: '4-10',
      // required string
      locationDescription:
        'such a great location such a great location such a great location such a great location such a great location ' +
        ' such a great location such a great location such a great location such a great location such a great location ' +
        'such a great location such a great location such a great location such a great location such a great location ',
      // required string
      servicesProvided:
        'excellent services excellent services excellent services excellent services excellent services excellent ' +
        'services excellent services excellent services excellent services excellent services excellent services ' +
        'excellent services excellent services excellent services excellent services excellent services excellent ' +
        'services excellent services ',
      // required string
      audienceDescription:
        'what a great audience what a great audience what a great audience what a great audience what a great audience ' +
        'what a great audience what a great audience what a great audience what a great audience what a great audience ' +
        'what a great audience what a great audience what a great audience what a great audience what a great audience ',
      // required boolean
      needGovernmentFacilities: true,
      // optional string
      listOfGovernmentFacilities:
        'so many government facilities so many government facilities so many government facilities so many government ' +
        'facilities so many government facilities so many government facilities so many government facilities so many ' +
        'government facilities so many government facilities so many government facilities so many government ' +
        'facilities so many government facilities ',
      // required boolean
      needTemporaryImprovements: true,
      // optional string
      listOfTemporaryImprovements:
        'all the great improvements all the great improvements all the great improvements all the great improvements ' +
        'all the great improvements all the great improvements all the great improvements all the great improvements ' +
        'all the great improvements all the great improvements all the great improvements all the great improvements ' +
        'all the great improvements ',
      // required boolean
      haveMotorizedEquipment: true,
      // optional string
      statementOfMotorizedEquipment:
        'all the great motorized equipment all the great motorized equipment all the great motorized equipment all the ' +
        'great motorized equipment all the great motorized equipment all the great motorized equipment all the great ' +
        'motorized equipment all the great motorized equipment all the great motorized equipment all ' +
        'the great motorized equipment ',
      // required boolean
      haveLivestock: true,
      // optional string
      statementOfTransportationOfLivestock:
        'all the great livestock all the great livestock all the great livestock all the great livestock all the great ' +
        'livestock all the great livestock all the great livestock all the great livestock all the great livestock all the' +
        ' great livestock all the great livestock all the great livestock all the great livestock ',
      // required boolean
      needAssignedSite: true,
      // optional string
      statementOfAssignedSite:
        'all the great sites all the great sites all the great sites all the great sites all the great sites all the ' +
        'great sites all the great sites all the great sites all the great sites all the great sites all the great ' +
        'sites all the great sites all the great sites all the great sites all the great sites all the great sites ',
      // required string
      descriptionOfCleanupAndRestoration:
        'all the great cleanup all the great cleanup all the great cleanup all the great cleanup all the great cleanup' +
        ' all the great cleanup all the great cleanup all the great cleanup all the great cleanup all the great cleanup ' +
        'all the great cleanup all the great cleanup all the great cleanup all the great cleanup ',
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
      haveNationalForestPermits: true,
      // optional string
      listAllNationalForestPermits: 'all the great forests',
      // required boolean
      haveOtherPermits: true,
      // optional string
      listAllOtherPermits: 'all the great permits',
      // required boolean
      haveCitations: true,
      // optional string
      listAllCitations: 'its a long story'
    }
  }
});
