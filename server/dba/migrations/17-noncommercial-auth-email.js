'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('noncommercialApplications', 'auth_email', {
      type: Sequelize.STRING,
      defaultValue: 'test@test.com',
      allowNull: false
    });
  },
  down: function(queryInterface) {
    return queryInterface.removeColumn('noncommercialApplications', 'auth_email');
  }
};
