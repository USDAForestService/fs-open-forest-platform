'use strict';

module.exports = function(sequelize, DataTypes) {
  const christmasTreesPermits =  sequelize.define('christmasTreesPermits',
    {
      permitId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        field: 'permit_id',
        allowNull: false
      },
      forestId: {
        type: DataTypes.INTEGER,
        field: 'forest_id',
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        field: 'first_name'
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'last_name'
      }
      emailAddress: {
        type: DataTypes.STRING,
        field: 'email_address'
      },
      treeCost: {
        type: DataTypes.DOUBLE(8,2),
        field: 'tree_cost'
      },
      quantity: {
        type: DataTypes.INTEGER,
        field: 'quantity'
      },
      totalCost: {
        type: DataTypes.DOUBLE(10,2),
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
      }
    },
    {
      timestamps: true,
      freezeTableName: true
    });
  return christmasTreesPermits;
};