'use strict';

/**
 * Module for permit application revision history model
 * @module models/revision
 */

const Sequelize = require('sequelize');
const util = require('../services/util.es6');

module.exports = util.getSequelizeConnection().define('revisions', {
  revisionId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'revision_id',
    allowNull: false
  },
  applicationId: { type: Sequelize.INTEGER, field: 'application_id', allowNull: false },
  applicationType: { type: Sequelize.STRING, field: 'application_type', allowNull: false },
  status: { type: Sequelize.STRING, field: 'status', allowNull: false },
  email: { type: Sequelize.STRING, field: 'email', allowNull: false },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'created' },
  updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'updated' }
});
