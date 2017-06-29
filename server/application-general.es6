'use strict';

let NoncommercialApplication = require('./models/noncommercial-application.es6');
let util = require('./util.es6');

let allAppFuncs = {};

allAppFuncs.getAllApps = (req, res) => {
  NoncommercialApplication.findAll().then(allApps => {
    res.status(200).json(util.translateArrayFromDatabaseToJSON(allApps));
  });
};


module.exports = allAppFuncs;
