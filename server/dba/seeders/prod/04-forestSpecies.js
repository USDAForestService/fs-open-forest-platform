'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let forestSpecies = [
      {
        id: 1,
        forest_id: 1,
        species_id: 2,
        status: null
      },
      {
        id: 2,
        forest_id: 1,
        species_id: 5,
        status: null
      },
      {
        id: 3,
        forest_id: 1,
        species_id: 7,
        status: null
      },
      {
        id: 4,
        forest_id: 1,
        species_id: 10,
        status: null
      },
      {
        id: 5,
        forest_id: 1,
        species_id: 13,
        status: null
      },
      {
        id: 6,
        forest_id: 1,
        species_id: 14,
        status: null
      },
      {
        id: 7,
        forest_id: 2,
        species_id: 1,
        status: null
      },
      {
        id: 8,
        forest_id: 2,
        species_id: 2,
        status: null
      },
      {
        id: 9,
        forest_id: 2,
        species_id: 3,
        status: null
      },
      {
        id: 10,
        forest_id: 2,
        species_id: 4,
        status: null
      },
      {
        id: 11,
        forest_id: 2,
        species_id: 5,
        status: null
      },
      {
        id: 12,
        forest_id: 2,
        species_id: 10,
        status: null
      },
      {
        id: 13,
        forest_id: 2,
        species_id: 11,
        status: null
      },
      {
        id: 14,
        forest_id: 3,
        species_id: 2,
        status: 'not recommended'
      },
      {
        id: 16,
        forest_id: 3,
        species_id: 9,
        status: 'recommended'
      },
      {
        id: 17,
        forest_id: 3,
        species_id: 12,
        status: 'not recommended'
      },
      {
        id: 18,
        forest_id: 3,
        species_id: 16,
        status: 'prohibited'
      },
      {
        id: 19,
        forest_id: 4,
        species_id: 1,
        status: null
      },
      {
        id: 20,
        forest_id: 4,
        species_id: 2,
        status: null
      },
      {
        id: 21,
        forest_id: 4,
        species_id: 4,
        status: null
      },
      {
        id: 22,
        forest_id: 2,
        species_id: 2,
        status: 'recommended'
      },
      {
        id: 23,
        forest_id: 2,
        species_id: 1,
        status: 'recommended'
      },
      {
        id: 24,
        forest_id: 2,
        species_id: 3,
        status: 'recommended'
      },
      {
        id: 25,
        forest_id: 2,
        species_id: 4,
        status: 'prohibited'
      },
      {
        id: 26,
        forest_id: 2,
        species_id: 5,
        status: 'recommended'
      },
      {
        id: 27,
        forest_id: 2,
        species_id: 10,
        status: 'recommended'
      },
      {
        id: 28,
        forest_id: 2,
        species_id: 15,
        status: 'recommended'
      }
    ];
    return queryInterface.bulkInsert('forestSpecies', forestSpecies);
  },
  down: function(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('forestSpecies', {
      forest_id: {
        [Op.in]: [1, 2, 3, 4]
      }
    });
  }
};
