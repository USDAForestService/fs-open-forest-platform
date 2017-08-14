module.exports = {
  id: '/activityDescriptionFields',
  type: 'object',
  properties: {
    numberServiceDaysRequested: {
      default: '0',
      type: 'integer'
    },
    numberOfTrips: {
      default: '0',
      type: 'integer'
    },
    dateTimeRange: {
      $ref: '/dateTimeRange'
    },
    locationDescription: {
      default: '',
      type: 'string'
    },
    servicesProvided: {
      default: '',
      type: 'string'
    },
    audienceDescription: {
      default: '',
      type: 'string'
    },
    listOfGovernmentFacilities: {
      default: '',
      type: 'string'
    },
    listOfTemporaryImprovements: {
      default: '',
      type: 'string'
    },
    statementOfMotorizedEquipment: {
      default: '',
      type: 'string'
    },
    statementOfTransportationOfLivestock: {
      default: '',
      type: 'string'
    },
    statementOfAssignedSite: {
      default: '',
      type: 'string'
    },
    descriptionOfCleanupAndRestoration: {
      default: '',
      type: 'string'
    },
    partySize: {
      default: '0',
      type: 'string'
    }
  }
};
