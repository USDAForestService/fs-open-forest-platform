'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let speciesNotes = [
      { id: 1, species_id: 1, display_order: 1, note: 'Admired for the evergreen, symmetrical narrow-conic growth habit' },
      { id: 2, species_id: 1, display_order: 2, note: 'Likeness is often used in artificial Christmas Trees' },

      { id: 3, species_id: 2, display_order: 1, note: 'Have 1” to 1 ½” needles' },
      { id: 4, species_id: 2, display_order: 2, note: 'Needles hold a blue to dark green color' },
      { id: 5, species_id: 2, display_order: 3, note: 'Turns brown faster than Noble Firs even if put immediately into water after harvesting' },
      { id: 7, species_id: 2, display_order: 4, note: 'Needles surround the twig and are generally soft to the touch. The shape and positioning of needles on the twig make it resemble a pipe cleaner or bottle brush' },
      
      { id: 8, species_id: 3, display_order: 1, note: 'Has shiny, dark green needles' },
      { id: 9, species_id: 3, display_order: 2, note: 'When needles are crushed, they give off a citrusy smell'},
      { id: 10, species_id: 3, display_order: 3, note: 'Distinguished by its sprays of lustrous shiny, dark green needles in two distinct rows which are usually horizontally spread so that both the upper and lower sides of the branches are clearly visible'},
      
      { id: 11, species_id: 4, display_order: 1, note: 'Soft, blue green needles that are 2-5” long in bundles of five' },
      { id: 12, species_id: 4, display_order: 2, note: 'Very full appearance and retains needles through the holiday season' },
      { id: 13, species_id: 4, display_order: 3, note: 'Little or no fragrance with less allergic reactions as compared to more fragrant trees' },
      
      { id: 14, species_id: 6, display_order: 1, note: 'Have 1” long needles' },
      { id: 15, species_id: 6, display_order: 2, note: 'Needles are bluish-green with a silvery appearance and point upward from the twig' },
      { id: 16, species_id: 6, display_order: 3, note: 'Has short, stiff branches which is great for heavier ornaments' },
      { id: 17, species_id: 6, display_order: 4, note: 'Holds needles and maintains color for a long time compared to other species' },
      
      { id: 18, species_id: 7, display_order: 1, note: '¾” to 1 ½” short' },
      { id: 19, species_id: 7, display_order: 2, note: 'Has a dark green appearance, good cone form and long-lasting needles' },
      { id: 20, species_id: 7, display_order: 3, note: 'Can be found up to elevations of 3,000 feet' },
      { id: 21, species_id: 7, display_order: 4, note: 'Has an overall pleasant scent' },

      { id: 22, species_id: 8, display_order: 1, note: 'Pyramid-shaped strong branches that turn slightly upward with good needle-retention' },
      { id: 23, species_id: 8, display_order: 2, note: 'Dark green, flattened needles that are ½” to 1 ½” long' },
      { id: 24, species_id: 8, display_order: 3, note: 'Has a pleasant scent' },

      { id: 25, species_id: 9, display_order: 1, note: 'Have flat ¾” to 1 ½” long needles' },
      { id: 26, species_id: 9, display_order: 2, note: 'Needles are dark green on top with white lines underneath' },
      { id: 27, species_id: 9, display_order: 3, note: 'Needles point forward and upward rather than lying flat' },
      { id: 28, species_id: 9, display_order: 4, note: 'They stay green and hold their needles for a long time' },

      { id: 29, species_id: 12, display_order: 1, note: 'Have less than 1" long needles' },
      { id: 30, species_id: 12, display_order: 2, note: 'Needles are a green color with a silvery appearance' },
      { id: 31, species_id: 12, display_order: 3, note: 'Turns brown and looses needles faster than other tree even if put immediately into water after harvesting' },

      { id: 32, species_id: 13, display_order: 1, note: 'Similar to both Fraser and Balsam Firs in growth and appearance' },
      { id: 33, species_id: 13, display_order: 2, note: 'Also known as Blue Ridge Fir' },

      { id: 34, species_id: 14, display_order: 1, note: 'Has 1” to 1 ½” needles' },

      { id: 35, species_id: 16, display_order: 1, note: 'Have ½” - 1” flat, broad needles that spread out on opposite sides of the twig' },
      { id: 36, species_id: 16, display_order: 2, note: 'Needles are dark green' },
      { id: 37, species_id: 16, display_order: 3, note: 'Evergreen trees with a thin scaly brown bark' }
    ];
    return queryInterface.bulkInsert('speciesNotes', speciesNotes);
  },
  down: function(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('speciesNotes', { species_id: { [Op.in]: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16] } });
  }
};
