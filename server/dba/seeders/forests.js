'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let forests = [
      {
        id: 50,
        forest_name: 'Arapaho Roosevelt',
        forest_url: 'https://www.fs.usda.gov/arp',
        tree_height: 12,
        stump_height: 6,
        stump_diameter: 6,
        notes: null,
        start_date: '2017-12-02T12:00:00Z',
        end_date: '2017-12-10T12:00:00Z',
        created: 'now()',
        updated: 'now()'
      },
      {
        id: 51,
        forest_name: 'Flathead',
        forest_url: 'https://www.fs.usda.gov/flathead',
        tree_height: 12,
        stump_height: 6,
        stump_diameter: 6,
        notes: null,
        start_date: '2017-11-21T12:00:00Z',
        end_date: '2017-12-10T12:00:00Z',
        created: 'now()',
        updated: 'now()'
      },
      {
        id: 52,
        forest_name: 'Mt. Hood',
        forest_url: 'https://www.fs.usda.gov/mthood',
        tree_height: 12,
        stump_height: 6,
        stump_diameter: 6,
        notes: null,
        start_date: '2017-11-01T12:00:00Z',
        end_date: '2017-12-24T12:00:00Z',
        created: 'now()',
        updated: 'now()'
      },
      {
        id: 53,
        forest_name: 'Shoshone',
        forest_url: 'https://www.fs.usda.gov/shoshone',
        tree_height: 12,
        stump_height: 6,
        stump_diameter: 6,
        notes: null,
        start_date: '2017-11-01T12:00:00Z',
        end_date: '2017-12-24T12:00:00Z',
        created: 'now()',
        updated: 'now()'
      }
    ];
    return queryInterface.bulkInsert('forests', forests);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('forests', [{ id: [50,51,52,53] }]);
  }
};
