const request = require('supertest');
const server = require('./mock-aws.spec.es6');

describe('mock pay gov', () => {
  // describe('GET', () => {
  //   const get
  //   it('should return a 200 response when requested to open mock pay.gov', (done) => {
  //     request(server)
  //       .get(`/mock-pay-gov?token=${paygovToken}&tcsAppID=${tcsAppID}`)
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(200, done);
  //   });

  //   it('should return a 200 response when requested to open mock pay.gov with token and tcsAppID', (done) => {
  //     request(server)
  //       .get(`/mock-pay-gov?token=${paygovToken}&tcsAppID=${tcsAppID}`)
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(200, done);
  //   });

  //   it('should return a 404 response when requested to open mock pay.gov with invalid token and tcsAppID', (done) => {
  //     request(server)
  //       .get(`/mock-pay-gov?token=${invalidPermitId}&tcsAppID=${tcsAppID}`)
  //       .set('Accept', 'application/json')
  //       .expect(404, done);
  //   });
  // });

  describe('POST', () => {
    const postMockPayGovProcess = transaction => request(server)
      .post('/mock-pay-gov-process')
      .send(transaction)
      .expect('Content-Type', /json/);

    it('should return a 200 response when submitted to mock pay.gov with invalid credit card', (done) => {
      const transaction = { token: 'abc123', cc: '0000000000000000' };

      postMockPayGovProcess(transaction)
        .expect(200, done);
    });

    it('POST should return a 200 response when submitted to mock pay.gov with invalid credit card with error code in last 4 digits', (done) => {
      const transaction = { token: 'abc123', cc: '0000000000001234' };

      postMockPayGovProcess(transaction)
        .expect((res) => {
          expect(res.body.errorCode).to.equal('1234');
        })
        .expect(200, done);
    });
  });
});
