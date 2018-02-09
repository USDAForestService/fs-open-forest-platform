'use strict';

/**
 * Module for application file model
 * @module models/application-files
 */

const Sequelize = require('sequelize');

const util = require('../services/util.es6');

module.exports = util.getSequelizeConnection().define(
  'applicationFiles',
  {
    fileId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'file_id', allowNull: false },
    applicationId: { type: Sequelize.INTEGER, field: 'application_id', allowNull: false },
    applicationType: { type: Sequelize.STRING, field: 'application_type', allowNull: false },
    documentType: { type: Sequelize.STRING, field: 'document_type', allowNull: false },
    s3FileName: { type: Sequelize.STRING, field: 's3_filename', allowNull: false },
    originalFileName: { type: Sequelize.STRING, field: 'original_filename', allowNull: false },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'created' },
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'updated' }
  },
  {
    timestamps: true
  }
);
