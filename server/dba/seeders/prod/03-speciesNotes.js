'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let speciesNotes = [
      {
        id: 1, 
        species_id: 1, 
        display_order: 1, 
        note: 'Has 1" long needles' },
      {
        id: 2, 
        species_id: 1, 
        display_order: 2, 
        note: 'Needles are single on the twig; four-sided, and the same color on all sides. They also radiate in all directions on the twig' },
      {
        id: 3, 
        species_id: 1, 
        display_order: 3, 
        note: 'Tree bark is thin and scaly, and grayish-red to purplish-brown' },

      {
        id: 5, 
        species_id: 2, 
        display_order: 1, 
        note: 'Have 1” to 1 ½” needles' },
      {
        id: 6, 
        species_id: 2, 
        display_order: 2, 
        note: 'Needles hold a blue to dark green color' },
      {
        id: 7, 
        species_id: 2, 
        display_order: 3, 
        note: 'Needles surround the twig and are generally soft to the touch. The shape and positioning of needles on the twig make it resemble a pipe cleaner or bottle brush' },
      {
        id: 8, 
        species_id: 2, 
        display_order: 4, 
        note: 'Turns brown faster than other firs even if put immediately into water after harvesting' },
      
      {
        id: 10, 
        species_id: 3, 
        display_order: 1, 
        note: 'Has needles up to 2” in length' },
      {
        id: 11, 
        species_id: 3, 
        display_order: 2, 
        note: 'Needles are dark green on the upper side and silver-white on the lower side' },
      {
        id: 12, 
        species_id: 3, 
        display_order: 3, 
        note: 'Needles are flat with a notch in the tip. The needles grow off the twig in a way that makes the branch look flat'},
      
      {
        id: 15, 
        species_id: 4, 
        display_order: 1, 
        note: 'Has needles that are 1 1/2 “ to 2 ½” long' },
      {
        id: 16, 
        species_id: 4, 
        display_order: 2, 
        note: 'Needles are long, dark green, stout and rigid and are found in bundles of five' },
      {
        id: 17, 
        species_id: 4, 
        display_order: 3, 
        note: 'The tree bark is thin, scaly, light brownish-gray/creamy white in young trees and dark brown in fully mature trees' },
      
      {
        id: 20, 
        species_id: 5, 
        display_order: 1, 
        note: 'Has 5” to 10” long needles' },
      {
        id: 21, 
        species_id: 5, 
        display_order: 2, 
        note: 'Needles are clustered in groups of two or three on the twig, and are set in tufts at the ends of branches' },
      {
        id: 22, 
        species_id: 5, 
        display_order: 3, 
        note: 'Tree bark is black and scaly when young, and orange-brown with plates when older' },
      
      {
        id: 25, 
        species_id: 6, 
        display_order: 1, 
        note: 'Have 1” long needles' },
      {
        id: 26, 
        species_id: 6, 
        display_order: 2, 
        note: 'Needles are bluish-green with a silvery appearance and point upward from the twig' },
      {
        id: 27, 
        species_id: 6, 
        display_order: 3, 
        note: 'Has short, stiff branches which is great for heavier ornaments' },
      {
        id: 28, 
        species_id: 6, 
        display_order: 4, 
        note: 'Holds needles and maintains color for a long time compared to other species' },
      
      {
        id: 30, 
        species_id: 7, 
        display_order: 1, 
        note: '¾” to 1 ½” short' },
      {
        id: 31, 
        species_id: 7, 
        display_order: 2, 
        note: 'Has a dark green appearance, good cone form and long-lasting needles' },
      {
        id: 32, 
        species_id: 7, 
        display_order: 3, 
        note: 'Can be found up to elevations of 3,000 feet' },
      {
        id: 33, 
        species_id: 7, 
        display_order: 4, 
        note: 'Has an overall pleasant scent' },

      {
        id: 35, 
        species_id: 8, 
        display_order: 1, 
        note: 'Pyramid-shaped strong branches that turn slightly upward with good needle-retention' },
      {
        id: 36, 
        species_id: 8, 
        display_order: 2, 
        note: 'Dark green, flattened needles that are ½” to 1 ½” long' },
      {
        id: 37, 
        species_id: 8, 
        display_order: 3, 
        note: 'Has a pleasant scent' },

      {
        id: 40, 
        species_id: 9, 
        display_order: 1, 
        note: 'Have flat ¾” to 1 ½” long needles' },
      {
        id: 41, 
        species_id: 9, 
        display_order: 2, 
        note: 'Needles are dark green on top with white lines underneath' },
      {
        id: 42, 
        species_id: 9, 
        display_order: 3, 
        note: 'Needles point forward and upward rather than lying flat' },
      {
        id: 43, 
        species_id: 9, 
        display_order: 4, 
        note: 'They stay green and hold their needles for a long time' },
      
      {
        id: 45, 
        species_id: 10, 
        display_order: 1, 
        note: 'Has needles about 2” to 3” long' },
      {
        id: 46, 
        species_id: 10, 
        display_order: 2, 
        note: 'Needles are clustered in groups of two on the twig, flat or two-sided' },
      {
        id: 47, 
        species_id: 10, 
        display_order: 3, 
        note: 'Tree bark is scaly' },

      {
        id: 55, 
        species_id: 12, 
        display_order: 1, 
        note: 'Have less than 1" long needles' },
      {
        id: 56, 
        species_id: 12, 
        display_order: 2, 
        note: 'Needles are a green color with a silvery appearance' },
      {
        id: 57, 
        species_id: 12, 
        display_order: 3, 
        note: 'Turns brown and looses needles faster than other tree even if put immediately into water after harvesting' },

      {
        id: 61, 
        species_id: 13, 
        display_order: 1, 
        note: 'Similar to both Fraser and Balsam Firs in growth and appearance' },
      {
        id: 62, 
        species_id: 13, 
        display_order: 2, 
        note: 'Also known as Blue Ridge Fir' },

      {
        id: 65, 
        species_id: 14, 
        display_order: 1, 
        note: 'Has 1” to 1 ½” needles' },
      
      {
        id: 70, 
        species_id: 15, 
        display_order: 1, 
        note: 'Has needles that are up to ¾” long' },
      {
        id: 71, 
        species_id: 15, 
        display_order: 2, 
        note: 'Needles are single on the twig, blunt or notched at the tip, and flattened' },
      {
        id: 72, 
        species_id: 15, 
        display_order: 3, 
        note: 'Tree bark is smooth and grayish white with pitch blisters' },

      {
        id: 75, 
        species_id: 16, 
        display_order: 1, 
        note: 'Have ½” - 1” flat, broad needles that spread out on opposite sides of the twig' },
      {
        id: 76, 
        species_id: 16, 
        display_order: 2, 
        note: 'Needles are dark green' },
      {
        id: 77, 
        species_id: 16, 
        display_order: 3, 
        note: 'Evergreen trees with a thin scaly brown bark' },

      {
        id: 80, 
        species_id: 17, 
        display_order: 1, 
        note: 'Has 1” to 1 ½” needles' },
      {
        id: 81, 
        species_id: 17, 
        display_order: 2, 
        note: 'Needles are prickly to the touch and at right angles from all sides of the twig' },
      {
        id: 82, 
        species_id: 17, 
        display_order: 3, 
        note: 'Tree appears more wooly and dark in color than other varieties' },
      
      {
        id: 85, 
        species_id: 18, 
        display_order: 1, 
        note: 'Has ¼ to 1” long needles' },
      {
        id: 86, 
        species_id: 18, 
        display_order: 2, 
        note: 'Needles are bluish-green, rounded in cross section, bluntly pointed and  stand-out on all sides of branches' },
      {
        id: 87, 
        species_id: 18, 
        display_order: 3, 
        note: 'Tree bark is reddish-brown and deeply furrowed' },
      
      {
        id: 90, 
        species_id: 19, 
        display_order: 1, 
        note: 'Has needles ¼” to ¾” long' },
      {
        id: 91, 
        species_id: 19, 
        display_order: 2, 
        note: 'Needles are short and irregularly 2-ranked' },
      {
        id: 92, 
        species_id: 19, 
        display_order: 3, 
        note: 'Tree bark is russet-brown, scaly and moderately fissured' },
      
      {
        id: 95, 
        species_id: 20, 
        display_order: 1, 
        note: 'Has needles that are ½” long' },
      {
        id: 96, 
        species_id: 20, 
        display_order: 2, 
        note: 'Needles are soft, light green and arranged in clusters of 14-30' },
      {
        id: 97, 
        species_id: 20, 
        display_order: 3, 
        note: 'Tree bark is reddish-brown with flat plates on mature trees' },
      
      {
        id: 100, 
        species_id: 21, 
        display_order: 1, 
        note: 'Has needles that are 1.5 to 3 mm long' },
      {
        id: 101, 
        species_id: 21, 
        display_order: 2, 
        note: 'Needles are shiny dark green' },
      {
        id: 102, 
        species_id: 21, 
        display_order: 3, 
        note: 'Tree bark is cinnamon-red in color when young, and gray-brown on older trees' },
      
      {
        id: 105, 
        species_id: 22, 
        display_order: 1, 
        note: 'Has needles 2” – 4” long in bundles of five' },
      {
        id: 106, 
        species_id: 22, 
        display_order: 2, 
        note: 'Needles are bluish-green in color with a white tinge' },
      {
        id: 107, 
        species_id: 22, 
        display_order: 3, 
        note: 'The tree bark is dark gray/purplish hue with crosswise fissures' }
    ];
    return queryInterface.bulkInsert('speciesNotes', speciesNotes);
  },
  down: function(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('speciesNotes', {
      species_id: {
        [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
      }
    });
  }
};
