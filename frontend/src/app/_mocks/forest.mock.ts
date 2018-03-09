import * as moment from 'moment-timezone';


export const forest = {
  id: 3,
  forestName: 'Mt. Hood',
  forestAbbr: 'mthood',
  treeCost: 10,
  maxNumTrees: 5,
  description: null,
  forestUrl: 'https://www.fs.usda.gov/mthood',
  treeHeight: 12,
  stumpHeight: 6,
  orgStructureCode: '123',
  stumpDiameter: 6,
  startDate: moment('2017-11-01T12:00:00.000Z').toDate(),
  endDate: moment('2017-12-24T12:00:00.000Z').toDate(),
  timezone: 'America/Los_Angeles',
  cuttingAreas: {
    ELKCREEK: {'startDate': '2017-12-02 15:30:00Z', 'endDate': '2017-12-09 21:30:00Z'},
    REDFEATHERLAKES: {'startDate': '2017-12-02 15:30:00Z', 'endDate': '2017-12-10 21:30:00Z'},
    SULPHUR: {'startDate': '2017-11-01 12:00:00Z', 'endDate': '2018-01-06 21:30:00Z'},
    CANYONLAKES: {'startDate': '2017-11-27 15:30:00Z', 'endDate': '2017-12-10 21:30:00Z'}
  },
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
  ]
};
