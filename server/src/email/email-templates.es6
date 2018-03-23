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

const email = {};

email.noncommercialApplicationSubmittedConfirmation = application => {
  return noncommercialSubmittedConfirm(application);
};
email.tempOutfitterApplicationSubmittedConfirmation = application => {
  return tempOutfitterSubmittedConfirm(application);
};

email.noncommercialApplicationSubmittedAdminConfirmation = application => {
  return noncommercialSubmittedAdmConfirm(application);
};

email.tempOutfitterApplicationSubmittedAdminConfirmation = application => {
  return tempOutfitterSubmittedAdmConfirm(application);
};

email.noncommercialApplicationAccepted = application => {
  return noncommercialApplicationAccepted(application);
};
email.tempOutfitterApplicationAccepted = application => {
  return tempOutfitterApplicationAccepted(application);
};

email.noncommercialApplicationCancelled = application => {
  return noncommercialApplicationCancelled(application);
};

email.tempOutfitterApplicationCancelled = application => {
  return tempOutfitterApplicationCancelled(application);
};

email.noncommercialApplicationUserCancelled = application => {
  return noncommercialApplicationUserCancelled(application);
};

email.tempOutfitterApplicationUserCancelled = application => {
  return tempOutfitterApplicationUserCancelled(application);
};

email.noncommercialApplicationRejected = application => {
  return noncommercialApplicationRejected(application);
};

email.tempOutfitterApplicationRejected = application => {
  return tempOutfitterApplicationRejected(application);
};

email.noncommercialApplicationReview = application => {
  return noncommercialApplicationReview(application);
};

email.tempOutfitterApplicationReview = application => {
  return tempOutfitterApplicationReview(application);
};

email.noncommercialApplicationHold = application => {
  return noncommercialApplicationHold(application);
};

email.tempOutfitterApplicationHold = application => {
  return tempOutfitterApplicationHold(application);
};

email.noncommercialApplicationRemoveHold = application => {
  return noncommercialApplicationRemoveHold(application);
};

email.tempOutfitterApplicationRemoveHold = application => {
  return tempOutfitterApplicationRemoveHold(application);
};

email.christmasTreesPermitCreated = application => {
  return christmasTreesPermitCreated(application);
};

module.exports = email;
