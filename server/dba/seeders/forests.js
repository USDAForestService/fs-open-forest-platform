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
      map_links: '{}',
      contact:
      '{ "Idaho Panhandle Supervisors Office": {"address": "3815 Schreiber Way", "citystate": "Coeur d AudioListener, ID", "phone": "(208) 765-7223"},',
      poss_financial_id: '',
      state: 'Idaho',
      permit_type: 'fuel',
      region: 6
    },
    {
      id: 2,
      forest_name: 'Flathead National Forest',
      forest_url: 'https://www.fs.usda.gov/flathead/',
      start_date: '2020-04-01T08:00:00Z',
      end_date: '2021-03-31T08:59:59Z',
      created: 'now()',
      updated: 'now()',
      org_structure_code: '',
      description: 'Flathead | Montana',
      forest_abbr: 'flathead',
      wood_cost: 5,
      timezone: 'America/Boise',
      cutting_areas: '{}',
      map_links: '{}',
      contact:
      '{ "Flathead Supervisors Office / Tally Lake Ranger District": {"address": "650 Wolfpack Way", "citystate": "Kalispell, Montana", "phone": "(406) 758-5204"},',
      poss_financial_id: '',
      state: 'Montana',
      permit_type: 'fuel',
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