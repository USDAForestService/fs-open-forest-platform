'use strict';

module.exports = function(sequelize, DataTypes) {
  const species =  sequelize.define('species',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        field: 'name',
        allowNull: false
      },
      webUrl: {
        type: DataTypes.STRING,
        field: 'web_url'
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
  return species;
};