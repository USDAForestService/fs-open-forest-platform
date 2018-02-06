const templates = {};
templates.startOnlineCollectionRequest = {};
templates.completeOnlineCollectionRequest = {};

templates.startOnlineCollectionRequest.applicationError = tcs_app_id => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
      <soapenv:Header>
         <work:WorkContext xmlns:work="http://oracle.com/weblogic/soap/workarea/">
         </work:WorkContext>
      </soapenv:Header>
      <soapenv:Body>
        <soapenv:Fault xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope">
          <faultcode>soap:Server</faultcode>
          <faultstring>Schema validation error (Paygov).</faultstring>
          <detail>
            <TCSServiceFault xmlns="http://fms.treas.gov/services/tcsonline">
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
    <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
      <S:Header>
       <WorkContext xmlns="http://oracle.com/weblogic/soap/workarea/">
       </WorkContext>
      </S:Header>
      <S:Body>
        <ns2:startOnlineCollectionResponse xmlns:ns2="http://fms.treas.gov/services/tcsonline">
          <startOnlineCollectionResponse>
            <token>${token}</token>
          </startOnlineCollectionResponse>
        </ns2:startOnlineCollectionResponse>
      </S:Body>
    </S:Envelope>`;
};
templates.completeOnlineCollectionRequest.cardError = returnCode => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
      <soapenv:Header>
         <work:WorkContext xmlns:work="http://oracle.com/weblogic/soap/workarea/">
         </work:WorkContext>
      </soapenv:Header>
      <soapenv:Body>
        <soapenv:Fault xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
          <faultcode>soap:Server</faultcode>
          <faultstring>TCS Error</faultstring>
          <detail>
            <TCSServiceFault xmlns="http://fms.treas.gov/services/tcsonline">
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
    <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
      <S:Header>
       <WorkContext xmlns="http://oracle.com/weblogic/soap/workarea/">
       </WorkContext>
      </S:Header>
      <S:Body>
        <ns2:completeOnlineCollectionResponse xmlns:ns2="http://fms.treas.gov/services/tcsonline">
          <completeOnlineCollectionResponse>
            <paygov_tracking_id>${paygovTrackingId}</paygov_tracking_id>
          </completeOnlineCollectionResponse>
        </ns2:completeOnlineCollectionResponse>
      </S:Body>
    </S:Envelope>`;
};
module.exports = templates;
