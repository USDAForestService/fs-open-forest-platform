'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('tempOutfitterApplications', 'auth_email', {
      type: Sequelize.STRING,
      defaultValue: 'test@test.com',
      allowNull: false
    });
  },
  down: function(queryInterface) {
    return queryInterface.removeColumn('tempOutfitterApplications', 'auth_email');
  }
};
