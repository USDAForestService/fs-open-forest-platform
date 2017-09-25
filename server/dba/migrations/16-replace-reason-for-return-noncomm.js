'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('noncommercialApplications', 'applicant_message', {
      type: Sequelize.STRING
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('noncommercialApplications', 'reason_for_return');
  }
};
