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
  'forests',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
      allowNull: false
    },
    forestName: {
      type: Sequelize.STRING(50),
      field: 'forest_name',
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(1000),
      field: 'description'
    },
    forestUrl: {
      type: Sequelize.STRING,
      field: 'forest_url'
    },
    treeHeight: {
      type: Sequelize.INTEGER,
      field: 'tree_height'
    },
    stumpHeight: {
      type: Sequelize.INTEGER,
      field: 'stump_height'
    },
    stumpDiameter: {
      type: Sequelize.INTEGER,
      field: 'stump_diameter'
    },
    startDate: {
      type: Sequelize.DATE,
      field: 'start_date',
      allowNull: false
    },
    endDate: {
      type: Sequelize.DATE,
      field: 'end_date',
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
