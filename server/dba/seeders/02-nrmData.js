const data = [
  {
    id: 1,
    message: 'successful connection test',
    created: 'now()',
    updated: 'now()'
  }
];
module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('nrmEntries', data);
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('nrmEntries');
  }
};
