'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.addColumn('forestLocations', 'image_filename', {
			type: Sequelize.STRING(100)
		});
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.removeColumn('forestLocations', 'image_filename');
	}
};