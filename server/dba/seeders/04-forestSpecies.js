'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let forestSpecies = [
      { forest_id: 1, species_id: 2, status: null },
      { forest_id: 1, species_id: 5, status: null },
      { forest_id: 1, species_id: 7, status: null },
      { forest_id: 1, species_id: 10, status: null },
      { forest_id: 1, species_id: 13, status: null },
      { forest_id: 1, species_id: 14, status: null },
      { forest_id: 2, species_id: 1, status: null },
      { forest_id: 2, species_id: 2, status: null },
      { forest_id: 2, species_id: 3, status: null },
      { forest_id: 2, species_id: 4, status: null },
      { forest_id: 2, species_id: 5, status: null },
      { forest_id: 2, species_id: 10, status: null },
      { forest_id: 2, species_id: 11, status: null },
      { forest_id: 3, species_id: 2, status: 'not recommended' },
      { forest_id: 3, species_id: 6, status: 'recommended' },
      { forest_id: 3, species_id: 9, status: 'recommended' },
      { forest_id: 3, species_id: 12, status: 'not recommended' },
      { forest_id: 3, species_id: 16, status: 'prohibited' },
      { forest_id: 4, species_id: 1, status: null },
      { forest_id: 4, species_id: 2, status: null },
      { forest_id: 4, species_id: 4, status: null }
    ];
    return queryInterface.bulkInsert('forestSpecies', forestSpecies);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('forestSpecies', [{ forest_id: [1,2,3,4] }]);
  }
};
