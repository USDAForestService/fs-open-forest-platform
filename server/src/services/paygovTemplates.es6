const paygovTemplates = {};

paygovTemplates.startCollection = [
  {
    'soap:Envelope': [
      {
        _attr: {
          'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/'
        }
      },
      {
        'soap:Body': [
          {
            'ns2:startOnlineCollection': [
              {
                _attr: {
                  'xmlns:ns2': 'http://fms.treas.gov/services/tcsonline'
                }
              },
              {
                startOnlineCollectionRequest: [
                  {
                    tcs_app_id: ''
                  },
                  {
                    agency_tracking_id: ''
                  },
                  {
                    transaction_type: 'Sale'
                  },
                  {
                    transaction_amount: ''
                  },
                  {
                    language: 'EN'
                  },
                  {
                    url_success: ''
                  },
                  {
                    url_cancel: ''
                  },
                  {
                    account_holder_name: ''
                  },
                  {
                    custom_fields: [
                      {
                        custom_field_1: ''
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

paygovTemplates.completeTransaction = [
  {
    'soap:Envelope': [
      {
        _attr: {
          'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/'
        }
      },
      {
        'soap:Header': []
      },
      {
        'soap:Body': [
          {
            'ns2:completeOnlineCollection': [
              {
                _attr: {
                  'xmlns:ns2': 'http://fms.treas.gov/services/tcsonline'
                }
              },
              {
                completeOnlineCollectionRequest: [
                  {
                    tcs_app_id: ''
                  },
                  {
                    token: ''
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

module.exports = paygovTemplates;
