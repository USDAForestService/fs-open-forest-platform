'use strict';

const TABLE_NAME = 'christmasTreesPermits';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let dropFkSql = queryInterface.QueryGenerator.dropForeignKeyQuery(
      TABLE_NAME,
      'christmasTreesPermits_forest_id_fkey'
    );
    return queryInterface.sequelize.query(dropFkSql);
  },
  down: function(queryInterface, Sequelize) {
    queryInterface.addConstraint(TABLE_NAME, ['forest_id'], {
      type: 'FOREIGN KEY',
      name: 'christmasTreesPermits_forest_id_fkey',
      references: {
        table: 'christmasTreesForests',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  }
};
