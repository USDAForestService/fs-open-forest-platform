'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('species', 'photos');
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('species', 'photos', { type: Sequelize.BLOB });
  }
};
