'use strict';

const defaultNoncommerialApplicationDetails = require('./templates/noncommercial/default-application-details.es6');
const defaultTempApplicationDetails = require('./templates/temp-outfitter/default-application-details.es6');

const specialUseSubmittedConfirm = require('./templates/special-use-common/application-submitted-confirmation.es6');

const noncommercialSubmittedAdminConfirm = require('./templates/noncommercial/application-submitted-admin-confirmation.es6');
const tempOutfitterSubmittedAdminConfirm = require('./templates/temp-outfitter/application-submitted-admin-confirmation.es6');

const specialUseApplicationAccepted = require('./templates/special-use-common/application-accepted.es6');
const specialUseApplicationCancelled = require('./templates/special-use-common/application-cancelled.es6');

const noncommercialApplicationUserCancelled = require('./templates/noncommercial/application-user-cancelled.es6');
const tempOutfitterApplicationUserCancelled = require('./templates/temp-outfitter/application-user-cancelled.es6');

const specialUseApplicationRejected = require('./templates/special-use-common/application-rejected.es6');

const specialUseApplicationReview = require('./templates/special-use-common/application-review.es6');
const specialUseApplicationRemoveHold = require('./templates/special-use-common/application-remove-hold.es6');

const specialUseApplicationHold = require('./templates/special-use-common/application-hold.es6');



const christmasTreesPermitCreated = require('./templates/christmas-trees/permit-created.es6');

const emailTemplates = {};

emailTemplates.noncommercialApplicationSubmittedConfirmation = application => {
  return specialUseSubmittedConfirm(
    application,
    defaultNoncommerialApplicationDetails,
    ' within 48 hours'
  );
};
emailTemplates.tempOutfitterApplicationSubmittedConfirmation = application => {
  return specialUseSubmittedConfirm(
    application,
    defaultTempApplicationDetails,''
  );
};

emailTemplates.noncommercialApplicationSubmittedAdminConfirmation = application => {
  return noncommercialSubmittedAdminConfirm(application);
};

emailTemplates.tempOutfitterApplicationSubmittedAdminConfirmation = application => {
  return tempOutfitterSubmittedAdminConfirm(application);
};

emailTemplates.noncommercialApplicationAccepted = application => {
  return specialUseApplicationAccepted(application, defaultNoncommerialApplicationDetails);
};
emailTemplates.tempOutfitterApplicationAccepted = application => {
  return specialUseApplicationAccepted(application, defaultTempApplicationDetails);
};

emailTemplates.noncommercialApplicationCancelled = application => {
  const subject = `Your ${application.eventName} permit application to the Mt.Baker-Snoqualmie National Forest has been cancelled.`;
  return specialUseApplicationCancelled(
    application,
    defaultNoncommerialApplicationDetails,
    subject
  );
};

emailTemplates.tempOutfitterApplicationCancelled = application => {
  const subject = 'Your following permit application to the Mt. Baker-Snoqualmie National Forest has been cancelled.';
  return specialUseApplicationCancelled(application,
    defaultTempApplicationDetails,
    subject
  );
};

emailTemplates.noncommercialApplicationUserCancelled = application => {
  return noncommercialApplicationUserCancelled(application);
};

emailTemplates.tempOutfitterApplicationUserCancelled = application => {
  return tempOutfitterApplicationUserCancelled(application);
};

emailTemplates.noncommercialApplicationRejected = application => {
  return specialUseApplicationRejected(
    application,
    defaultNoncommerialApplicationDetails
  );
};

emailTemplates.tempOutfitterApplicationRejected = application => {
  return specialUseApplicationRejected(
    application,
    defaultTempApplicationDetails
  );
};

emailTemplates.noncommercialApplicationReview = application => {
  return specialUseApplicationReview(application, defaultNoncommerialApplicationDetails);
};

emailTemplates.tempOutfitterApplicationReview = application => {
  return specialUseApplicationReview(application, defaultTempApplicationDetails);
};

emailTemplates.noncommercialApplicationRemoveHold = application => {
  return specialUseApplicationRemoveHold(application, defaultNoncommerialApplicationDetails);
};

emailTemplates.tempOutfitterApplicationRemoveHold = application => {
  return specialUseApplicationRemoveHold(application, defaultTempApplicationDetails);
};

emailTemplates.noncommercialApplicationHold = application => {
  return specialUseApplicationHold(application, defaultNoncommerialApplicationDetails, 'noncommercial-group-use');
};

emailTemplates.tempOutfitterApplicationHold = application => {
  return specialUseApplicationHold(application, defaultTempApplicationDetails, 'temp-outfitters');
};


emailTemplates.christmasTreesPermitCreated = application => {
  return christmasTreesPermitCreated(application);
};

module.exports = emailTemplates;
