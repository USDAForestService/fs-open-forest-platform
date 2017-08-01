module.exports = {
  id: '/tempOutfitterFields',
  type: 'object',
  properties: {
    individualIsCitizen: {
      default: false,
      type: 'boolean'
    },
    smallBusiness: {
      default: false,
      type: 'boolean'
    },
    advertisingURL: {
      default: '',
      type: 'string'
    },
    advertisingDescription: {
      default: '',
      type: 'string'
    },
    clientCharges: {
      default: '',
      type: 'string'
    },
    experienceList: {
      default: '',
      type: 'string'
    },
    formName: {
      default: 'FS-2700-3b',
      type: 'string'
    },
    activityDescriptionFields: {
      $ref: '/activityDescriptionFields'
    },
    experienceFields: {
      $ref: '/experienceFields'
    }
  },
  allOf: [
    {
      required: ['clientCharges', 'activityDescriptionFields']
    },
    {
      anyOf: [
        {
          required: ['advertisingURL']
        },
        {
          required: ['advertisingDescription']
        }
      ]
    }
  ]
};
