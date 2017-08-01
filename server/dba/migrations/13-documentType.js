'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('applicationFiles', 'document_type', { type: Sequelize.STRING });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('applicationFiles', 'document_type');
  }
};
