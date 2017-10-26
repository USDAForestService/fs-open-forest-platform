'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let forestLocations = [
      { id: 33, forest_id: 3, district: 'Barlow and Hood', allowed: false, type: 'area', description: 'Dalles Watershed' },
      { id: 34, forest_id: 3, district: 'Barlow and Hood', allowed: false, type: 'road', description: 'Highway 216' },
      { id: 35, forest_id: 3, district: 'Barlow and Hood', allowed: false, type: 'area', description: 'Camp Baldwin' },
      { id: 36, forest_id: 3, district: 'Barlow and Hood', allowed: false, type: 'area', description: 'Warm Springs Reservation' },
      { id: 37, forest_id: 3, district: 'Barlow and Hood', allowed: false, type: 'road', description: 'Highway 26' },
      { id: 38, forest_id: 3, district: 'Barlow and Hood', allowed: false, type: 'road', description: 'Highway 35' },
      { id: 39, forest_id: 3, district: null, allowed: true, type: 'district', description: 'Barlow' },
      { id: 40, forest_id: 3, district: null, allowed: true, type: 'district', description: 'Hood' }
    ];
    return queryInterface.bulkInsert('forestLocations', forestLocations);
  },
  down: function(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('forestLocations', { id: { [Op.in]: [33,34,35,36,37,38, 39, 40] } });
  }
};
