module.exports = {
  'id': '/noncommercialFields',
  'type': 'object',
  'properties': {
    'activityDescription': {
      'default':'',
      'type': 'string'
    },
    'locationDescription': {
      'default':'',
      'type': 'string'
    },
    'startDateTime': {
      'default':'',
      'pattern':'^(19|20)\\d\\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T(0\\d|1\\d|2[0-3]):(0\\d|1\\d|2[0-3]):(0\\d|1\\d|2[0-3])Z$',
      'type': 'string'
    },
    'endDateTime': {
      'default':'',
      'pattern':'^(19|20)\\d\\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T(0\\d|1\\d|2[0-3]):(0\\d|1\\d|2[0-3]):(0\\d|1\\d|2[0-3])Z$',
      'type': 'string'
    },
    'numberParticipants': {
      'default': '0',
      'type': 'integer'
    },
    'formName':{
      'default':'FS-2700-3b',
      'type':'string'
    },
    'spectators': {
      'default': '',
      'type': 'integer'
    }
  },
  'required': ['activityDescription', 'locationDescription', 'startDateTime', 'endDateTime', 'numberParticipants']
};
