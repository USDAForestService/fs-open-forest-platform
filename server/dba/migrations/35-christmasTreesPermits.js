'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('christmasTreesPermits', {
      permitId: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, unique: true, allowNull: false, field: 'permit_id' },
      forestId: {
        allowNull: false,
        references: {
            model: 'christmasTreesForests',
            key: 'id',
            as: 'forest_id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        type: Sequelize.INTEGER,
        field: 'forest_id'
      },
      firstName: { type: Sequelize.STRING, field: 'first_name' },
      lastName: { type: Sequelize.STRING, field: 'last_name' },
      email: { type: Sequelize.STRING, field: 'email', allowNull: false },
      treeCost: { type: Sequelize.DECIMAL(8,2), field: 'tree_cost', allowNull: false },
      quantity: { type: Sequelize.INTEGER, field: 'quantity', allowNull: false },
      totalCost: { type: Sequelize.DECIMAL(10,2), field: 'total_cost', allowNull: false },
      status: { type: Sequelize.STRING(50), defaultValue: 'Initiated', field: 'status' }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('christmasTreesPermits');
  }
};
