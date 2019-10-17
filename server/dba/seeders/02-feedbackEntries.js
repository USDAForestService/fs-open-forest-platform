const feedbackEntries = [
  {
    forests: 'Deschutes',
    message: 'I was able to cut down the perfect christmas tree, thanks Open Forest!',
    created: 'now()',
    updated: 'now()'
  }, {
    forests: 'Okanogan',
    message: 'I love Open Forest!',
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
