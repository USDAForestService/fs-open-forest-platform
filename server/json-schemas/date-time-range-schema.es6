'use strict';

module.exports = {
  id: '/dateTimeRange',
  type: 'object',
  properties: {
    startDateTime: {
      default: '',
      type: 'string'
    },
    endDateTime: {
      default: '',
      type: 'string'
    }
  },
  required: ['startDateTime', 'endDateTime']
};
