'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let speciesNotes = [
      { id: 1, species_id: 1, note: 'Admired for the evergreen, symmetrical narrow-conic growth habit' },
      { id: 2, species_id: 1, note: 'Likeness is often used in artificial Christmas Trees' },
      { id: 3, species_id: 2, note: 'Has 1” to 1 ½” needles' },
      { id: 4, species_id: 2, note: 'Good conical shape' },
      { id: 5, species_id: 2, note: 'Needles hold a blue to dark green color' },
      { id: 6, species_id: 2, note: 'Has one of the best fragrances for Christmas Trees' },
      { id: 7, species_id: 2, note: 'They turn brown faster even if put immediately into water after harvesting' },
      { id: 8, species_id: 3, note: 'Has shiny, dark green needles' },
      { id: 9, species_id: 3, note: 'When needles are crushed, they give off a citrusy smell'},
      { id: 10, species_id: 3, note: 'Distinguished by its sprays of lustrous shiny, dark green needles in two distinct rows which are usually horizontally spread so that both the upper and lower sides of the branches are clearly visible'},
      { id: 11, species_id: 4, note: 'Soft, blue green needles that are 2-5” long in bundles of five' },
      { id: 12, species_id: 4, note: 'Very full appearance and retains needles through the holiday season' },
      { id: 13, species_id: 4, note: 'Little or no fragrance with less allergic reactions as compared to more fragrant trees' },
      { id: 14, species_id: 6, note: 'Has one inch long, bluish green needles with a silvery appearance' },
      { id: 15, species_id: 6, note: 'Has short stiff branches which is great for heavier ornaments' },
      { id: 16, species_id: 6, note: 'Keeps well and is also used to make wreaths, door swags and garland' },
      { id: 17, species_id: 7, note: '¾” to 1 ½” short' },
      { id: 18, species_id: 7, note: 'Has a dark green appearance, good cone form and long-lasting needles' },
      { id: 19, species_id: 7, note: 'Can be found up to elevations of 3,000 feet' },
      { id: 20, species_id: 7, note: 'Has an overall pleasant scent' },
      { id: 21, species_id: 8, note: 'Pyramid-shaped strong branches that turn slightly upward with good needle-retention' },
      { id: 22, species_id: 8, note: 'Dark green, flattened needles that are ½” to 1 ½” long' },
      { id: 23, species_id: 8, note: 'Has a pleasant scent' },
      { id: 24, species_id: 9, note: 'Flat ¾” to 1 ½” long needles similar to a Grand Fir' },
      { id: 25, species_id: 9, note: 'Needles are dark green on top with white lines underneath (similar to a Grand Fir)' },
      { id: 26, species_id: 9, note: 'Needles point forward and upward rather than lying flat like a Grand Fir' },
      { id: 27, species_id: 9, note: 'They stay green and hold their needles longer than other trees' },
      { id: 28, species_id: 9, note: 'Typically found at elevations of 3500’ – 4500’ (where early season snow is likely)' },
      { id: 29, species_id: 12, note: 'Needles are a bluish green color with a silvery appearance.' },
      { id: 30, species_id: 12, note: '1" long needles' },
      { id: 31, species_id: 12, note: 'They turn brown faster even if put immediately into water after harvesting' },
      { id: 32, species_id: 13, note: 'Similar to both Fraser and Balsam Firs in growth and appearance' },
      { id: 33, species_id: 13, note: 'Also known as Blue Ridge Fir' },
      { id: 34, species_id: 14, note: 'Has 1” to 1 ½” needles' },
      { id: 35, species_id: 16, note: 'Evergreen trees with a thin scaly brown bark' },
      { id: 36, species_id: 16, note: 'Leaf bases are twisted to align them into two flat rows on either side of the stem' },
      { id: 37, species_id: 16, note: '½” - 1” flat, broad dark green leaves' },
      { id: 38, species_id: 16, note: 'Endangered from harvesting its bark for a cancer-fighting compound' }
    ];
    return queryInterface.bulkInsert('speciesNotes', speciesNotes);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('speciesNotes', [{ species_id: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16] }]);
  }
};
