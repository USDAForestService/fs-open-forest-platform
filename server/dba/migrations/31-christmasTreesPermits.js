'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('christmasTreesPermits', {
      permitId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        allowNull: false,
        field: 'permit_id'
      },
      permitNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        field: 'permit_number'
      },
      forestId: { type: Sequelize.INTEGER, allowNull: false, field: 'forest_id' },
      orgStructureCode: { type: Sequelize.STRING(50), allowNull: false, field: 'org_structure_code' },
      firstName: { type: Sequelize.STRING, field: 'first_name' },
      lastName: { type: Sequelize.STRING, field: 'last_name' },
      emailAddress: { type: Sequelize.STRING, allowNull: false, field: 'email_address' },
      treeCost: { type: Sequelize.NUMERIC(8, 2), field: 'tree_cost', allowNull: false },
      quantity: { type: Sequelize.INTEGER, allowNull: false, field: 'quantity' },
      totalCost: { type: Sequelize.NUMERIC(10, 2), allowNull: false, field: 'total_cost' },
      status: { type: Sequelize.STRING(50), defaultValue: 'Initiated', allowNull: false, field: 'status' },
      permitExpireDate: { type: Sequelize.DATE, field: 'permit_expire_date' },
      paygovToken: { type: Sequelize.STRING, field: 'paygov_token' },
      paygovTrackingId: { type: Sequelize.STRING, field: 'paygov_tracking_id' },
      paygovError: { type: Sequelize.STRING(500), field: 'paygov_error' },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'created' },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'updated' }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('christmasTreesPermits');
  }
};
