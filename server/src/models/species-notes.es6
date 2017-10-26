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
  'speciesNotes',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
      allowNull: false
    },
    speciesId: {
      type: Sequelize.INTEGER,
      field: 'species_id',
      allowNull: false
    },
    note: {
      type: Sequelize.STRING,
      field: 'note'
    },
    displayOrder: {
      type: Sequelize.INTEGER,
      field: 'display_order'
    }
  },
  {
    timestamps: false
  }
);
