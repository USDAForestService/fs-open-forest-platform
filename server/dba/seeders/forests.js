const forests = [
  {
    id: 1,
    forest_name: 'Idaho Panhandle National Forest',
    forest_url: 'https://www.fs.usda.gov/ipnf/',
    start_date: '2019-11-18T08:00:00Z',
    end_date: '2019-12-25T08:59:59Z',
    created: 'now()',
    updated: 'now()',
    org_structure_code: '',
    description: 'Idaho Panhandle | Idaho',
    forest_abbr: 'ipnf',
    wood_cost: 5,
    timezone: 'America/Boise',
    cutting_areas: '{}',
    contact: '{}',
    map_links: '{}',
    poss_financial_id: '',
    state: 'Idaho',
    permit_type: 'Fuel Wood',
    region: 6
  }
];


module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('fsForests', forests);
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('fsForests');
  }
};