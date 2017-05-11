var noncommercialSchema = {
        "id":"/noncommercialPermit",
        "type":"object",
        "allOf":[
            { "$ref": "/commonFields"},
            {
                "properties":{
                    "applicantInfo": {
                        "$ref": "/noncommercialApplicantInfo"
                    },
                    "type": {
                        "default": "noncommercial",
                        "enum":[
                            "noncommercial",
                            "tempOutfitters"
                        ],
                        "fromIntake":true,
                        "type": "string"
                    },
                    "noncommercialFields": {
                        "$ref": "/noncommercialFields"
                    }
                },
                "required": ["applicantInfo", "type", "noncommercialFields"]
            }
        ]
    };

    var noncommercialApplicantInfoSchema = {
        "id": "/noncommercialApplicantInfo",
        "type": "object",
        "allOf":[
            {"$ref":"/applicantInfoBase"},
            {
                "properties": {
                    "organizationName": {
                        "basicField":"contName",
                        "default":"",
                        "fromIntake":true,
                        "type": "string"
                    },
                    "orgType":{
                        "basicField":"orgType",
                        "default":"",
                        "description":"Organization Type",
                        "enum":[
                            "Individual",
                            "Corporation",
                            "Limited Liability Company",
                            "Partnership or Association",
                            "State Government or Agency",
                            "Local Government or Agency",
                            "Nonprofit"
                        ],
                        "fromIntake":true,
                        "type":"string"
                    }
                },
                "dependencies":{
                    "organizationName":["orgType"]
                }
            }
        ]

    };

    var noncommercialFieldsSchema = {
        "id": "/noncommercialFields",
        "type": "object",
        "properties": {
            "activityDescription": {
                "default":"",
                "fromIntake":true,
                "type": "string"
            },
            "locationDescription": {
                "default":"",
                "fromIntake":true,
                "type": "string"
            },
            "startDateTime": {
                "default":"",
                "fromIntake":true,
                "pattern":"^(19|20)\\d\\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T(0\\d|1\\d|2[0-3]):(0\\d|1\\d|2[0-3]):(0\\d|1\\d|2[0-3])Z$",
                "type": "string"
            },
            "endDateTime": {
                "default":"",
                "fromIntake":true,
                "pattern":"^(19|20)\\d\\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T(0\\d|1\\d|2[0-3]):(0\\d|1\\d|2[0-3]):(0\\d|1\\d|2[0-3])Z$",
                "type": "string"
            },
            "numberParticipants": {
                "default":0,
                "fromIntake":true,
                "type": "integer"
            },
            "formName":{
                "basicField":"formName",
                "default":"FS-2700-3b",
                "type":"string"
            }
        },
        "required": ["activityDescription", "locationDescription", "startDateTime", "endDateTime", "numberParticipants"]
    };

    var phoneNumberSchema = {
        "id": "/phoneNumber",
        "type": "object",
        "properties": {
            "areaCode": {
                "basicField":"areaCode",
                "default":0,
                "fromIntake":true,
                "format": "areaCodeFormat",
                "type": "integer"
            },
            "number": {
                "basicField":"phoneNumber",
                "default":0,
                "fromIntake":true,
                "format": "phoneNumberFormat",
                "type": "integer"
            },
            "extension": {
                "basicField":"extension",
                "default":"",
                "fromIntake":true,
                "pattern": "[\\d]+",
                "type": "string"
            },
            "phoneType": {
                "basicField":"phoneNumberType",
                "default":"",
                "fromIntake":true,
                "type": "string"
            }
        },
        "required": ["areaCode", "number", "phoneType"]

    };

    var applicantInfoBaseSchema = {
        "id":"/applicantInfoBase",
        "type":"object",
        "properties":{
            "firstName": {
                "basicField":"firstName",
                "default":"",
                "fromIntake":true,
                "maxLength":255,
                "type": "string"
            },
            "lastName": {
                "basicField":"lastName",
                "default":"",
                "fromIntake":true,
                "maxLength":255,
                "type": "string"
            },
            "dayPhone": { "$ref": "phoneNumber" },
            "eveningPhone": { "$ref": "phoneNumber" },
            "emailAddress": {
                "basicField":"email",
                "default":"",
                "fromIntake":true,
                "pattern":"^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$",
                "type": "string"
            },
            "mailingAddress": {
                "basicField":"address1",
                "default":"",
                "fromIntake":true,
                "type": "string"
            },
            "mailingAddress2": {
                "basicField":"address2",
                "default":"",
                "fromIntake":true,
                "type": "string"
            },
            "mailingCity": {
                "basicField":"cityName",
                "default":"",
                "fromIntake":true,
                "type": "string"
            },
            "mailingState": {
                "basicField":"stateCode",
                "default":"",
                "fromIntake":true,
                "pattern":"^(A[EKLPRSZ]|C[AOT]|D[CE]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHVJMY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$",
                "type": "string"
            },
            "mailingZIP": {
                "basicField":"postalCode",
                "default":"",
                "fromIntake":true,
                "pattern":"^[0-9]{5}$|^[0-9]{9}$",
                "type": "string"
            },
            "website":{
                "default":"",
                "fromIntake":true,
                "type": "string"
            }
        },
        "required": ["firstName", "lastName", "dayPhone", "emailAddress", "mailingAddress", "mailingCity", "mailingZIP", "mailingState"]
    };

    var commonFieldsSchema = {
        "id":"/commonFields",
        "type":"object",
        "properties":{
            "region": {
                "default":"",
                "fromIntake":true,
                "pattern":"^[0-9]{2}$",
                "type" : "string"
            },
            "forest": {
                "default":"",
                "fromIntake":true,
                "pattern":"^[0-9]{2}$",
                "type" : "string"
            },
            "district": {
                "default":"",
                "fromIntake":true,
                "pattern":"^[0-9]{2}$",
                "type" : "string"
            },
            "securityId":{
                "basicField":"securityId",
                "default":"",
                "fromIntake":false,
                "madeOf":["region","forest","district"],
                "type" : "string"
            },
            "managingID":{
                "basicField":"managingOrg",
                "default":"",
                "fromIntake":false,
                "madeOf":["region","forest","district"],
                "type" : "string"
            },
            "adminOrg":{
                "basicField":"adminOrg",
                "default":"",
                "fromIntake":false,
                "madeOf":["region","forest","district"],
                "type" : "string"
            },
            "ePermitID":{
                "basicField":"ePermitID",
                "default":"",
                "fromIntake":false,
                "madeOf":["region","forest","00000"],
                "type" : "string"
            },
            "acres":{
                "basicField":"acres",
                "default":0,
                "fromIntake":false,
                "type" : "integer"
            },
            "contCN":{
                "basicField":"contact",
                "default":"",
                "fromIntake":false,
                "type" : "string"
            }
        },
        "required": ["region", "forest", "district"]
};

module.exports.noncommercialSchema = noncommercialSchema;
module.exports.noncommercialApplicantInfoSchema = noncommercialApplicantInfoSchema;
module.exports.noncommercialFieldsSchema = noncommercialFieldsSchema;
module.exports.phoneNumberSchema = phoneNumberSchema;
module.exports.applicantInfoBaseSchema = applicantInfoBaseSchema;
module.exports.commonFieldsSchema = commonFieldsSchema;
