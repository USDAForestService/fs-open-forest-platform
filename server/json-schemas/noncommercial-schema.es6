module.exports = {
  id: '/noncommercialPermit',
  type: 'object',
  allOf: [
    { $ref: '/commonFields' },
    {
      properties: {
        applicantInfo: {
          $ref: '/noncommercialApplicantInfo'
        },
        dateTimeRange: {
          $ref: '/dateTimeRange'
        },
        eventName: {
          default: '',
          type: 'string'
        },
        type: {
          default: 'noncommercial',
          enum: ['noncommercial', 'tempOutfitters'],
          type: 'string'
        },
        noncommercialFields: {
          $ref: '/noncommercialFields'
        }
      },
      required: ['applicantInfo', 'dateTimeRange', 'type', 'noncommercialFields', 'eventName']
    }
  ]
};
