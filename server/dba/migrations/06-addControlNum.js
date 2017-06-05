'use strict';

const TABLE_NAME = 'noncommercialApplications';

module.exports = {
  up: function(queryInterface, Sequelize) {

    return queryInterface.addColumn(TABLE_NAME, 'app_control_number', {type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, unique: true});

  },
  down: function(queryInterface, Sequelize) {

    return queryInterface.removeColumn(TABLE_NAME, 'app_control_number');

  }
};
