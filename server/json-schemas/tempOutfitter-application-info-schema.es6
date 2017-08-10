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
            'Limited Liability Company (LLC)',
            'Limited Liability Partnership (LLP)',
            'Local Govt',
            'Married Common Property',
            'Nonprofit',
            'Person',
            'State Government',
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
