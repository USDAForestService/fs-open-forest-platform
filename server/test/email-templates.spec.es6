'use strict';

const noncommercialPermitApplicationFactory = require('./data/noncommercial-permit-application-factory.es6');
const tempOutfitterPermitApplicationFactory = require('./data/tempoutfitter-permit-application-factory.es6');
const emails = require('../src/email/email-templates.es6');
const noncommController = require('../src/controllers/noncommercial.es6');
const tempOutfitterController = require('../src/controllers/temp-outfitter.es6');
const expect = require('chai').expect;
const moment = require('moment');
require('./common.es6');

// to do convert to ${type}.translateFromClientToDatabase beforeall
describe('Special use email templates', () =>{
  const specialUseSubject = 'An update on your recent Open Forest permit application to the Forest Service.';
  const forestName = 'Mt.Baker - Snoqualmie National Forest';
  const adminSubject = `A new permit application with a start date of 12/12/2018 has been submitted to the ${forestName}.`;

  describe('for noncommericial apps', () => {
    let application = {};
    beforeEach(function () {
      // runs before each test in this block
      let applicationFactory = noncommercialPermitApplicationFactory.create();
      noncommController.translateFromClientToDatabase(applicationFactory, application);
      application.forestName = forestName;
    });

    it('should build an object of email content for noncommercial app submission to user', () => {
      const emailContent = emails.noncommercialApplicationSubmittedConfirmation(application);
      const specialUseSubjectCustom = 'Your Noncommercial Open Forest permit application has been submitted for review!';
      expect(emailContent.subject).to.be.eq(specialUseSubjectCustom);
      expect(emailContent).to.have.all.keys('to','subject', 'body', 'html');

      const emailPlainText = emailContent.body.trim();
      const emailHTML = emailContent.html.trim();
      const startTime = moment('2018-12-12T13:00:00Z', 'YYYY-MM-DDTHH:mm:ssZ').format('MM/DD/YYYY hh:mm a');
      const endTime = moment('2018-12-12T21:00:00Z', 'YYYY-MM-DDTHH:mm:ssZ').format('MM/DD/YYYY hh:mm a');
      
      expect(emailPlainText).to.include('NOT APPROVED');
      expect(emailPlainText).to.include('Title: Special use administrator');

      expect(emailPlainText).to.include(`Start date: ${startTime}`);
      expect(emailPlainText).to.include(`End date: ${endTime}`);
      expect(emailHTML).to.include('<strong>NOT APPROVED</strong>');
      expect(emailHTML).to.include('<td class="border-bottom">Special use administrator</td>');
      expect(emailHTML).to.include(startTime);
      expect(emailHTML).to.include(endTime);
    });

    it('should build an object of email content for noncommercial app submission to admin', () => {
      const emailContent = emails.noncommercialApplicationSubmittedAdminConfirmation(application);
      expect(emailContent.subject).to.be.eq(adminSubject);
      expect(emailContent).to.have.all.keys('to', 'subject', 'body', 'html');
    });

    it('should build an object of email content for noncommercial app acceptance to SUDS', () => {
      const emailContent = emails.noncommercialApplicationAccepted(application);
      expect(emailContent.subject).to.be.eq(specialUseSubject);
      expect(emailContent).to.have.all.keys('to', 'subject', 'body', 'html');
    });

    it('should build an object of email content for noncommercial cancellation', () => {
      application.status = 'Cancelled';
      const specialUseSubjectCustom = 'The Fun Party permit application to the Mt.Baker\
 - Snoqualmie National Forest has been cancelled.';
      const emailContent = emails.noncommercialApplicationUserCancelled(application);
      expect(emailContent.subject).to.be.eq(specialUseSubjectCustom);
      expect(emailContent).to.have.all.keys('to', 'subject', 'body', 'html');
    });

    it('should build an object of email content for a noncommercial app that has been reviewed', () => {
      application.status = 'Review';
      const emailContent = emails.noncommercialApplicationReview(application);
      expect(emailContent.subject).to.be.eq(specialUseSubject);
      expect(emailContent).to.have.all.keys('to', 'subject', 'body', 'html');
    });

    it('should build an object of email content for rejected noncommercial applications', () => {
      application.status = 'Rejected';
      const emailContent = emails.noncommercialApplicationRejected(application);
      expect(emailContent.subject).to.be.eq(specialUseSubject);
      expect(emailContent).to.have.all.keys('to', 'subject', 'body', 'html');
    });

    it('should build an object of email content for a noncommercial app that has been reviewed', () => {
      application.status = 'Hold';
      const emailContent = emails.noncommercialApplicationHold(application);
      expect(emailContent.subject).to.be.eq(specialUseSubject);
      expect(emailContent).to.have.all.keys('to', 'subject', 'body', 'html');
    });
  });

  describe('for temp apps', () => {
    let application = {};
    beforeEach(function () {
      // runs before each test in this block
      let applicationFactory = tempOutfitterPermitApplicationFactory.create();
      tempOutfitterController.translateFromClientToDatabase(applicationFactory, application);
      application.forestName = forestName;
    });

    it('should build an object of email content for temp outfitter app submission to user', () => {
      const specialUseSubjectCustom = 'Your Temp outfitters Open Forest permit application has been submitted for review!';
      application.tempOutfitterFieldsActDescFieldsEndDateTime = '2018-12-14T21:00:00Z';
      const emailContent = emails.tempOutfitterApplicationSubmittedConfirmation(application);

      expect(emailContent.subject).to.be.eq(specialUseSubjectCustom);
      expect(emailContent).to.have.all.keys('to', 'subject', 'body', 'html');

      const emailPlainText = emailContent.body.trim();
      const emailHTML = emailContent.html.trim();

      expect(emailPlainText).to.include('NOT APPROVED');
      expect(emailPlainText).to.include('Title: Special use administrator');
      expect(emailPlainText).to.include('Start date: 12/12/2018');
      expect(emailPlainText).to.include('End date: 12/14/2018');
      expect(emailHTML).to.include('<strong>NOT APPROVED</strong>');
      expect(emailHTML).to.include('<td class="border-bottom">Special use administrator</td>');
      expect(emailHTML).to.include('12/12/2018');
      expect(emailHTML).to.include('12/14/2018');
    });

    it('should build an object of email content for a temp-outfitter app that has been put on hold', () => {
      application.status = 'Hold';
      const emailContent = emails.tempOutfitterApplicationHold(application);
      expect(emailContent.subject).to.be.eq(specialUseSubject);
      expect(emailContent).to.have.all.keys('to', 'subject', 'body', 'html');
    });

    it('should build an object of email content for a temp-outfitter app that has been reviewed', () => {
      application.status = 'Review';
      const emailContent = emails.tempOutfitterApplicationReview(application);
      expect(emailContent.subject).to.be.eq(specialUseSubject);
      expect(emailContent).to.have.all.keys('to', 'subject', 'body', 'html');
    });

    it('should build an object of email content for temp app acceptance to SUDS', () => {
      const emailContent = emails.tempOutfitterApplicationAccepted(application);
      expect(emailContent.subject).to.be.eq(specialUseSubject);
      expect(emailContent).to.have.all.keys('to', 'subject', 'body', 'html');
    });

    it('should build an object of email content for temp outfitter user cancellation', () => {
      application.status = 'Cancelled';
      const specialUseSubjectCustom = `The following permit application from Theodore Twombly\
 to the ${forestName} has been cancelled.`;
      const emailContent = emails.tempOutfitterApplicationUserCancelled(application);
      expect(emailContent.subject).to.be.eq(specialUseSubjectCustom);
      expect(emailContent).to.have.all.keys('to', 'subject', 'body', 'html');
    });

    it('should build an object of email content for rejected temp outfitter applications', () => {
      application.status = 'Rejected';
      const emailContent = emails.tempOutfitterApplicationRejected(application);
      expect(emailContent.subject).to.be.eq(specialUseSubject);
      expect(emailContent).to.have.all.keys('to', 'subject', 'body', 'html');
    });

    it('should build an object of email content for temp outfitter app submission to admin', () => {
      application.status = 'Cancelled';
      const emailContent = emails.tempOutfitterApplicationSubmittedAdminConfirmation(application);
      expect(emailContent.subject).to.be.eq(adminSubject);
      expect(emailContent).to.have.all.keys('to', 'subject', 'body', 'html');
    });
  });
});
