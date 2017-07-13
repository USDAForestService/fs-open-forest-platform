'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('noncommercialApplications', 'status', { type: Sequelize.STRING, defaultValue: 'Received' });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('noncommercialApplications', 'status');
  }
};
