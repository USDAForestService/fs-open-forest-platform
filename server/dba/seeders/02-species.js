'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let species = [
      {
        id: 1,
        name: 'Engelmann Spruce',
        web_url: 'https://plants.usda.gov/plantguide/pdf/pg_pien.pdf',
        created: 'now()',
        updated: 'now()'
      },
      {
        id: 2,
        name: 'Douglas-Fir',
        web_url: 'https://plants.usda.gov/plantguide/pdf/cs_psme.pdf',
        created: 'now()',
        updated: 'now()'
      },
      {
        id: 3,
        name: 'Grand Fir',
        web_url: 'https://plants.usda.gov/plantguide/pdf/pg_abgr.pdf',
        created: 'now()',
        updated: 'now()'
      },
      {
        id: 4,
        name: 'Whitebark Pine',
        web_url: 'https://plants.usda.gov/plantguide/pdf/pg_pial.pdf',
        created: 'now()',
        updated: 'now()'
      },
      {
        id: 5,
        name: 'Ponderosa Pine',
        web_url: 'https://plants.usda.gov/plantguide/pdf/pg_pipo.pdf',
        created: 'now()',
        updated: 'now()'
      },
      {
        id: 6,
        name: 'Noble Fir',
        web_url: 'https://plants.usda.gov/core/profile?symbol=ABPR',
        created: 'now()',
        updated: 'now()'
      },
      {
        id: 7,
        name: 'Balsam Fir',
        web_url: 'https://plants.usda.gov/factsheet/pdf/fs_abba.pdf',
        created: 'now()',
        updated: 'now()'
      },
      {
        id: 8,
        name: 'Fraser Fir',
        web_url: 'https://plants.usda.gov/core/profile?symbol=ABFR',
        created: 'now()',
        updated: 'now()'
      },
      {
        id: 9,
        name: 'Pacific Silver Fir',
        web_url: 'https://plants.usda.gov/plantguide/pdf/pg_abam.pdf',
        created: 'now()',
        updated: 'now()'
      },
      {
        id: 10,
        name: 'Lodgepole Pine',
        web_url: null,
        created: 'now()',
        updated: 'now()'
      },
      {
        id: 11,
        name: 'Larch',
        web_url: null,
        created: 'now()',
        updated: 'now()'
      },
      {
        id: 12,
        name: 'Hemlock',
        web_url: null,
        created: 'now()',
        updated: 'now()'
      },
      {
        id: 13,
        name: 'Canan Fir',
        web_url: null,
        created: 'now()',
        updated: 'now()'
      },
      {
        id: 14,
        name: 'Corkbark Fir',
        web_url: null,
        created: 'now()',
        updated: 'now()'
      },
      {
        id: 15,
        name: 'Subalpine fir',
        web_url: null,
        created: 'now()',
        updated: 'now()'
      },
      {
        id: 16,
        name: 'Pacific Yew',
        web_url: null,
        created: 'now()',
        updated: 'now()'
      }
    ];
    return queryInterface.bulkInsert('species', species);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('species', [{ id: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15] }]);
  }
};
