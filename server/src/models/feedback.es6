

/**
 * Module for feedback model
 * @module models/feedback
 */

const Sequelize = require('sequelize');

const util = require('../services/util.es6');

module.exports = util.getSequelizeConnection().define(
  'feedbackEntries',
  {
    id: {
      type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id', allowNull: false
    },
    message: { type: Sequelize.STRING, field: 'message', allowNull: false },
    email: { type: Sequelize.STRING, field: 'email', allowNull: false },
    forests: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        get: function() {
          let parsed_forests = []
             let forests = this.getDataValue('forests')
             for (var i = 0; i < forests.length; i++) {
               let forest = JSON.parse(forests[i])
               parsed_forests.push(forest)
             }
            return parsed_forests;
        },
        set: function(val) {
            return this.setDataValue('forests', val);
        }
    },
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
