'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.addColumn('forestsLocations', 'imageFilename', {
        	type: Sequelize.STRING(100),
					field: 'image_filename'
		});
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.removeColumn('forestsLocations', 'imageFilename');
	}
};