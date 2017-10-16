'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let treeSpecies = [
      {
        id: 1,
        name: 'Noble Fir',
        description: 'long needles',
        photos: null,
        created: 'now()',
        updated: 'now()'
      },
      {
        id: 2,
        name: 'Yew',
        description: 'long needles',
        photos: null,
        created: 'now()',
        updated: 'now()'
      },
      {
        id: 3,
        name: 'Spruce',
        description: 'long needles',
        photos: null,
        created: 'now()',
        updated: 'now()'
      }
    ];
    return queryInterface.bulkInsert('treeSpecies', treeSpecies);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('treeSpecies', [{ id: [1,2,3] }]);
  }
};
