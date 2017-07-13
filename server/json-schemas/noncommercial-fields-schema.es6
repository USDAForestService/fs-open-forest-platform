module.exports = {
  id: '/noncommercialFields',
  type: 'object',
  properties: {
    activityDescription: {
      default: '',
      type: 'string'
    },
    locationDescription: {
      default: '',
      type: 'string'
    },
    numberParticipants: {
      default: '0',
      type: 'integer'
    },
    formName: {
      default: 'FS-2700-3b',
      type: 'string'
    },
    spectators: {
      default: '0',
      type: 'integer'
    }
  },
  required: ['activityDescription', 'locationDescription', 'numberParticipants', 'spectators']
};
