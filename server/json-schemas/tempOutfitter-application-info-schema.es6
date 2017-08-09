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
          enum: [
            'Association',
            'Corporation',
            'Education',
            'Federal Government',
            'State Government',
            'Local Govt',
            'Married Common Property',
            'Limited Liability Company (LLC)',
            'Limited Liability Partnership (LLP)',
            'Person',
            'Trust'
          ],
          type: 'string'
        }
      },
      dependencies: {
        organizationName: ['orgType']
      }
    }
  ]
};
