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
      orgStructureCode: { type: Sequelize.STRING(50), field: 'org_structure_code', allowNull: false },
      firstName: { type: Sequelize.STRING, field: 'first_name' },
      lastName: { type: Sequelize.STRING, field: 'last_name' },
      emailAddress: { type: Sequelize.STRING, field: 'email_address', allowNull: false },
      treeCost: { type: Sequelize.NUMERIC(8,2), field: 'tree_cost', allowNull: false },
      quantity: { type: Sequelize.INTEGER, field: 'quantity', allowNull: false },
      totalCost: { type: Sequelize.NUMERIC(10,2), field: 'total_cost', allowNull: false },
      status: { type: Sequelize.STRING(50), defaultValue: 'Initiated', allowNull: false, field: 'status' },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'created' },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'updated' }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('christmasTreesPermits');
  }
};
