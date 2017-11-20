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
        name: 'Douglas-fir',
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
        id: 13,
        name: 'Canaan Fir',
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
        name: 'Subalpine Fir',
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
      },
      {
        id: 17,
        name: 'Blue Spruce',
        web_url: null,
        created: 'now()',
        updated: 'now()'
      },
      {
        id: 20,
        name: 'Western Larch',
        web_url: null,
        created: 'now()',
        updated: 'now()'
      },
      {
        id: 21,
        name: 'Western Red Cedar',
        web_url: null,
        created: 'now()',
        updated: 'now()'
      },
      {
        id: 22,
        name: 'Western White Pine',
        web_url: null,
        created: 'now()',
        updated: 'now()'
      }
    ];
    return queryInterface.bulkInsert('species', species);
  },
  down: function(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('species', { id: { [Op.in]:[1,2,3,4,5,6,7,8,9,10,11,13,14,15,16,17,20,21,22] } });
  }
};
