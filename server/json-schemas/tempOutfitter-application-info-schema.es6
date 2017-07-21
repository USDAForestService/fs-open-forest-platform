module.exports = {
  id: '/tempOutfitterApplicantInfo',
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
          enum: ['individual', 'corporation', 'llc', 'partnership', 'stateGovernment', 'localGovernment', 'nonprofit'],
          type: 'string'
        }
      },
      dependencies: {
        organizationName: ['orgType']
      }
    }
  ]
};
