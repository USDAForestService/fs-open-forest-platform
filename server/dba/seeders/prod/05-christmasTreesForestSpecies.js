'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let forestSpecies = [
      {
        id: 1,
        forest_id: 1,
        species_id: 1,
        status: 'recommended'
      },
      {
        id: 2,
        forest_id: 1,
        species_id: 2,
        status: 'recommended'
      },
      {
        id: 3,
        forest_id: 1,
        species_id: 5,
        status: 'not recommended'
      },
      {
        id: 4,
        forest_id: 1,
        species_id: 10,
        status: 'not recommended'
      },
      {
        id: 5,
        forest_id: 1,
        species_id: 15,
        status: 'recommended'
      },
      {
        id: 10,
        forest_id: 2,
        species_id: 1,
        status: 'recommended'
      },
      {
        id: 11,
        forest_id: 2,
        species_id: 2,
        status: 'recommended'
      },
      {
        id: 12,
        forest_id: 2,
        species_id: 3,
        status: 'recommended'
      },
      {
        id: 13,
        forest_id: 2,
        species_id: 4,
        status: 'prohibited'
      },
      {
        id: 14,
        forest_id: 2,
        species_id: 5,
        status: 'not recommended'
      },
      {
        id: 15,
        forest_id: 2,
        species_id: 10,
        status: 'recommended'
      },
      {
        id: 17,
        forest_id: 2,
        species_id: 15,
        status: 'recommended'
      },
      {
        id: 20,
        forest_id: 3,
        species_id: 6,
        status: 'recommended'
      },
      {
        id: 21,
        forest_id: 3,
        species_id: 2,
        status: 'not recommended'
      },
      {
        id: 22,
        forest_id: 3,
        species_id: 9,
        status: 'recommended'
      },
      {
        id: 24,
        forest_id: 3,
        species_id: 16,
        status: 'prohibited'
      },
      {
        id: 29,
        forest_id: 4,
        species_id: 1,
        status: 'recommended'
      },
      {
        id: 30,
        forest_id: 4,
        species_id: 2,
        status: 'recommended'
      },
      {
        id: 31,
        forest_id: 4,
        species_id: 4,
        status: 'prohibited'
      },
      {
        id: 32,
        forest_id: 4,
        species_id: 10,
        status: 'recommended'
      },
      {
        id: 33,
        forest_id: 4,
        species_id: 15,
        status: 'recommended'
      },
      {
        id: 34,
        forest_id: 4,
        species_id: 17,
        status: 'recommended'
      }
    ];
    return queryInterface.bulkInsert('christmasTreesForestSpecies', forestSpecies);
  },
  down: function(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('christmasTreesForestSpecies', {
      forest_id: {
        [Op.in]: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37]
      }
    });
  }
};
