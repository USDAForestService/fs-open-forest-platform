'use strict';

var factory = require('unionized');

module.exports = {
  basicTempOutfitter: factory.factory({
    authorizingOfficerName: 'Test Officer',
    authorizingOfficerTitle: 'Test Title',
    district: '11',
    region: '06',
    forest: '05',
    type: 'tempOutfitters',
    signature: 'TT',
    applicantInfo: {
      emailAddress: 'theodore@twombly.com',
      organizationName: '',
      primaryFirstName: 'Theodore',
      primaryLastName: 'Twombly',
      orgType: 'individual',
      website: 'http://twombly.com',
      primaryAddress: {
        mailingAddress: '2345 Central Street',
        mailingAddress2: '',
        mailingCity: 'Los Angeles',
        mailingState: 'CA',
        mailingZIP: '12345'
      },
      dayPhone: {
        areaCode: '123',
        extension: '987',
        number: '7890',
        prefix: '456'
      },
      eveningPhone: {
        areaCode: '456',
        extension: '678',
        number: '8900',
        prefix: '321'
      },
      fax: {
        areaCode: '123',
        extension: '4567',
        number: '8901',
        prefix: '234'
      }
    },
    tempOutfitterFields: {
      individualIsCitizen: false,
      smallBusiness: false,
      advertisingDescription: 'Advertising',
      advertisingURL: '',
      clientCharges: '$3.50',
      experienceList: '',
      activityDescriptionFields: {
        numberServiceDaysRequested: 2,
        numberOfTrips: 3,
        partySize: 4,
        locationDescription: 'Start and end',
        servicesProvided: 'Services',
        audienceDescription: 'Description',
        needGovernmentFacilities: false,
        listOfGovernmentFacilities: '',
        needTemporaryImprovements: false,
        listOfTemporaryImprovements: '',
        haveMotorizedEquipment: false,
        statementOfMotorizedEquipment: '',
        haveLivestock: false,
        statementOfTransportationOfLivestock: '',
        needAssignedSite: false,
        statementOfAssignedSite: '',
        descriptionOfCleanupAndRestoration: 'Cleanup',
        dateTimeRange: {
          endDateTime: '2018-12-12T16:00:00Z',
          startDateTime: '2018-12-12T14:00:00Z'
        }
      },
      experienceFields: {
        haveNationalForestPermits: false,
        listAllNationalForestPermits: '',
        haveOtherPermits: false,
        listAllOtherPermits: '',
        haveCitations: false,
        listAllCitations: ''
      }
    }
  })
};
