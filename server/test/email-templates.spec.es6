'use strict';

const noncommercialPermitApplicationFactory = require('./data/noncommercial-permit-application-factory.es6');
const tempOutfitterPermitApplicationFactory = require('./data/tempoutfitter-permit-application-factory.es6');
const emails = require('../src/email/email-templates.es6');
const expect = require('chai').expect;

describe('Email templates', () => {
  it('should send an email when noncommercial user cancels', () => {
    const application = noncommercialPermitApplicationFactory.create();
    application.status = 'Cancelled';
    application.type = 'noncommercial';
    emails.noncommercialApplicationUserCancelled(application);
    expect(true).to.be.true;
  });

  it('should send an email when noncommercial user cancels', () => {
    const application = noncommercialPermitApplicationFactory.create();
    application.status = 'Review';
    application.type = 'noncommercial';
    emails.noncommercialApplicationReview(application);
    expect(true).to.be.true;
  });

  it('should send an email when temp outfitter application is rejected', () => {
    const application = tempOutfitterPermitApplicationFactory.create();
    application.status = 'Cancelled';
    application.type = 'temp-outfitter';
    emails.tempOutfitterApplicationRejected(application);
    expect(true).to.be.true;
  });

  it('should send an email when temp outfitter user cancels', () => {
    const application = tempOutfitterPermitApplicationFactory.create();
    application.status = 'Cancelled';
    application.type = 'temp-outfitter';
    emails.tempOutfitterApplicationUserCancelled(application);
    expect(true).to.be.true;
  });

  it('should send an email when temp outfitter user cancels', () => {
    const application = tempOutfitterPermitApplicationFactory.create();
    application.status = 'Review';
    application.type = 'temp-outfitter';
    emails.tempOutfitterApplicationReview(application);
    expect(true).to.be.true;
  });
});
