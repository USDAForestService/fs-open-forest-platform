'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let forestLocations = [
      {
        id: 1,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'area',
        description: 'Wilderness'
      },
      {
        id: 2,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'area',
        description: 'Research natural areas'
      },
      {
        id: 3,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'area',
        description: '100 feet of a trail'
      },
      {
        id: 4,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'area',
        description: 'Campgrounds or administrative sites'
      },
      {
        id: 5,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'area',
        description: '300 feet of streams or lakes'
      },
      {
        id: 6,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'area',
        description: 'Areas posted "No Christmas Tree Cutting”'
      },
      {
        id: 7,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'area',
        description: 'East of Little Crater Lake Campground on Road 58, because of Warms Springs Indian Reservation'
      },
      {
        id: 8,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'area',
        description: 'Do not remove Pacific Yew trees'
      },
      {
        id: 9,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'area',
        description: 'Campgrounds, administrative sites, or summer home/rec. residence areas'
      },
      {
        id: 10,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Highway 26'
      },
      {
        id: 11,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Highway 224'
      },
      {
        id: 12,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Road 42 (Timothy Lake Road)'
      },
      {
        id: 13,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Road 50 (Timberline Road)'
      },
      {
        id: 14,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Road 2645 (Westleg Road)'
      },
      {
        id: 15,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Road 2618 (Salmon River Road)'
      },
      {
        id: 16,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Road 2627, 2627-207'
      },
      {
        id: 17,
        forest_id: 3,
        district: 'Clackamas',
        allowed: true,
        type: 'road',
        description: '4210'
      },
      {
        id: 18,
        forest_id: 3,
        district: 'Clackamas',
        allowed: true,
        type: 'road',
        description: '45, 4540, 4545'
      },
      {
        id: 19,
        forest_id: 3,
        district: 'Clackamas',
        allowed: true,
        type: 'road',
        description: '4660, 4661, 4670, 4671'
      },
      {
        id: 20,
        forest_id: 3,
        district: 'Clackamas',
        allowed: true,
        type: 'road',
        description: '5730, 5731'
      },
      {
        id: 21,
        forest_id: 3,
        district: 'Clackamas',
        allowed: true,
        type: 'road',
        description: '6340, 6341, 6350, 6355, 6370'
      },
      {
        id: 22,
        forest_id: 3,
        district: 'Clackamas',
        allowed: true,
        type: 'road',
        description: '5410, 5411'
      },
      {
        id: 23,
        forest_id: 3,
        district: 'Clackamas',
        allowed: true,
        type: 'road',
        description: '58, 5810, 5820, 5830'
      },
      {
        id: 24,
        forest_id: 3,
        district: 'Zigzag',
        allowed: true,
        type: 'road',
        description: '18, 1828, 1828118'
      },
      {
        id: 25,
        forest_id: 3,
        district: 'Zigzag',
        allowed: true,
        type: 'road',
        description: '2656 and spurs'
      },
      {
        id: 26,
        forest_id: 3,
        district: 'Zigzag',
        allowed: true,
        type: 'road',
        description: '58, 5850, 5855, 5860, 5870, 5880'
      },
      {
        id: 27,
        forest_id: 3,
        district: null,
        allowed: true,
        type: 'district',
        description: 'Clackamas'
      },
      {
        id: 28,
        forest_id: 3,
        district: null,
        allowed: true,
        type: 'district',
        description: 'Zigzag'
      },
      {
        id: 29,
        forest_id: 1,
        district: null,
        allowed: true,
        type: 'district',
        description: 'Canyon Lake'
      },
      {
        id: 30,
        forest_id: 1,
        district: null,
        allowed: true,
        type: 'district',
        description: 'Sulphur'
      },
      {
        id: 31,
        forest_id: 1,
        district: null,
        allowed: true,
        type: 'district',
        description: 'Boulder'
      },
      {
        id: 32,
        forest_id: 1,
        district: null,
        allowed: true,
        type: 'district',
        description: 'Clear Creek'
      },
      {
        id: 33,
        forest_id: 3,
        district: 'Barlow and Hood',
        allowed: false,
        type: 'area',
        description: 'Dalles Watershed'
      },
      {
        id: 34,
        forest_id: 3,
        district: 'Barlow and Hood',
        allowed: false,
        type: 'road',
        description: 'Highway 216'
      },
      {
        id: 35,
        forest_id: 3,
        district: 'Barlow and Hood',
        allowed: false,
        type: 'area',
        description: 'Camp Baldwin'
      },
      {
        id: 36,
        forest_id: 3,
        district: 'Barlow and Hood',
        allowed: false,
        type: 'area',
        description: 'Warm Springs Reservation'
      },
      {
        id: 37,
        forest_id: 3,
        district: 'Barlow and Hood',
        allowed: false,
        type: 'road',
        description: 'Highway 26'
      },
      {
        id: 38,
        forest_id: 3,
        district: 'Barlow and Hood',
        allowed: false,
        type: 'road',
        description: 'Highway 35'
      },
      {
        id: 39,
        forest_id: 3,
        district: null,
        allowed: true,
        type: 'district',
        description: 'Barlow'
      },
      {
        id: 40,
        forest_id: 3,
        district: null,
        allowed: true,
        type: 'district',
        description: 'Hood'
      },
      {
        id: 41,
        forest_id: 2,
        district: null,
        allowed: true,
        type: 'district',
        description: 'Glacier View'
      },
      {
        id: 42,
        forest_id: 2,
        district: null,
        allowed: true,
        type: 'district',
        description: 'Hungry Horse'
      },
      {
        id: 43,
        forest_id: 2,
        district: null,
        allowed: true,
        type: 'district',
        description: 'Spotted Bear'
      },
      {
        id: 44,
        forest_id: 2,
        district: null,
        allowed: true,
        type: 'district',
        description: 'Swan Lake'
      },
      {
        id: 45,
        forest_id: 2,
        district: null,
        allowed: true,
        type: 'district',
        description: 'Tally Lake'
      },
      {
        id: 46,
        forest_id: 2,
        district: null,
        allowed: false,
        type: 'area',
        description: 'Plantations'
      },
      {
        id: 47,
        forest_id: 2,
        district: null,
        allowed: false,
        type: 'area',
        description: 'Previously thinned stands of trees'
      },
      {
        id: 48,
        forest_id: 2,
        district: null,
        allowed: false,
        type: 'area',
        description: 'Campgrounds'
      },
      {
        id: 49,
        forest_id: 2,
        district: null,
        allowed: false,
        type: 'area',
        description: 'Areas posted as closed to Christmas tree cutting'
      },
      {
        id: 50,
        forest_id: 4,
        district: null,
        allowed: true,
        type: 'district',
        description: 'Washakie'
      }
    ];
    return queryInterface.bulkInsert('forestLocations', forestLocations);
  },
  down: function(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('forestLocations', {
      forest_id: {
        [Op.in]: [1, 2, 3, 4]
      }
    });
  }
};
