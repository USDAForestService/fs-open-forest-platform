module.exports = {
  'id': '/phoneNumber',
  'type': 'object',
  'properties': {
    'areaCode': {
      'default': '0',
      'pattern' : '^[0-9]{3}$',
      'type': 'string'
    },
    'prefix': {
      'default': '0',
      'pattern' : '^[0-9]{3}$',
      'type': 'string'
    },
    'number': {
      'default': '0',
      'pattern' : '^[0-9]{4}$',
      'type': 'string'
    },
    'extension': {
      'default':'',
      'pattern': '[\\d]+',
      'type': 'string'
    },
    'phoneType': {
      'default':'',
      'type': 'string'
    }
  },
  'required': ['areaCode', 'prefix', 'number']
};
