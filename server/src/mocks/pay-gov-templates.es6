const templates = {};
templates.startOnlineCollectionRequest = {};
templates.completeOnlineCollectionRequest = {};

templates.startOnlineCollectionRequest.applicationError = tcsAppId => `
  <?xml version="1.0" encoding="UTF-8"?>
  <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
    <S:Header>
        <WorkContext xmlns="http://oracle.com/weblogic/soap/workarea/">
        </WorkContext>
    </S:Header>
    <S:Body>
      <S:Fault xmlns:ns4="http://www.w3.org/2003/05/soap-envelope">
        <faultcode>soap:Server</faultcode>
        <faultstring>Schema validation error (Paygov).</faultstring>
        <detail>
          <ns2:TCSServiceFault xmlns:ns2="http://fms.treas.gov/services/tcsonline">
            <return_code>4019</return_code>
            <return_detail>No agency application found for given tcs_app_id ${tcsAppId}.</return_detail>
          </ns2:TCSServiceFault>
        </detail>
      </S:Fault>
    </S:Body>
  </S:Envelope>
`;

templates.startOnlineCollectionRequest.agencyTrackingIdError = () => `
  <?xml version="1.0" encoding="UTF-8"?>
  <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
    <S:Header>
      <WorkContext xmlns="http://oracle.com/weblogic/soap/workarea/">
        rO0ABXdjABZ3ZWJsb2dpYy5hcHAudGNzb25saW5lAAAA1gAAACN3ZWJsb2dpYy53b3JrYXJlYS5TdHJpbmdXb3JrQ29udGV4dAAcdjcuNy4wLjc3MzU3XzIwMTlfMDFfMzFfMTQyNgAA
      </WorkContext>
    </S:Header>
    <S:Body>
      <S:Fault xmlns:ns4="http://www.w3.org/2003/05/soap-envelope">
        <faultcode>S:Server</faultcode>
        <faultstring>TCS Error</faultstring>
        <detail>
          <ns2:TCSServiceFault xmlns:ns2="http://fms.treas.gov/services/tcsonline">
            <return_code>4051</return_code>
            <return_detail>The value supplied for the agency_tracking_id is not unique.</return_detail>
          </ns2:TCSServiceFault>
        </detail>
      </S:Fault>
    </S:Body>
  </S:Envelope>
`;

templates.startOnlineCollectionRequest.noResponse = () => null;

templates.startOnlineCollectionRequest.successfulResponse = token => `
  <?xml version="1.0" encoding="UTF-8"?>
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
  </S:Envelope>
`;

templates.completeOnlineCollectionRequest.cardError = () => `
  <?xml version="1.0" encoding="UTF-8"?>
  <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
    <S:Header>
        <WorkContext xmlns="http://oracle.com/weblogic/soap/workarea/">
        </WorkContext>
    </S:Header>
    <S:Body>
      <S:Fault xmlns:ns4="http://www.w3.org/2003/05/soap-envelope">
        <faultcode>S:Server</faultcode>
        <faultstring>TCS Error</faultstring>
        <detail>
          <ns2:TCSServiceFault xmlns:ns2="http://fms.treas.gov/services/tcsonline">
            <return_code>0000</return_code>
            <return_detail>The application does not accept credit cards or the transaction exceeds the maximum
            daily limit for credit card transactions. The transaction will not be processed.</return_detail>
          </ns2:TCSServiceFault>
        </detail>
      </S:Fault>
    </S:Body>
  </S:Envelope>
`;

templates.completeOnlineCollectionRequest.badToken = () => `
  <?xml version="1.0" encoding="UTF-8"?>
  <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
    <S:Header>
      <WorkContext xmlns="http://oracle.com/weblogic/soap/workarea/">
        rO0ABXdjABZ3ZWJsb2dpYy5hcHAudGNzb25saW5lAAAA1gAAACN3ZWJsb2dpYy53b3JrYXJlYS5TdHJpbmdXb3JrQ29udGV4dAAcdjcuNy4wLjc3MzU3XzIwMTlfMDFfMzFfMTQyNgAA
      </WorkContext>
    </S:Header>
    <S:Body>
      <S:Fault xmlns:ns4="http://www.w3.org/2003/05/soap-envelope">
        <faultcode>S:Server</faultcode>
        <faultstring>TCS Error</faultstring>
        <detail>
          <ns2:TCSServiceFault xmlns:ns2="http://fms.treas.gov/services/tcsonline">
            <return_code>4117</return_code>
            <return_detail>Token does not exist, has been acted upon already, or is too old and cannot be acted upon</return_detail>
          </ns2:TCSServiceFault>
        </detail>
      </S:Fault>
    </S:Body>
  </S:Envelope>
`;

templates.completeOnlineCollectionRequest.successfulResponse = paygovTrackingId => `
  <?xml version="1.0" encoding="UTF-8"?>
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

module.exports = templates;
