const templates = {};
templates.startOnlineCollectionRequest = {};
templates.completeOnlineCollectionRequest = {};

templates.startOnlineCollectionRequest.applicationError = tcs_app_id => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
      <soapenv:Header>
         <work:WorkContext xmlns:work="http://oracle.com/weblogic/soap/workarea/">
         </work:WorkContext>
      </soapenv:Header>
      <soapenv:Body>
        <soapenv:Fault xmlns:ns4="http://www.w3.org/2003/05/soap-envelope">
          <faultcode>S:Server</faultcode>
          <faultstring>TCS Error</faultstring>
          <detail>
            <TCSServiceFault xmlns:ns2="http://fms.treas.gov/services/tcsonline">
              <return_code>4019</return_code>
              <return_detail>No agency application found for given tcs_app_id ${tcs_app_id}.</return_detail>
            </TCSServiceFault>
          </detail>
        </soapenv:Fault>
       </soapenv:Body>
    </soapenv:Envelope>`;
};
templates.startOnlineCollectionRequest.noResponse = () => {
  return null;
};
templates.startOnlineCollectionRequest.successfulResponse = token => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
      <soapenv:Header>
       <work:WorkContext xmlns:work="http://oracle.com/weblogic/soap/workarea/">
       </work:WorkContext>
      </soapenv:Header>
      <soapenv:Body>
        <startOnlineCollectionResponse xmlns:ns2="http://fms.treas.gov/services/tcsonline">
          <startOnlineCollectionResponse>
            <token>${token}</token>
          </startOnlineCollectionResponse>
        </startOnlineCollectionResponse>
      </soapenv:Body>
    </soapenv:Envelope>`;
};
templates.completeOnlineCollectionRequest.cardError = returnCode => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
      <soapenv:Header>
         <work:WorkContext xmlns:work="http://oracle.com/weblogic/soap/workarea/">
         </work:WorkContext>
      </soapenv:Header>
      <soapenv:Body>
        <soapenv:Fault xmlns:ns4="http://www.w3.org/2003/05/soap-envelope">
          <faultcode>S:Server</faultcode>
          <faultstring>TCS Error</faultstring>
          <detail>
            <TCSServiceFault xmlns:ns2="http://fms.treas.gov/services/tcsonline">
              <return_code>${returnCode}</return_code>
              <return_detail>The application does not accept credit cards or the transaction exceeds the maximum daily limit for credit card transactions. The transaction will not be processed.</return_detail>
            </TCSServiceFault>
          </detail>
        </soapenv:Fault>
       </soapenv:Body>
    </soapenv:Envelope>`;
};
templates.completeOnlineCollectionRequest.successfulResponse = paygovTrackingId => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
      <soapenv:Header>
       <work:WorkContext xmlns:work="http://oracle.com/weblogic/soap/workarea/">
       </work:WorkContext>
      </soapenv:Header>
      <soapenv:Body>
        <completeOnlineCollectionResponse xmlns:ns2="http://fms.treas.gov/services/tcsonline">
          <completeOnlineCollectionResponse>
            <paygov_tracking_id>${paygovTrackingId}</paygov_tracking_id>
          </completeOnlineCollectionResponse>
        </completeOnlineCollectionResponse>
      </soapenv:Body>
    </soapenv:Envelope>`;
};
module.exports = templates;
