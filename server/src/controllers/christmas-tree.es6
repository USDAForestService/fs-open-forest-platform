'use strict';

const request = require('request');

const vcapConstants = require('../vcap-constants.es6');
const christmasTreeRegulations = require('../models/forest-regulations.es6');
const species = require('../models/tree-species.es6');
const forestSpecies = require('../models/forest-species.es6');

const christmasTree = {};

const translateRegulationsFromDatabaseToClient = input => {
  return {
    forest: {
      id: input.id,
      forestName: input.forestName,
      forestUrl: input.forestUrl,
      treeHeight: input.treeHeight,
      stumpHeight: input.stumpHeight,
      stumpDiameter: input.stumpDiameter,
      notes: input.notes,
      startDate: input.startDate,
      endDate: input.endDate,
      species: input.forestSpecies.map((species)=>{
        return {
          id: species.treeSpecy.id,
          name: species.treeSpecy.name,
          description: species.treeSpecy.description,
          photos: species.treeSpecy.photos,
          status: species.status,
        };
      })
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
      res.status(400).json(error);
    });
};

module.exports = christmasTree;
