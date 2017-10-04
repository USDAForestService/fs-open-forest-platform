'use strict';

const noncommercialApplicationSubmittedConfirmation = require('./templates/noncommercial/application-submitted-confirmation.es6');
const tempOutfitterApplicationSubmittedConfirmation = require('./templates/temp-outfitter/application-submitted-confirmation.es6');

const noncommercialApplicationSubmittedAdminConfirmation = require('./templates/noncommercial/application-submitted-admin-confirmation.es6');
const tempOutfitterApplicationSubmittedAdminConfirmation = require('./templates/temp-outfitter/application-submitted-admin-confirmation.es6');

const noncommercialApplicationAccepted = require('./templates/noncommercial/application-accepted.es6');
const tempOutfitterApplicationAccepted = require('./templates/temp-outfitter/application-accepted.es6');

const noncommercialApplicationCancelled = require('./templates/noncommercial/application-cancelled.es6');
const tempOutfitterApplicationCancelled = require('./templates/temp-outfitter/application-cancelled.es6');

const noncommercialApplicationReturned = require('./templates/noncommercial/application-returned.es6');
const tempOutfitterApplicationReturned = require('./templates/temp-outfitter/application-returned.es6');

const email = {};

email.noncommercialApplicationSubmittedConfirmation = application => {
  return noncommercialApplicationSubmittedConfirmation(application);
};
email.tempOutfitterApplicationSubmittedConfirmation = application => {
  return tempOutfitterApplicationSubmittedConfirmation(application);
};

email.noncommercialApplicationSubmittedAdminConfirmation = application => {
  return noncommercialApplicationSubmittedAdminConfirmation(application);
};

email.tempOutfitterApplicationSubmittedAdminConfirmation = application => {
  return tempOutfitterApplicationSubmittedAdminConfirmation(application);
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

email.noncommercialApplicationReturned = application => {
  return noncommercialApplicationReturned(application);
};

email.tempOutfitterApplicationReturned = application => {
  return tempOutfitterApplicationReturned(application);
};

module.exports = email;
