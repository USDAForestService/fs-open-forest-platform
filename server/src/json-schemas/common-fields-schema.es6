'use strict';

module.exports = {
  id: '/commonFields',
  type: 'object',
  properties: {
    region: {
      default: '',
      pattern: '^[0-9]{2}$',
      type: 'string'
    },
    forest: {
      default: '',
      pattern: '^[0-9]{2}$',
      type: 'string'
    },
    district: {
      default: '',
      pattern: '^[0-9]{2}$',
      type: 'string'
    },
    signature: {
      default: '',
      type: 'string'
    },
    applicantMessage: {
      default: '',
      type: 'string'
    },
    authEmail: {
      default: '',
      type: 'string'
    }
  },
  required: ['region', 'forest', 'district', 'signature', 'authEmail']
};
