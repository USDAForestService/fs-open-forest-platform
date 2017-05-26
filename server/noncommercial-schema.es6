var noncommercialSchema = {
  'id':'/noncommercialPermit',
  'type':'object',
  'allOf':[
    { '$ref': '/commonFields'},
    {
      'properties':{
        'applicantInfo': {
          '$ref': '/noncommercialApplicantInfo'
        },
        'type': {
          'default': 'noncommercial',
          'enum':[
            'noncommercial',
            'tempOutfitters'
          ],
          'type': 'string'
        },
        'noncommercialFields': {
          '$ref': '/noncommercialFields'
        }
      },
      'required': ['applicantInfo', 'type', 'noncommercialFields']
    }
  ]
};

var noncommercialApplicantInfoSchema = {
  'id': '/noncommercialApplicantInfo',
  'type': 'object',
  'allOf':[
    {'$ref':'/applicantInfoBase'},
    {
      'properties': {
        'organizationName': {
          'default':'',
          'type': 'string'
        },
        'orgType':{
          'default':'',
          'description':'Organization Type',
          'enum':[
            'Individual',
            'Corporation',
            'Limited Liability Company',
            'Partnership or Association',
            'State Government or Agency',
            'Local Government or Agency',
            'Nonprofit'
          ],
          'type':'string'
        }
      },
      'dependencies':{
        'organizationName':['orgType']
      }
    }
  ]
};

var noncommercialFieldsSchema = {
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

var phoneNumberSchema = {
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
//  'required': ['areaCode', 'prefix', 'number', 'phoneType']
};

var applicantInfoBaseSchema = {
  'id':'/applicantInfoBase',
  'type':'object',
  'properties':{
    'primaryFirstName': {
      'default':'',
      'maxLength':255,
      'type': 'string'
    },
    'primaryLastName': {
      'default':'',
      'maxLength':255,
      'type': 'string'
    },
    'secondaryFirstName': {
      'default':'',
      'maxLength':255,
      'type': 'string'
    },
    'secondaryLastName': {
      'default':'',
      'maxLength':255,
      'type': 'string'
    },
    'dayPhone': { '$ref': '/phoneNumber' },
    'eveningPhone': { '$ref': '/phoneNumber' },
    'emailAddress': {
      'default':'',
      'pattern':'^(([^<>()\\[\\]\\\\.,;:\\s@\']+(\\.[^<>()\\[\\]\\\\.,;:\\s@\']+)*)|(\'.+\'))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
      'type': 'string'
    },
    'organizationAddress' : { '$ref' : '/address' },
    'primaryAddress' : { '$ref' : '/address' },
    'secondaryAddress' : { '$ref' : '/address' },
    'website':{
      'default':'',
      'type': 'string'
    }
  },
  'required': ['primaryFirstName', 'primaryLastName', 'dayPhone', 'emailAddress']
  // either primaryAddress or organizationAddress
};

var addressSchema = {
  'id' : '/address',
  'type' : 'object',
  'properties' : {
    'mailingAddress': {
      'default':'',
      'type': 'string'
    },
    'mailingAddress2': {
      'default':'',
      'type': 'string'
    },
    'mailingCity': {
      'default':'',
      'type': 'string'
    },
    'mailingState': {
      'default':'',
      'pattern':'^(A[EKLPRSZ]|C[AOT]|D[CE]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHVJMY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$',
      'type': 'string'
    },
    'mailingZIP': {
      'default':'',
      'pattern':'^[0-9]{5}$|^[0-9]{9}$',
      'type': 'string'
    }
  },
//  'required' : ['mailingAddress', 'mailingCity', 'mailingState', 'mailingZIP']
};

var commonFieldsSchema = {
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
      'default':0,
      'type' : 'integer'
    },
    'contCN':{
      'default':'',
      'type' : 'string'
    }
  },
  'required': ['region', 'forest', 'district']
};

module.exports.noncommercialSchema = noncommercialSchema;
module.exports.noncommercialApplicantInfoSchema = noncommercialApplicantInfoSchema;
module.exports.noncommercialFieldsSchema = noncommercialFieldsSchema;
module.exports.phoneNumberSchema = phoneNumberSchema;
module.exports.applicantInfoBaseSchema = applicantInfoBaseSchema;
module.exports.commonFieldsSchema = commonFieldsSchema;
module.exports.addressSchema = addressSchema;
