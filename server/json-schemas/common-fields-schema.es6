module.exports = {
  'id':'/commonFields',
  'type':'object',
  'properties':{
    'region': {
      'default':'',
      'pattern':'^[0-9]{2}$',
      'type' : 'string'
    },
    'forest': {
      'default':'',
      'pattern':'^[0-9]{2}$',
      'type' : 'string'
    },
    'district': {
      'default':'',
      'pattern':'^[0-9]{2}$',
      'type' : 'string'
    },
    'securityId':{
      'default':'',
      'type' : 'string'
    },
    'managingID':{
      'default':'',
      'type' : 'string'
    },
    'adminOrg':{
      'default':'',
      'type' : 'string'
    },
    'ePermitID':{
      'default':'',
      'type' : 'string'
    },
    'acres':{
      'default': 0,
      'type' : 'integer'
    },
    'contCN':{
      'default':'',
      'type' : 'string'
    },
    'signature': {
      'default': '',
      'type': 'string'
    },
    'reasonForReturn': {
      'default': '',
      'type': 'string'
    }
  },
  'required': ['region', 'forest', 'district']
};
