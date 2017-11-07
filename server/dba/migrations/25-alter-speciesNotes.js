'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.addColumn('speciesNotes', 'display_order', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
		});
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.removeColumn('speciesNotes', 'display_order');
	}
};