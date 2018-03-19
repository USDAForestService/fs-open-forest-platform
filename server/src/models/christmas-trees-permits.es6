'use strict';

/**
 * Module for christmas tree permits model
 * @module models/christmas-trees-permits
 */

module.exports = function(sequelize, DataTypes) {
  const christmasTreesPermits = sequelize.define(
    'christmasTreesPermits',
    {
      permitId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        field: 'permit_id',
        allowNull: false
      },
      forestId: {
        type: DataTypes.INTEGER,
        field: 'forest_id',
        allowNull: false
      },
      orgStructureCode: {
        type: DataTypes.STRING(50),
        field: 'org_structure_code',
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        field: 'first_name'
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'last_name'
      },
      emailAddress: {
        type: DataTypes.STRING,
        field: 'email_address'
      },
      treeCost: {
        type: DataTypes.DOUBLE,
        field: 'tree_cost'
      },
      quantity: {
        type: DataTypes.INTEGER,
        field: 'quantity'
      },
      totalCost: {
        type: DataTypes.DOUBLE,
        field: 'total_cost'
      },
      status: {
        type: DataTypes.STRING(50),
        field: 'status'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created',
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated',
        allowNull: false
      },
      paygovToken: {
        type: DataTypes.STRING,
        field: 'paygov_token'
      },
      paygovTrackingId: {
        type: DataTypes.STRING,
        field: 'paygov_tracking_id'
      },
      permitExpireDate: {
        type: DataTypes.DATE,
        field: 'permit_expire_date',
        allowNull: false
      },
      paygovError: {
        type: DataTypes.STRING(500),
        field: 'paygov_error',
        allowNull: true
      },
      permitNumber: {
        type: DataTypes.INTEGER,
        field: 'permit_number',
        allowNull: false,
        autoIncrement: true
      }
    },
    {
      timestamps: true,
      freezeTableName: true
    }
  );
  return christmasTreesPermits;
};
