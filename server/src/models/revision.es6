'use strict';

const Sequelize = require('sequelize');
const url = require('url');

const sequelizeOptions = {
  dialect: url.parse(process.env.DATABASE_URL, true).protocol.split(':')[0]
};

const sequelize = new Sequelize(process.env.DATABASE_URL, sequelizeOptions);

module.exports = sequelize.define('revisions', {
  revisionId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'revision_id',
    allowNull: false
  },
  applicationId: { type: Sequelize.INTEGER, field: 'application_id', allowNull: false },
  applicationType: { type: Sequelize.STRING, field: 'application_type', allowNull: false },
  email: { type: Sequelize.STRING, field: 'email', allowNull: false },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'created' },
  updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'updated' }
});
