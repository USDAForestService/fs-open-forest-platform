'use strict';

const noncommercialSubmittedConfirm = require('./templates/noncommercial/application-submitted-confirmation.es6');
const tempOutfitterSubmittedConfirm = require('./templates/temp-outfitter/application-submitted-confirmation.es6');

const noncommercialSubmittedAdmConfirm = require('./templates/noncommercial/application-submitted-admin-confirmation.es6');
const tempOutfitterSubmittedAdmConfirm = require('./templates/temp-outfitter/application-submitted-admin-confirmation.es6');

const noncommercialApplicationAccepted = require('./templates/noncommercial/application-accepted.es6');
const tempOutfitterApplicationAccepted = require('./templates/temp-outfitter/application-accepted.es6');

const noncommercialApplicationCancelled = require('./templates/noncommercial/application-cancelled.es6');
const tempOutfitterApplicationCancelled = require('./templates/temp-outfitter/application-cancelled.es6');

const noncommercialApplicationUserCancelled = require('./templates/noncommercial/application-user-cancelled.es6');
const tempOutfitterApplicationUserCancelled = require('./templates/temp-outfitter/application-user-cancelled.es6');

const noncommercialApplicationRejected = require('./templates/noncommercial/application-rejected.es6');
const tempOutfitterApplicationRejected = require('./templates/temp-outfitter/application-rejected.es6');

const noncommercialApplicationReview = require('./templates/noncommercial/application-review.es6');
const tempOutfitterApplicationReview = require('./templates/temp-outfitter/application-review.es6');

const noncommercialApplicationHold = require('./templates/noncommercial/application-hold.es6');
const tempOutfitterApplicationHold = require('./templates/temp-outfitter/application-hold.es6');

const noncommercialApplicationRemoveHold = require('./templates/noncommercial/application-remove-hold.es6');
const tempOutfitterApplicationRemoveHold = require('./templates/temp-outfitter/application-remove-hold.es6');

const christmasTreesPermitCreated = require('./templates/christmas-trees/permit-created.es6');

const emailTemplates = {};

emailTemplates.noncommercialApplicationSubmittedConfirmation = application => {
  return noncommercialSubmittedConfirm(application);
};
emailTemplates.tempOutfitterApplicationSubmittedConfirmation = application => {
  return tempOutfitterSubmittedConfirm(application);
};

emailTemplates.noncommercialApplicationSubmittedAdminConfirmation = application => {
  return noncommercialSubmittedAdmConfirm(application);
};

emailTemplates.tempOutfitterApplicationSubmittedAdminConfirmation = application => {
  return tempOutfitterSubmittedAdmConfirm(application);
};

emailTemplates.noncommercialApplicationAccepted = application => {
  return noncommercialApplicationAccepted(application);
};
emailTemplates.tempOutfitterApplicationAccepted = application => {
  return tempOutfitterApplicationAccepted(application);
};

emailTemplates.noncommercialApplicationCancelled = application => {
  return noncommercialApplicationCancelled(application);
};

emailTemplates.tempOutfitterApplicationCancelled = application => {
  return tempOutfitterApplicationCancelled(application);
};

emailTemplates.noncommercialApplicationUserCancelled = application => {
  return noncommercialApplicationUserCancelled(application);
};

emailTemplates.tempOutfitterApplicationUserCancelled = application => {
  return tempOutfitterApplicationUserCancelled(application);
};

emailTemplates.noncommercialApplicationRejected = application => {
  return noncommercialApplicationRejected(application);
};

emailTemplates.tempOutfitterApplicationRejected = application => {
  return tempOutfitterApplicationRejected(application);
};

emailTemplates.noncommercialApplicationReview = application => {
  return noncommercialApplicationReview(application);
};

emailTemplates.tempOutfitterApplicationReview = application => {
  return tempOutfitterApplicationReview(application);
};

emailTemplates.noncommercialApplicationHold = application => {
  return noncommercialApplicationHold(application);
};

emailTemplates.tempOutfitterApplicationHold = application => {
  return tempOutfitterApplicationHold(application);
};

emailTemplates.noncommercialApplicationRemoveHold = application => {
  return noncommercialApplicationRemoveHold(application);
};

emailTemplates.tempOutfitterApplicationRemoveHold = application => {
  return tempOutfitterApplicationRemoveHold(application);
};

emailTemplates.christmasTreesPermitCreated = application => {
  return christmasTreesPermitCreated(application);
};

module.exports = emailTemplates;
