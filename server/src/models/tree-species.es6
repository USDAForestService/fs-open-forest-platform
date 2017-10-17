'use strict';

const Sequelize = require('sequelize');
const url = require('url');

const sequelizeOptions = {
  dialect: url.parse(process.env.DATABASE_URL, true).protocol.split(':')[0]
};

if (
  url.parse(process.env.DATABASE_URL, true).hostname !== 'localhost' &&
  url.parse(process.env.DATABASE_URL, true).hostname !== 'fs-intake-postgres'
) {
  sequelizeOptions.dialectOptions = {
    ssl: true
  };
}

const sequelize = new Sequelize(process.env.DATABASE_URL, sequelizeOptions);

module.exports = sequelize.define(
  'treeSpecies',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(50),
      field: 'name',
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(255),
      field: 'description',
      allowNull: false
    },
    photos: {
      type: Sequelize.STRING(255),
      field: 'photos',
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      field: 'created',
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated',
      allowNull: false
    }
  },
  {
    timestamps: true
  }
);
