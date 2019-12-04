

/**
 * Module for feedback model
 * @module models/feedback
 */

const Sequelize = require('sequelize');

const util = require('../services/util.es6');

module.exports = util.getSequelizeConnection().define(
  'feedbackEntries',
  {
    message: { type: Sequelize.STRING(1000), field: 'message', allowNull: false },
    forests: { type: Sequelize.STRING, field: 'forests' },
    createdAt: {
      type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'created'
    },
    updatedAt: {
      type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'updated'
    }
  },
  {
    timestamps: true
  }
);
