

// Special use
const defaultNoncommerialApplicationDetails = require('./templates/noncommercial/default-application-details.es6');
const defaultTempApplicationDetails = require('./templates/temp-outfitter/default-application-details.es6');

const specialUseSubmittedConfirm = require('./templates/special-use-common/application-submitted-confirmation.es6');

const noncommercialSubmittedAdminConfirm = require('./templates/noncommercial/application-submitted-admin-confirmation.es6');
const tempSubmittedAdminConfirm = require('./templates/temp-outfitter/application-submitted-admin-confirmation.es6');

const specialUseApplicationAccepted = require('./templates/special-use-common/application-accepted.es6');
const specialUseApplicationCancelled = require('./templates/special-use-common/application-cancelled.es6');

const noncommercialApplicationUserCancelled = require('./templates/noncommercial/application-user-cancelled.es6');
const tempOutfitterApplicationUserCancelled = require('./templates/temp-outfitter/application-user-cancelled.es6');

const specialUseApplicationRejected = require('./templates/special-use-common/application-rejected.es6');

const specialUseApplicationReview = require('./templates/special-use-common/application-review.es6');
const specialUseApplicationRemoveHold = require('./templates/special-use-common/application-remove-hold.es6');

const specialUseApplicationHold = require('./templates/special-use-common/application-hold.es6');


// Christmas tree permits
const christmasTreesPermitCreated = require('./templates/christmas-trees/permit-created.es6');

const emailTemplates = {};

emailTemplates.noncommercialApplicationSubmittedConfirmation = application => specialUseSubmittedConfirm(
  application,
  defaultNoncommerialApplicationDetails,
  ' within two business days'
);
emailTemplates.tempOutfitterApplicationSubmittedConfirmation = application => specialUseSubmittedConfirm(
  application,
  defaultTempApplicationDetails, ''
);

emailTemplates.noncommercialApplicationSubmittedAdminConfirmation = application => noncommercialSubmittedAdminConfirm(
  application
);

emailTemplates.tempOutfitterApplicationSubmittedAdminConfirmation = application => tempSubmittedAdminConfirm(
  application
);

emailTemplates.noncommercialApplicationAccepted = application => specialUseApplicationAccepted(
  application,
  defaultNoncommerialApplicationDetails
);

emailTemplates.tempOutfitterApplicationAccepted = application => specialUseApplicationAccepted(
  application,
  defaultTempApplicationDetails
);

emailTemplates.noncommercialApplicationCancelled = (application) => {
  const subject = `Your ${application.eventName} permit application to the\
 ${application.forestName} has been cancelled.`;
  return specialUseApplicationCancelled(
    application,
    defaultNoncommerialApplicationDetails,
    subject
  );
};

emailTemplates.tempOutfitterApplicationCancelled = (application) => {
  const subject = `Your permit application to the ${application.forestName} has been cancelled.`;
  return specialUseApplicationCancelled(application,
    defaultTempApplicationDetails,
    subject);
};

emailTemplates.noncommercialApplicationUserCancelled = application => noncommercialApplicationUserCancelled(application);

emailTemplates.tempOutfitterApplicationUserCancelled = application => tempOutfitterApplicationUserCancelled(application);

emailTemplates.noncommercialApplicationRejected = application => specialUseApplicationRejected(
  application,
  defaultNoncommerialApplicationDetails
);

emailTemplates.tempOutfitterApplicationRejected = application => specialUseApplicationRejected(
  application,
  defaultTempApplicationDetails
);

emailTemplates.noncommercialApplicationReview = application => specialUseApplicationReview(
  application,
  defaultNoncommerialApplicationDetails
);

emailTemplates.tempOutfitterApplicationReview = application => specialUseApplicationReview(
  application,
  defaultTempApplicationDetails
);

emailTemplates.noncommercialApplicationRemoveHold = application => specialUseApplicationRemoveHold(
  application,
  defaultNoncommerialApplicationDetails
);

emailTemplates.tempOutfitterApplicationRemoveHold = application => specialUseApplicationRemoveHold(
  application,
  defaultTempApplicationDetails
);

emailTemplates.noncommercialApplicationHold = application => specialUseApplicationHold(application,
  defaultNoncommerialApplicationDetails,
  'noncommercial-group-use');

emailTemplates.tempOutfitterApplicationHold = application => specialUseApplicationHold(application,
  defaultTempApplicationDetails,
  'temp-outfitters');


emailTemplates.christmasTreesPermitCreated = application => christmasTreesPermitCreated(application);

module.exports = emailTemplates;
