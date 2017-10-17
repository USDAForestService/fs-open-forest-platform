'use strict';

const request = require('request');

const vcapConstants = require('../vcap-constants.es6');
const christmasTreeRegulations = require('../models/forest-regulations.es6');
const species = require('../models/tree-species.es6');
const forestSpecies = require('../models/forest-species.es6');

const christmasTree = {};

const translateRegulationsFromClientToDatabase = input => {
  return {
    id: input.id,
    forestName: input.forestName,
    forestUrl: input.forestUrl,
    treeHeight: input.treeHeight,
    stumpHeight: input.stumpHeight,
    stumpDiamerter: input.stumpDiamerter,
    notes: input.notes
  };
};

const translateRegulationsFromDatabaseToClient = input => {
  return {
    forest: {
      id: input.id,
      forestName: input.forestName,
      forestUrl: input.forestUrl,
      treeHeight: input.treeHeight,
      stumpHeight: input.stumpHeight,
      stumpDiamerter: input.stumpDiamerter,
      notes: input.notes
    }
  }; 
};


christmasTree.getOneRegulations = (req, res) => {

  christmasTreeRegulations.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: forestSpecies,
        include: [
          {
            model: species
          }
        ]
      }
    ]
  })
    .then(app => {
      if (app) {
        res.status(200).json(translateRegulationsFromDatabaseToClient(app));
      } else {
        res.status(404).send();
      }
    })
    .catch(error => {
      console.log(error)
      res.status(400).json(error);
    });
};

module.exports = christmasTree;
