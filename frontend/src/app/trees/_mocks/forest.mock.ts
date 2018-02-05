export const forest = {
  id: 3,
  forestName: 'Mt. Hood',
  description: null,
  forestUrl: 'https://www.fs.usda.gov/mthood',
  treeHeight: 12,
  stumpHeight: 6,
  stumpDiameter: 6,
  startDate: '2017-11-01T12:00:00.000Z',
  endDate: '2017-12-24T12:00:00.000Z',
  timezone: 'America/Los_Angeles',
  species: [
    {
      id: 2,
      name: 'Douglas Fir',
      webUrl: 'https://plants.usda.gov/plantguide/pdf/cs_psme.pdf',
      status: 'not recommended',
      notes: [
        'Has 1” to 1 ½” needles',
        'Good conical shape',
        'Needles hold a blue to dark green color',
        'Has one of the best fragrances for Christmas Trees',
        'They turn brown faster even if put immediately into water after harvesting'
      ]
    },
    {
      id: 6,
      name: 'Noble Fir',
      webUrl: 'https://plants.usda.gov/core/profile?symbol=ABPR',
      status: 'recommended',
      notes: [
        'Has one inch long, bluish green needles with a silvery appearance',
        'Has short stiff branches which is great for heavier ornaments',
        'Keeps well and is also used to make wreaths, door swags and garland'
      ]
    },
    {
      id: 9,
      name: 'Pacific Silver Fir',
      webUrl: 'https://plants.usda.gov/plantguide/pdf/pg_abam.pdf',
      status: 'recommended',
      notes: [
        'Flat ¾” to 1 ½” long needles similar to a Grand Fir',
        'Needles are dark green on top with white lines underneath (similar to a Grand Fir)',
        'Needles point forward and upward rather than lying flat like a Grand Fir',
        'They stay green and hold their needles longer than other trees',
        'Typically found at elevations of 3500’ – 4500’ (where early season snow is likely)'
      ]
    },
    {
      id: 12,
      name: 'Hemlock',
      webUrl: null,
      status: 'not recommended',
      notes: [
        'Needles are a bluish green color with a silvery appearance.',
        '1" long needles',
        'They turn brown faster even if put immediately into water after harvesting'
      ]
    },
    {
      id: 16,
      name: 'Pacific Yew',
      webUrl: null,
      status: 'prohibited',
      notes: [
        'Evergreen trees with a thin scaly brown bark',
        'Leaf bases are twisted to align them into two flat rows on either side of the stem',
        '½” - 1” flat, broad dark green leaves',
        'Endangered from harvesting its bark for a cancer-fighting compound'
      ]
    }
  ],
  locations: [
    { id: 1, district: null, allowed: false, type: 'area', description: 'Wilderness' },
    { id: 2, district: null, allowed: false, type: 'area', description: 'Research Natural Areas' },
    { id: 3, district: null, allowed: false, type: 'area', description: '100 feet of a trail' },
    { id: 4, district: null, allowed: false, type: 'area', description: 'Campgrounds or Administrative sites' },
    { id: 5, district: null, allowed: false, type: 'area', description: '300 feet of streams or lakes' },
    {
      id: 6,
      district: null,
      allowed: false,
      type: 'area',
      description: 'Areas posted "No Christmas Tree Cutting”'
    },
    {
      id: 7,
      district: null,
      allowed: false,
      type: 'area',
      description: 'East of Little Crater Lake Campground on Road 58, because of Warms Springs Indian Reservation'
    },
    { id: 8, district: null, allowed: false, type: 'area', description: 'Do not remove Pacific Yew trees' },
    {
      id: 9,
      district: null,
      allowed: false,
      type: 'area',
      description: 'Campgrounds, Administrative sites, or Summer Home/Rec. Residence Areas'
    },
    { id: 10, district: null, allowed: false, type: 'road', description: 'Highway 26' },
    { id: 11, district: null, allowed: false, type: 'road', description: 'Highway 224' },
    { id: 12, district: null, allowed: false, type: 'road', description: 'Road 42 (Timothy Lake Road)' },
    { id: 13, district: null, allowed: false, type: 'road', description: 'Road 50 (Timberline Road)' },
    { id: 14, district: null, allowed: false, type: 'road', description: 'Road 2645 (Westleg Road)' },
    { id: 15, district: null, allowed: false, type: 'road', description: 'Road 2618 (Salmon River Road)' },
    { id: 16, district: null, allowed: false, type: 'road', description: 'Road 2627, 2627-207' },
    { id: 17, district: 'Clackamas', allowed: true, type: 'road', description: '4210' },
    { id: 18, district: 'Clackamas', allowed: true, type: 'road', description: '45, 4540, 4545' },
    { id: 19, district: 'Clackamas', allowed: true, type: 'road', description: '4660, 4661, 4670, 4671' },
    { id: 20, district: 'Clackamas', allowed: true, type: 'road', description: '5730, 5731' },
    { id: 21, district: 'Clackamas', allowed: true, type: 'road', description: '6340, 6341, 6350, 6355, 6370' },
    { id: 22, district: 'Clackamas', allowed: true, type: 'road', description: '5410, 5411' },
    { id: 23, district: 'Clackamas', allowed: true, type: 'road', description: '58, 5810, 5820, 5830' },
    { id: 24, district: 'Zigzag', allowed: true, type: 'road', description: '18, 1828, 1828118' },
    { id: 25, district: 'Zigzag', allowed: true, type: 'road', description: '2656 and spurs' },
    { id: 26, district: 'Zigzag', allowed: true, type: 'road', description: '58, 5850, 5855, 5860, 5870, 5880' },
    { id: 27, district: null, allowed: true, type: 'district', description: 'Clackamas' },
    { id: 28, district: null, allowed: true, type: 'district', description: 'Zigzag' },
    { id: 29, district: null, allowed: true, type: 'district', description: 'Hood' },
    { id: 30, district: null, allowed: true, type: 'district', description: 'Barlow' },
    { id: 31, district: 'Barlow and Hood', allowed: false, type: 'road', description: 'Highway' },
    { id: 32, district: 'Barlow and Hood', allowed: false, type: 'road', description: '1' },
    { id: 33, district: 'cutting area', allowed: false, type: 'cutting-area', description: 'dates' },
    { id: 34, district: 'cutting area', allowed: false, type: 'cutting-area-hours', description: 'hours' },
    { id: 35, district: 'district', allowed: false, type: 'district-permits', description: 'permit sales dates' }
  ]
};
