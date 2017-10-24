'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let forestLocations = [
      { id: 29, forest_id: 1, district: null, allowed: true, type: 'district', description: 'Canyon Lake' },
      { id: 30, forest_id: 1, district: null, allowed: true, type: 'district', description: 'Sulphur' },
      { id: 31, forest_id: 1, district: null, allowed: true, type: 'district', description: 'Boulder' },
      { id: 32, forest_id: 1, district: null, allowed: true, type: 'district', description: 'Clear Creek' }
    ];
    return queryInterface.bulkInsert('forestLocations', forestLocations);
  },
  down: function(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('forestLocations', { id: { [Op.in]: [29,30,31,32] } });
  }
};
