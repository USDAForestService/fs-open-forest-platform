module.exports = {
  id: '/noncommercialApplicantInfo',
  type: 'object',
  allOf: [
    { $ref: '/applicantInfoBase' },
    {
      properties: {
        organizationName: {
          default: '',
          type: 'string'
        },
        orgType: {
          default: '',
          description: 'Organization Type',
          enum: ['Person', 'Corporation'],
          type: 'string'
        }
      },
      dependencies: {
        organizationName: ['orgType']
      }
    }
  ]
};
