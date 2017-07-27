'use strict';

let Sequelize = require('sequelize');
let url = require('url');

const sequelizeOptions = {
  dialect: url.parse(process.env.DATABASE_URL, true).protocol.split(':')[0]
};

if (url.parse(process.env.DATABASE_URL, true).hostname !== 'localhost'
    && url.parse(process.env.DATABASE_URL, true).hostname !== 'fs-intake-postgres') {
  sequelizeOptions.dialectOptions = {
    ssl: true
  };
}

let sequelize = new Sequelize(process.env.DATABASE_URL, sequelizeOptions);

module.exports = sequelize.define(
  'applicationFiles',
  {
    fileId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'file_id', allowNull: false },
    applicationId: { type: Sequelize.INTEGER, field: 'application_id', allowNull: false },
    applicationType: { type: Sequelize.STRING, field: 'application_type', allowNull: false },
    s3FileName: { type: Sequelize.STRING, field: 's3_filename', allowNull: false },
    originalFileName: { type: Sequelize.STRING, field: 'original_filename', allowNull: false },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'created' },
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'updated' }
  },
  {
    timestamps: true
  }
);
