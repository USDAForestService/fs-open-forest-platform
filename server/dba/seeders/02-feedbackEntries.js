const feedbackEntries = [
  {
    forests: 'Arapaho',
    message: 'these forests are fantastic',
    created: 'now()',
    updated: 'now()'
  }, {
    forests: 'Foresty forest',
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
