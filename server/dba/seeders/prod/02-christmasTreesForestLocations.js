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
        description: 'Wilderness & research natural areas',
        image_filename: null
      }
      ,
      {
        id: 2,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'area',
        description: '100 feet of a trail, campgrounds, administrative sites or summer home/rec. residence areas',
        image_filename: null
      },
      {
        id: 3,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'area',
        description: '300 feet of streams or lakes',
        image_filename: null
      },
      {
        id: 4,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'area',
        description: 'Dalles Watershed, Camp Baldwin or Warm Springs Reservation',
        image_filename: null
      },
      {
        id: 6,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'area',
        description: 'Areas posted "No Christmas Tree Cutting”',
        image_filename: null
      },
      {
        id: 7,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'area',
        description: 'East of Little Crater Lake Campground on Road 58, because of Warms Springs Indian Reservation',
        image_filename: null
      },
      {
        id: 10,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Highway 26',
        image_filename: null
      },
      {
        id: 11,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Highway 224',
        image_filename: null
      },
      {
        id: 12,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Road 42 (Timothy Lake Road)',
        image_filename: null
      },
      {
        id: 13,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Road 50 (Timberline Road)',
        image_filename: null
      },
      {
        id: 14,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Road 2645 (Westleg Road)',
        image_filename: null
      },
      {
        id: 15,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Road 2618 (Salmon River Road)',
        image_filename: null
      },
      {
        id: 16,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Road 2627, 2627-207',
        image_filename: null
      },
      {
        id: 17,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Road 4210',
        image_filename: null
      },
      {
        id: 18,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Road 45, 4540, 4545',
        image_filename: null
      },
      {
        id: 19,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Road 4660, 4661, 4670, 4671',
        image_filename: null
      },
      {
        id: 20,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Road 5730, 5731',
        image_filename: null
      },
      {
        id: 21,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Road 6340, 6341, 6350, 6355, 6370',
        image_filename: null
      },
      {
        id: 22,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Road 5410, 5411',
        image_filename: null
      },
      {
        id: 23,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Road 5810, 5820, 5830',
        image_filename: null
      },
      {
        id: 24,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Road 18, 1828, 1828118',
        image_filename: null
      },
      {
        id: 25,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Road 2656 and spurs',
        image_filename: null
      },
      {
        id: 26,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Road 58, 5850, 5855, 5860, 5870, 5880',
        image_filename: null
      },
      {
        id: 27,
        forest_id: 3,
        district: null,
        allowed: true,
        type: 'district',
        description: 'Clackamas River',
        image_filename: 'clackamas'
      },
      {
        id: 28,
        forest_id: 3,
        district: null,
        allowed: true,
        type: 'district',
        description: 'Zigzag',
        image_filename: 'zigzag'
      },
      {
        id: 29,
        forest_id: 1,
        district: null,
        allowed: false,
        type: 'info',
        description: 'Vehicles with proper traction devices capable of handling the winter conditions in the cutting area are required. Improperly equipped vehicles can get stuck, blocking the road and creating a safety hazard for everyone',
        image_filename: null
      },
      {
        id: 30,
        forest_id: 1,
        district: null,
        allowed: false,
        type: 'info',
        description: 'Four-wheel drive (not all-wheel drive) or appropriate traction devices (chains or similar, not tire socks) are required on all vehicles in the cutting area.',
        image_filename: null
      },
      {
        id: 33,
        forest_id: 1,
        district: null,
        allowed: false,
        type: 'info',
        description: 'You must arrive at the cutting area AFTER 8:30 am and BEFORE 2:30 pm each day and be out of the cutting area by 4:00 pm.',
        image_filename: null
      },
      {
        id: 38,
        forest_id: 1,
        district: null,
        allowed: true,
        type: 'district',
        description: 'Sulphur Ranger District - Elk Creek Cutting Area',
        image_filename: 'elk-creek'
      },
      {
        id: 39,
        forest_id: 1,
        district: null,
        allowed: true,
        type: 'district',
        description: 'Sulphur Ranger District Cutting Areas',
        image_filename: 'sulphur'
      },
      {
        id: 40,
        forest_id: 1,
        district: null,
        allowed: true,
        type: 'district',
        description: 'Canyon Lakes Ranger District - Red Feather Cutting Area',
        image_filename: 'red-feather'
      },
      {
        id: 42,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Highway 216',
        image_filename: null
      },
      {
        id: 46,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'road',
        description: 'Highway 35',
        image_filename: null
      },
      {
        id: 47,
        forest_id: 2,
        district: null,
        allowed: false,
        type: 'area',
        description: 'Plantations',
        image_filename: null
      },
      {
        id: 48,
        forest_id: 2,
        district: null,
        allowed: false,
        type: 'area',
        description: 'Previously thinned stands of trees',
        image_filename: null
      },
      {
        id: 49,
        forest_id: 2,
        district: null,
        allowed: false,
        type: 'area',
        description: 'Campgrounds',
        image_filename: null
      },
      {
        id: 50,
        forest_id: 2,
        district: null,
        allowed: false,
        type: 'area',
        description: 'Areas posted as closed to Christmas tree cutting',
        image_filename: null
      },
      {
        id: 51,
        forest_id: 4,
        district: null,
        allowed: true,
        type: 'district',
        description: 'Washakie',
        image_filename: 'washakie'
      },
      {
        id: 52,
        forest_id: 4,
        district: null,
        allowed: false,
        type: 'area',
        description: 'Popo Agie Wilderness Area',
        image_filename: null
      },
      {
        id: 53,
        forest_id: 4,
        district: null,
        allowed: false,
        type: 'area',
        description: 'North of and on the Wind River reservation',
        image_filename: null
      },
      {
        id: 54,
        forest_id: 3,
        district: null,
        allowed: false,
        type: 'address',
        description: 'Monday - Friday, 8 a.m. - 4:30 p.m.\n' +
        'Closed 11:30 a.m. - 12:30 p.m.\n' +
        '\n(503) 668-1700\n' +
        '\nHeadquarters\n16400 Champion Way\n' +
        'Sandy, OR 97055\n',
        image_filename: null
      },
      {
        id: 55,
        forest_id: 3,
        district: 'Barlow',
        allowed: false,
        type: 'address',
        description: 'Dufur Ranger Station\nMonday - Friday, 7:45 a.m. - 4:30 p.m.\n' +
        '\n(541) 467-2291\n' +
        '\n780 NE Court Street\n' +
        'Dufur, OR 97021',
        image_filename: null
      },
      {
        id: 56,
        forest_id: 3,
        district: 'Clackamas River',
        allowed: false,
        type: 'address',
        description: 'Estacada Ranger Station\n' +
        'Monday - Friday, 7:45 a.m. - 4:30 p.m.\n' +
        'Closed 11:30 a.m. - 12:30 p.m.\n' +
        '\n(503) 630-6861\n' +
        '\n595 NW Industrial Way\n' +
        'Estacada, OR 97023',
        image_filename: null
      },
      {
        id: 57,
        forest_id: 3,
        district: 'Hood River',
        allowed: false,
        type: 'address',
        description: 'Hood River Ranger Station\n' +
        'Monday - Saturday, 8 a.m. - 4:30 p.m.\n' +
        '\n(541) 352-6002\n' +
        '\n6780 Highway 35\n' +
        'Parkdale, OR 97041',
        image_filename: null
      },
      {
        id: 58,
        forest_id: 3,
        district: 'Zigzag',
        allowed: false,
        type: 'address',
        description: 'Zigzag Ranger Station\n' +
        'Monday - Friday, 7:45 a.m. - 4:30 p.m.\n' +
        'Closed 12 - 1 p.m.\n' +
        '\n(503) 622-3191\n' +
        '\n' +
        '70220 E. Highway 26\n' +
        'Zigzag, OR 97049\n\n',
        image_filename: null
      },
      {
        id: 59,
        forest_id: 2,
        district: null,
        allowed: false,
        type: 'address',
        description: 'Monday - Friday, 8 a.m. - 4:30 p.m.\n' +
        '\n(406) 758-5208\n' +
        '\nSupervisor\'s Office\n' +
        '650 Wolfpack Way\n' +
        'Kalispell, MT 59901\n',
        image_filename: null
      },
      {
        id: 60,
        forest_id: 2,
        district: 'Tally Lake',
        allowed: false,
        type: 'address',
        description: '(406) 758-5204\n' +
        '\n650 Wolfpack Way\n' +
        'Kalispell, MT 59901',
        image_filename: null
      },
      {
        id: 61,
        forest_id: 2,
        district: 'Swan Lake',
        allowed: false,
        type: 'address',
        description: '' +
        '\nMonday - Friday, 8 a.m. - 4:30 p.m.\n' +
        '\n(406) 837-7500\n' +
        '\n200 Ranger Station Road\n' +
        'Bigfork, MT 59911',
        image_filename: null
      },
      {
        id: 62,
        forest_id: 2,
        district: 'Glacier View, Hungry Horse, Spotted Bear (winter)',
        allowed: false,
        type: 'address',
        description: 'Monday - Friday 8 a.m. - 4:30 p.m.\n' +
        '\n(406) 387-3800\n' +
        '\n10 Hungry Horse Drive\nHungry Horse, MT 59919\n' +
        '\nThe Spotted Bear Ranger District does not sell Christmas tree permits onsite.',
        image_filename: null
      },
      {
        id: 63,
        forest_id: 1,
        district: null,
        allowed: false,
        type: 'address',
        description: '(970) 295-6600\n' +
        '\nForest Supervisor\'s Office\n' +
        '2150 Centre Avenue, Building E\n' +
        'Fort Collins, CO 80526\n' +
        '\nCall 970-295-6700 first to ensure someone who can sell permits is available.',
        image_filename: null
      },
      {
        id: 64,
        forest_id: 1,
        district: 'Boulder',
        allowed: false,
        type: 'address',
        description: '(303) 541-2500\n' +
        '\n2140 Yarmouth Avenue\n' +
        'Boulder,  CO 80301\n' +
        '\nChristmas tree permits are not available for purchase from this district office.',
        image_filename: null
      },
      {
        id: 65,
        forest_id: 1,
        district: 'Canyon Lakes',
        allowed: false,
        type: 'address',
        description: '(970) 295-6700\n' +
        '\n2150 Centre Avenue, Building E\n' +
        'Fort Collins, CO 80526\n' +
        '\nCall 970-295-6700 first to ensure someone who can sell permits is available.',
        image_filename: null
      },
      {
        id: 66,
        forest_id: 1,
        district: 'Clear Creek',
        allowed: false,
        type: 'address',
        description: '(303) 567-4382\n' +
        '\nIdaho Springs Visitors Center\n' +
        '2060 Miner Street\n' +
        'Idaho Springs, CO 80452\n' +
        '\nChristmas tree permits are not available for purchase from this district office.',
        image_filename: null
      },
      {
        id: 67,
        forest_id: 1,
        district: 'Sulphur',
        allowed: false,
        type: 'address',
        description: '(970) 887-4100\n' +
        '\n9 Ten Mile Drive\n' +
        'P.O. Box 10\n' +
        'Granby, CO 80446\n' +
        '\nPermits must be purchased in advance to cut down trees in the Elk Creek cutting area.',
        image_filename: null
      },
      {
        id: 68,
        forest_id: 4,
        district: null,
        allowed: false,
        type: 'address',
        description: 'Monday - Friday, 8 a.m. to 4:30 p.m.' +
        '\n(307) 527-6241 (tty)\n' +
        '\nSupervisor\'s Office\n' +
        '808 Meadowlane Ave.\n' +
        'Cody, WY 82414',
        image_filename: null
      },
      {
        id: 69,
        forest_id: 4,
        district: 'Clarks Fork, Greybull, and Wapiti',
        allowed: false,
        type: 'address',
        description: 'Monday - Friday, 8 a.m. - 4:30 p.m.\n' +
        '\n(307) 527-6921\n' +
        '\n808 Meadowlane Ave.\n' +
        'Cody, WY 82414\n' +
        '\n203A Yellowstone Ave.\n' +
        'Cody, WY 82414-9313',
        image_filename: null
      },
      {
        id: 70,
        forest_id: 4,
        district: 'Washakie',
        allowed: false,
        type: 'address',
        description: 'Monday - Friday, 8 a.m. - 4:30 p.m.\n' +
        '\n(307) 332-5460\n' +
        '\n333 Highway 789, South\n' +
        'Lander, WY 82520',
        image_filename: null
      },
      {
        id: 71,
        forest_id: 4,
        district: 'Wind River',
        allowed: false,
        type: 'address',
        description: 'Monday - Friday, 8 a.m. - 4:30 p.m.\n' +
        '\n(307) 455-2466\n' +
        '\n1403 W Ramshorn\n' +
        'Dubois, WY 82513-0186',
        image_filename: null
      },
      {
        id: 72,
        forest_id: 1,
        district: 'Elk Creek',
        allowed: true,
        type: 'cutting-area',
        description: 'Dec. 2 - 9, 2017',
        image_filename: null
      },
      {
        id: 73,
        forest_id: 1,
        district: 'Red Feather Lakes',
        allowed: true,
        type: 'cutting-area',
        description: 'Dec. 2 - 10, 2017',
        image_filename: null
      },
      {
        id: 74,
        forest_id: 1,
        district: 'Red Feather Lakes',
        allowed: true,
        type: 'cutting-area-hours',
        description: '8:30 am - 2:30 pm.\nMust arrive at the cutting area before 2:30 and be out of the cutting area by 4:00.',
        image_filename: null
      },
      {
        id: 75,
        forest_id: 1,
        district: 'Elk Creek',
        allowed: true,
        type: 'cutting-area-hours',
        description: '8:30 am - 2:30 pm.\nMust arrive at the cutting area before 2:30 and be out of the cutting area by 4:00.',
        image_filename: null
      },
      {
        id: 76,
        forest_id: 1,
        district: 'Sulphur Ranger District',
        allowed: true,
        type: 'district-permits',
        description: 'Nov. 1 – Jan. 6, 2018\n' +
        'Grand County Locations (Winter Park, Fraser, Granby, Grand Lake)',
        image_filename: null
      },
      {
        id: 77,
        forest_id: 1,
        district: 'Canyon Lakes Ranger District',
        allowed: true,
        type: 'district-permits',
        description: 'Nov. 27 – Dec. 10, 2017',
        image_filename: null
      }

    ];
    return queryInterface.bulkInsert('christmasTreesForestLocations', forestLocations);
  },
  down: function(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('christmasTreesForestLocations', {
      forest_id: {
        [Op.in]: [1, 2, 3, 4]
      }
    });
  }
};
