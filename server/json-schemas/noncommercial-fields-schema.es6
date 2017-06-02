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
    'startMonth' : {
      'default' : '',
      'pattern' : '^0?[1-9]|1[012]$',
      'type' : 'string'
    },
    'startDay' : {
      'default' : '',
      'pattern' : '^0?[1-9]|1[0-9]|2[0-9]|3[01]$',
      'type' : 'string'
    },
    'startYear' : {
      'default' : '',
      'pattern' : '^[0-9]{4}$',
      'type' : 'string'
    },
    'endMonth' : {
      'default' : '',
      'pattern' : '^0?[1-9]|1[012]$',
      'type' : 'string'
    },
    'endDay' : {
      'default' : '',
      'pattern' : '^0?[1-9]|1[0-9]|2[0-9]|3[01]$',
      'type' : 'string'
    },
    'endYear' : {
      'default' : '',
      'pattern' : '^[0-9]{4}$',
      'type' : 'string'
    },
    'startHour' : {
      'default' : '',
      'pattern' : '^0?[1-9]|1[012]$',
      'type' : 'string'
    },
    'startMinutes' : {
      'default' : '',
      'enum':[
        '00',
        '15',
        '30',
        '45',
      ],
      'type' : 'string'
    },
    'startPeriod' : {
      'default' : '',
      'enum':[
        'AM',
        'PM'
      ],
      'type' : 'string'
    },
    'endHour' : {
      'default' : '',
      'pattern' : '^0?[1-9]|1[012]$',
      'type' : 'string'
    },
    'endMinutes' : {
      'default' : '',
      'enum':[
        '00',
        '15',
        '30',
        '45',
      ],
      'type' : 'string'
    },
    'endPeriod' : {
      'default' : '',
      'enum':[
        'AM',
        'PM'
      ],
      'type' : 'string'
    }
  },
  'required': ['activityDescription', 'locationDescription', 'startDateTime', 'endDateTime', 'numberParticipants']
};
