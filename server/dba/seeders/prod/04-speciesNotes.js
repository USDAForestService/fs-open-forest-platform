'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let speciesNotes = [
      {
        id: 1, 
        species_id: 1, 
        display_order: 1, 
        note: 'Has 1-inch needles.' },
      {
        id: 2, 
        species_id: 1, 
        display_order: 2, 
        note: 'Needles are prickly to the touch and pointed, the same color on all sides, and they radiate in all directions on the twig.' },
      {
        id: 3, 
        species_id: 1, 
        display_order: 3, 
        note: 'Tree bark is thin and scaly, and grayish-red to purplish-brown.' },

      {
        id: 5, 
        species_id: 2, 
        display_order: 1, 
        note: 'Has 1- to 1 ½-inch needles.' },
      {
        id: 6, 
        species_id: 2, 
        display_order: 2, 
        note: 'Needles hold a blue to dark green color.' },
      {
        id: 7, 
        species_id: 2, 
        display_order: 3, 
        note: 'Needles radiate in all directions on the twig and are generally soft to the touch. The shape and positioning of needles on the twig make it resemble a pipe cleaner or bottle brush.' },
      {
        id: 8, 
        species_id: 2, 
        display_order: 4, 
        note: 'Can turn brown faster than other Firs even if put immediately into water after harvesting.' },
      
      {
        id: 10, 
        species_id: 3, 
        display_order: 1, 
        note: 'Has up to 2-inch needles.' },
      {
        id: 11, 
        species_id: 3, 
        display_order: 2, 
        note: 'Needles are dark green on the upper side and silver-white on the lower side.' },
      {
        id: 12, 
        species_id: 3, 
        display_order: 3, 
        note: 'Needles are flat with a notch in the tip. The needles grow off the twig in a way that makes the branch look flat.'},
      
      {
        id: 15, 
        species_id: 4, 
        display_order: 1, 
        note: 'Has 1 ½- to 2 ½-inch needles.' },
      {
        id: 16, 
        species_id: 4, 
        display_order: 2, 
        note: 'Needles are long, dark green, stout and rigid and are found in bundles of five.' },
      {
        id: 17, 
        species_id: 4, 
        display_order: 3, 
        note: 'The tree bark is thin, scaly, light brownish-gray/creamy white in young trees and dark brown in fully mature trees' },
      
      {
        id: 20, 
        species_id: 5, 
        display_order: 1, 
        note: 'Has 5- to 10-inch needles.' },
      {
        id: 21, 
        species_id: 5, 
        display_order: 2, 
        note: 'Needles are clustered in groups of two or three on the twig and are set in tufts at the ends of branches.' },
      {
        id: 22, 
        species_id: 5, 
        display_order: 3, 
        note: 'Tree bark is black and scaly when young and orange-brown with plates when older.' },
      
      {
        id: 25, 
        species_id: 6, 
        display_order: 1, 
        note: 'Has 1-inch needles.' },
      {
        id: 26, 
        species_id: 6, 
        display_order: 2, 
        note: 'Needles are bluish-green with a silvery appearance and point upward from the twig.' },
      {
        id: 27, 
        species_id: 6, 
        display_order: 3, 
        note: 'Has short, stiff branches great for heavier ornaments.' },
      {
        id: 28, 
        species_id: 6, 
        display_order: 4, 
        note: 'Holds needles and maintains color well.' },
      
      {
        id: 30, 
        species_id: 7, 
        display_order: 1, 
        note: 'Has ¾- to 1 ½-inch needles.' },
      {
        id: 31, 
        species_id: 7, 
        display_order: 2, 
        note: 'Has a dark green appearance, good cone form and long-lasting needles.' },
      {
        id: 32, 
        species_id: 7, 
        display_order: 3, 
        note: 'Can be found in elevations to 3,000 feet.' },
      {
        id: 33, 
        species_id: 7, 
        display_order: 4, 
        note: 'Has a pleasant scent.' },

      {
        id: 35, 
        species_id: 8, 
        display_order: 1, 
        note: 'Pyramid-shaped strong branches that turn slightly upward with good needle-retention.' },
      {
        id: 36, 
        species_id: 8, 
        display_order: 2, 
        note: 'Has dark green, flattened ½- to 1 ½-inch needles.' },
      {
        id: 37, 
        species_id: 8, 
        display_order: 3, 
        note: 'Has a pleasant scent.' },

      {
        id: 40, 
        species_id: 9, 
        display_order: 1, 
        note: 'Has flat ¾- to 1 ½-inch needles.' },
      {
        id: 41, 
        species_id: 9, 
        display_order: 2, 
        note: 'Needles are dark green on top with white lines underneath.' },
      {
        id: 42, 
        species_id: 9, 
        display_order: 3, 
        note: 'Needles point forward and upward rather than lying flat.' },
      {
        id: 43, 
        species_id: 9, 
        display_order: 4, 
        note: 'Stays green and holds needles well.' },
      
      {
        id: 45, 
        species_id: 10, 
        display_order: 1, 
        note: 'Has 2- to 3-inch needles.' },
      {
        id: 46, 
        species_id: 10, 
        display_order: 2, 
        note: 'Needles are clustered in groups of two on the twig and are flat or two-sided.' },
      {
        id: 47, 
        species_id: 10, 
        display_order: 3, 
        note: 'Tree bark is scaly.' },
      {
        id: 51,
        species_id: 11,
        display_order: 1,
        note: 'Has ½-inch needles.' },
      {
        id: 52,
        species_id: 11,
        display_order: 2,
        note: 'Needles are soft, light green and arranged in clusters of 14-30.' },
      {
        id: 53,
        species_id: 11,
        display_order: 3,
        note: 'Tree bark is reddish-brown with flat plates on mature trees.' },
      {
        id: 61, 
        species_id: 13, 
        display_order: 1, 
        note: 'Similar to both Fraser and Balsam Firs in growth and appearance.' },
      {
        id: 62, 
        species_id: 13, 
        display_order: 2, 
        note: 'Also known as Blue Ridge Fir.' },

      {
        id: 65, 
        species_id: 14, 
        display_order: 1, 
        note: 'Has 1- to 1 ½-inch needles.' },
      
      {
        id: 70, 
        species_id: 15, 
        display_order: 1, 
        note: 'Has ¾-inch needles.' },
      {
        id: 71, 
        species_id: 15, 
        display_order: 2, 
        note: 'Needles are single on the twig, blunt or notched at the tip, and flattened.' },
      {
        id: 72, 
        species_id: 15, 
        display_order: 3, 
        note: 'Tree bark is smooth and grayish-white with pitch blisters.' },

      {
        id: 75, 
        species_id: 16, 
        display_order: 1, 
        note: 'Has ½- to 1-inch flat, broad needles that spread out on opposite sides of the twig.' },
      {
        id: 76, 
        species_id: 16, 
        display_order: 2, 
        note: 'Has dark green needles.' },
      {
        id: 77, 
        species_id: 16, 
        display_order: 3, 
        note: 'Has a thin, scaly, brown bark.' },

      {
        id: 80, 
        species_id: 17, 
        display_order: 1, 
        note: 'Has 1-inch to 1 ½-inch needles.' },
      {
        id: 81, 
        species_id: 17, 
        display_order: 2, 
        note: 'Needles are prickly to the touch and at right angles from all sides of the twig.' },
      {
        id: 82, 
        species_id: 17, 
        display_order: 3, 
        note: 'Tree appears more wooly and dark in color than other varieties.' },
      
      {
        id: 95, 
        species_id: 20, 
        display_order: 1, 
        note: 'Has ½-inch needles.' },
      {
        id: 96, 
        species_id: 20, 
        display_order: 2, 
        note: 'Needles are soft, light green and arranged in clusters of 14-30.' },
      {
        id: 97, 
        species_id: 20, 
        display_order: 3, 
        note: 'Tree bark is reddish-brown with flat plates on mature trees.' },
      
      {
        id: 100, 
        species_id: 21, 
        display_order: 1, 
        note: 'Has 1.5- to 3 mm needles.' },
      {
        id: 101, 
        species_id: 21, 
        display_order: 2, 
        note: 'Needles are shiny dark green.' },
      {
        id: 102, 
        species_id: 21, 
        display_order: 3, 
        note: 'Tree bark is cinnamon-red in color when young, and gray-brown on older trees.' },
      
      {
        id: 105, 
        species_id: 22, 
        display_order: 1, 
        note: 'Has 2- to 4-inch needles in bundles of five.' },
      {
        id: 106, 
        species_id: 22, 
        display_order: 2, 
        note: 'Needles are bluish-green in color with a white tinge.' },
      {
        id: 107, 
        species_id: 22, 
        display_order: 3, 
        note: 'The bark has a dark gray/purplish hue with crosswise fissures.' }
    ];
    return queryInterface.bulkInsert('speciesNotes', speciesNotes);
  },
  down: function(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('speciesNotes', {
      species_id: {
        [Op.in]: [1,2,3,5,6,7,8,10,11,12,15,16,17,20,21,22,25,26,27,28,30,31,32,33,35,36,37,40,41,42,43,45,46,47,55,56,57,61,62,65,70,71,72,75,76,77,80,81,82,85,86,87,90,91,92,95,96,97,100,101,102,105,106,107]
      }
    });
  }
};
