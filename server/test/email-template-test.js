const expect = require('chai').expect;
const templates = require('../src/email/email-templates.es6');

describe('email templates', () => {
  it('should return business name or person name', done => {
    const application = {
      applicantInfoOrganizationName: '',
      applicantInfoPrimaryFirstName: 'first',
      applicantInfoPrimaryLastName: 'last'
    };

    expect(templates.businessNameElsePersonalName(application)).equal('first last');
    done();
  });
});
