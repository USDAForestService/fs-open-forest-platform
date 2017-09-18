'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('tempOutfitterApplications', 'applicant_message', {
      type: Sequelize.STRING
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('tempOutfitterApplications', 'reason_for_return');
  }
};
