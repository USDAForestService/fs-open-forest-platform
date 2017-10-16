'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let forestSpecies = [
      {
        id: 1, forest_id: 50, species_id: 1, status: 'Recommended'
      },
      {
        id: 2, forest_id: 50, species_id: 2, status: 'Not allowed'
      },
      {
        id: 3, forest_id: 50, species_id: 3, status: 'Not Recommended'
      },
      {
        id: 4, forest_id: 51, species_id: 1, status: 'Recommended'
      },
      {
        id: 5, forest_id: 51, species_id: 2, status: 'Not allowed'
      },
      {
        id: 6, forest_id: 51, species_id: 3, status: 'Not Recommended'
      },
      {
        id: 7, forest_id: 52, species_id: 1, status: 'Recommended'
      },
      {
        id: 8, forest_id: 52, species_id: 2, status: 'Not allowed'
      },
      {
        id: 9, forest_id: 52, species_id: 3, status: 'Not Recommended'
      },
      {
        id: 10, forest_id: 53, species_id: 1, status: 'Recommended'
      },
      {
        id: 11, forest_id: 53, species_id: 2, status: 'Not allowed'
      },
      {
        id: 12, forest_id: 53, species_id: 3, status: 'Not Recommended'
      }
    ];
    return queryInterface.bulkInsert('forestSpecies', forestSpecies);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('forestSpecies', [{ id: [1,2,3,4,5,6,7,8,9,10,11,12] }]);
  }
};
