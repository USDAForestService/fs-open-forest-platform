'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let forests = [
      {
        id: 1,
        forest_name: 'Arapaho and Roosevelt National Forests',
        forest_url: 'https://www.fs.usda.gov/main/arp',
        tree_height: 0,
        stump_height: 6,
        stump_diameter: 6,
        start_date: '2018-11-01T06:00:00Z',
        end_date: '2019-01-06T06:59:59Z',
        created: 'now()',
        updated: 'now()',
        org_structure_code: '11-02-10T',
        description: 'Arapaho & Roosevelt | Colorado',
        forest_abbr: 'arp',
        tree_cost: 10,
        max_num_trees: 5,
        forest_name_short: 'Arapaho and Roosevelt',
        timezone: 'America/Denver',
        cutting_areas:
          '{ "ELKCREEK": {"startDate": "2017-12-02 15:30:00Z", "endDate": "2017-12-09 21:30:00Z", "name": "Elk Creek"},' +
          '"REDFEATHERLAKES": {"startDate": "2017-12-02 15:30:00Z", "endDate": "2017-12-10 21:30:00Z", "name": "Red Feather Lakes"},' +
          '"SULPHUR": {"startDate": "2017-11-01 15:00:00Z", "endDate": "2018-01-06 22:30:00Z", "name": "Sulphur"},' +
          '"CANYONLAKES": {"startDate": "2017-11-27 15:30:00Z", "endDate": "2017-12-10 21:30:00Z", "name": "Canyon Lakes"} }',
        poss_financial_id: '999900004'
      },
      {
        id: 2,
        forest_name: 'Flathead National Forest',
        forest_url: 'https://www.fs.usda.gov/main/flathead',
        tree_height: 0,
        stump_height: 8,
        stump_diameter: 4,
        start_date: '2018-11-15T07:00:00Z',
        end_date: '2019-01-03T06:59:59Z',
        created: 'now()',
        updated: 'now()',
        org_structure_code: '11-01-10',
        description: 'Flathead | Montana',
        forest_abbr: 'flathead',
        tree_cost: 5,
        max_num_trees: 3,
        forest_name_short: 'Flathead',
        timezone: 'America/Denver',
        cutting_areas: '{}',
        poss_financial_id: '999900005'
      },
      {
        id: 3,
        forest_name: 'Mt. Hood National Forest',
        forest_url: 'https://www.fs.usda.gov/main/mthood',
        tree_height: 12,
        stump_height: 6,
        stump_diameter: 6,
        start_date: '2018-11-01T07:00:00Z',
        end_date: '2018-12-25T07:59:59Z',
        created: 'now()',
        updated: 'now()',
        org_structure_code: '11-06-06',
        description: 'Mt. Hood | Oregon',
        forest_abbr: 'mthood',
        tree_cost: 5,
        max_num_trees: 5,
        forest_name_short: 'Mt. Hood',
        timezone: 'America/Los_Angeles',
        cutting_areas: '{}',
        poss_financial_id: '999900007'
      },
      {
        id: 4,
        forest_name: 'Shoshone National Forest',
        forest_url: 'https://www.fs.usda.gov/main/shoshone',
        tree_height: 20,
        stump_height: 4,
        stump_diameter: 0,
        start_date: '2018-11-21T07:00:00Z',
        end_date: '2018-12-24T06:59:59Z',
        created: 'now()',
        updated: 'now()',
        org_structure_code: '11-02-14',
        description: 'Shoshone | Montana, Wyoming',
        forest_abbr: 'shoshone',
        tree_cost: 8,
        max_num_trees: 5,
        allow_additional_height: true,
        forest_name_short: 'Shoshone',
        timezone: 'America/Denver',
        cutting_areas: '{}',
        poss_financial_id: '999900006'
      }
    ];
    return queryInterface.bulkInsert('christmasTreesForests', forests);
  },
  down: function(queryInterface, Sequelize) {
    const operator = Sequelize.Op;
    return queryInterface.bulkDelete('christmasTreesForests', {
      id: {
        [operator.in]: [1, 2, 3, 4]
      }
    });
  }
};
