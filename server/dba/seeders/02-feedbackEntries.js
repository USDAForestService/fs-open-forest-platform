const feedbackEntries = [
  {
    id: 1,
    email: 'bdavidson@cynerge.com',
    forests: ['{"forest_name_short": "Arapaho and Roosevelt", "id": "1"}', '{"id": "2", "forest_name_short": "Flathead"}'],
    message: 'these forests are fantastic',
    created: 'now()',
    updated: 'now()'
  }, {
    id: 2,
    email: 'mlaney@cynerge.com',
    forests: ['{"id": "1", "forest_name_short": "Arapaho and Roosevelt"}'],
    message: 'this is my favorite forest',
    created: 'now()',
    updated: 'now()'
  }
];

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('feedbackEntries', feedbackEntries);
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('feedbackEntries');
  }
};
