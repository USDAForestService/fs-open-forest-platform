'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let forests = [
      {
        id: 1,
        forest_name: 'Arapaho and Roosevelt',
        forest_url: 'https://www.fs.usda.gov/main/arp',
        tree_height: 0,
        stump_height: 6,
        stump_diameter: 6,
        start_date: '2017-12-02T12:00:00Z',
        end_date: '2017-12-10T12:00:00Z',
        created: 'now()',
        updated: 'now()',
        org_structure_code: '11-02-10',
        description: 'Arapaho & Roosevelt | Colorado | Fort Collins, CO'
      },
      {
        id: 2,
        forest_name: 'Flathead',
        forest_url: 'https://www.fs.usda.gov/main/flathead',
        tree_height: 0,
        stump_height: 8,
        stump_diameter: 4,
        start_date: '2017-11-21T12:00:00Z',
        end_date: '2017-12-10T12:00:00Z',
        created: 'now()',
        updated: 'now()',
        org_structure_code: '11-01-10',
        description: 'Flathead | Montana | Kalispell, MT'
      },
      {
        id: 3,
        forest_name: 'Mt. Hood',
        forest_url: 'https://www.fs.usda.gov/main/mthood',
        tree_height: 12,
        stump_height: 6,
        stump_diameter: 6,
        start_date: '2017-11-01T12:00:00Z',
        end_date: '2017-12-24T12:00:00Z',
        created: 'now()',
        updated: 'now()',
        org_structure_code: '11-06-06',
        description: 'Mt. Hood | Oregon | Portland, OR'
      },
      {
        id: 4,
        forest_name: 'Shoshone',
        forest_url: 'https://www.fs.usda.gov/main/shoshone',
        tree_height: 20,
        stump_height: 4,
        stump_diameter: 0,
        start_date: '2017-11-21T12:00:00Z',
        end_date: '2017-12-24T12:00:00Z',
        created: 'now()',
        updated: 'now()',
        org_structure_code: '11-02-14',
        description: 'Shoshone | Montana, Wyoming | Cody, WY, Jackson, WY'
      }
    ];
    return queryInterface.bulkInsert('christmas_trees_forests', forests);
  },
  down: function(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('christmas_trees_forests', { id: { [Op.in]: [1, 2, 3, 4] } });
  }
};
