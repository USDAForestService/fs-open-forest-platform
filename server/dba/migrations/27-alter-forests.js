'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.addColumn('forests', 'org_structure_code', {
        	type: Sequelize.STRING(50)
		});
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.removeColumn('forests', 'org_structure_code');
	}
};